import {Component, OnInit} from '@angular/core';
import {UploadFile, zh_CN, NzI18nService} from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {CommonUrlService} from '../../../service/common-url.service';
import {CommonService} from '../../../service/common.service';


@Component({
  selector: 'app-open-account-jsbc',
  templateUrl: './open-account-jsbc.component.html',
  styleUrls: ['./open-account-jsbc.component.css']
})

export class OpenAccountJsbcComponent implements OnInit {
  isLeagalMan = '0'; //0-代理人 1-法人
  contact = '';//联系人
  introducer = '';// 	推荐人
  telPhone = '';//	推荐人手机号

  options = [];
  nzOptions: any[] | null = null;
  values: any[] | null = null;

  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateForm: FormGroup;
  phoneErrorMsg = '请输入正确的手机号！';
  phoneErrFlag = false;
  phoneCorpErrFlag = false;
  isVisible = false;
  isErrVisible = false;
  errMsg = undefined;

  isLoginVisible = false;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  accountNoList: any = [];
  jumpCount = 5;
  inputData: any = {};
  accountInfo: any = {};

  bankListOption: any = []; // 开户银行列表 模糊查询
  bankOptionInfo: any = {};
  isLoading = false;
  companyBasicInfo: any = {};
  token = 'test';// 短信验证码token
  formatterDollar = (value) => {
    value = value || '';
    return `￥ ${value}`;
  };
  parserDollar = (value: string) => value.replace('￥ ', '');

// 开户银行模糊查询100条
  getBankList(value) {
    const sendData = {
      industryName: value, // 开户行名称 模糊查询条件[最多查询100条记录]
    };
    const resData = this.common.api_fundOpenIndustryInfo(sendData);
    this.bankListOption = resData.response_body.record;
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.getBankList(value);
    // this.searchChange$.next(value);
  }

  selectBankOption(data) {
    for (let i = 0; i < this.bankListOption.length; i++) {
      if (this.bankListOption[i].industryName === data) {
        this.bankOptionInfo = this.bankListOption[i];
      }
    }
  }

  // 获取企业基本信息
  getCompanyBasicInfo() {
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      companyNo: sessionStorage.getItem('companyNo'),
    };
    const resData = this.common.api_fundCompanyInfo(sendData);
    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
    } else {
      this.companyBasicInfo = resData.response_body;
    }
  }

  // 获取结算账户帐号List
  getAccountNoList() {
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken')
    };
    const resData: any = this.common.api_fundCompanyAccount(sendData);
    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
    }
    this.accountNoList = resData.response_body.record;
  }

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public url: CommonUrlService,
              private common: CommonService,
              private i18n: NzI18nService) {
  }

  ngOnInit() {
    this.inputData = JSON.parse(sessionStorage.getItem('inputData'));
    this.i18n.setLocale(zh_CN);
    this.options = this.formatOptions(this.common.provinceCityData);
    setTimeout(() => {
      this.nzOptions = this.options;
    }, 100);

    this.validateForm = this.fb.group({
      accno: [null, [Validators.required]],  // 结算账户账号
      phone: [null, [Validators.required]],  // 手机号
      code: [null, [Validators.required]],  // 短信验证码
      userNo: [null, [Validators.required]], // 登录号
      corpPhone: [null, [Validators.required]], // 法人手机号
      email: [null, [Validators.required]], // 注册邮箱
      unitArea: [null, [Validators.required]], // 企业所在省份
      corpRegion: [null, [Validators.required]], // 企业所在城市
      isCorpFlag: [null, [Validators.required]], // 是否法人标记
      loginPwd: [null], // 登录密码
      contact: [null], // 联系人
      telPhone: [null], // 推荐人手机号
      introducer: [null], // 推荐人
    });

    this.getAccountNoList();
    this.getCompanyBasicInfo();

  }


  selectBank() {
    const accountNo = this.validateForm.controls.accno.value;
    for (let i = 0; i < this.accountNoList.length; i++) {
      if (accountNo === this.accountNoList[i].accountNo) {
        this.accountInfo = this.accountNoList[i];
        console.log(this.accountInfo);
      }
    }
  }

  formatOptions(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        this.formatOptions(data[i].children);
      } else {
        data[i].isLeaf = true;
      }
    }
    return data;
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {

    switch (this.current) {
      case 0: {
        this.checkStep0();
        break;
      }
      case 1: {
        this.checkStep1();
        break;
      }
      case 2: {
        this.checkStep2();
        break;
      }
      case 3: {
        $('.step_4').show();
        break;
      }
    }

  }

  checkStep0() {

    if (!this.checkSubmit0()) {
      return;
    }
    if (this.phoneErrFlag) {
      return;
    }
    this.current += 1;
    this.changeContent();
  }

  checkSubmit0() {
    this.validateForm.controls['phone'].markAsDirty();
    this.validateForm.controls['phone'].updateValueAndValidity();
    this.validateForm.controls['code'].markAsDirty();
    this.validateForm.controls['code'].updateValueAndValidity();
    const status1 = this.validateForm.controls['phone'].status;
    if (status1 === 'INVALID') {
      console.log('phone');
      return false;
    }
    const status2 = this.validateForm.controls['code'].status;
    if (status2 === 'INVALID') {
      console.log('code');
      return false;
    }
    return true;
  }

  checkStep1() {
    if (!this.checkSubmit1()) {
      return;
    }

    this.current += 1;
    this.changeContent();
  }

  checkSubmit1() {
    const submitArr: any = [
      'accno',
    ];

    for (let i = 0; i < submitArr.length; i++) {
      this.validateForm.controls[submitArr[i]].markAsDirty();
      this.validateForm.controls[submitArr[i]].updateValueAndValidity();
    }
    for (let i = 0; i < submitArr.length; i++) {
      const status = this.validateForm.controls[submitArr[i]].status;
      if (status === 'INVALID') {
        console.log(submitArr[i]);
        return false;
      }
    }
    return true;
  }

  checkStep2() {
    if (!this.checkSubmit2()) {
      return;
    }
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      phone: this.validateForm.controls.phone.value, //	手机号
      code: this.validateForm.controls.code.value, //	短信验证码
      token: this.token, //	短信验证码token
      accno: this.accountInfo.accountNo, // 绑定银行卡
      accname: this.accountInfo.accountName, //	结算账户户名
      openbankname: this.accountInfo.accountBankName, // 绑定账户开户行
      openbankno: this.accountInfo.accountBankNo, //	结算账户开户行行号，is_icbc为0时必输
      bankCode: this.inputData.bankCode, // 	银行编码
      productCode: this.inputData.productCode, //	 产品编码
      orgCode: this.companyBasicInfo.companyNo, // 企业注册号
      busAddr: this.companyBasicInfo.address, // 企业地址
      busValidate: this.companyBasicInfo.businessDate, // 执照有效期限
      authTransName: this.companyBasicInfo.agentName, // 代理人姓名
      authTransRegtype: '0', // 代理人证件类型
      authTransRegno: this.companyBasicInfo.agentNo, // 代理人证件号码
      authTransValidate: this.companyBasicInfo.agentDate, // 代理人证件有效期
      authTransPhoneno: this.companyBasicInfo.phone, // 代理人手机
      corpRepresentName: this.companyBasicInfo.corporationName, // 法人姓名
      corpRepresentRegtype: '0', // 法人证件类型
      corpRepresentRegno: this.companyBasicInfo.corporationNo, // 法人证件号码
      corpRepresentValidate: this.companyBasicInfo.corporationDate, // 法人证件有效期
      clientName: this.companyBasicInfo.companyName, // 企业名称
      email: this.companyBasicInfo.email, // 注册邮箱
      unitArea: this.companyBasicInfo.province, // 企业所在省份
      corpRegion: this.companyBasicInfo.city, // 企业所在城市
      userNo: this.validateForm.controls.userNo.value, // 登录号
      corpPhone: this.validateForm.controls.corpPhone.value, // 法人手机号
      isCorpFlag: this.isLeagalMan, // 是否法人标记 0-代理人 1-法人
      contact: this.contact, // 联系人
      introducer: this.introducer, // 推荐人
      telPhone: this.telPhone, // 推荐人手机号
      regNo: this.companyBasicInfo.companyNo, //	证件号码[组织机构代码]

    };
    const resData = this.common.api_fundAccountOpen(sendData);
    const openAccount = resData.response_head.service_resp_code;
    // 未登录
    if (openAccount === 'E88888') {
      this.showLoginModal();
      return;
    }

    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
      return;
    }
    this.current += 1;
    this.changeContent();
    const countTimer = setInterval(() => {
      --this.jumpCount;
      if (this.jumpCount === 0) {
        this.jumpCount = 0;
        this.router.navigate(['/home/moneyHDHome']);
        clearInterval(countTimer);
      }
    }, 1000);

  }

  checkSubmit2() {
    const submitArr: any = [
      'userNo',
      'corpPhone',
    ];

    for (let i = 0; i < submitArr.length; i++) {
      this.validateForm.controls[submitArr[i]].markAsDirty();
      this.validateForm.controls[submitArr[i]].updateValueAndValidity();
    }
    for (let i = 0; i < submitArr.length; i++) {
      const status = this.validateForm.controls[submitArr[i]].status;
      if (status === 'INVALID') {
        console.log(submitArr[i]);
        return false;
      }
    }
    return true;
  }


  done(): void {
    console.log('done');
  }

  changeContent(): void {
    $('.step_sub_content').hide();
    switch (this.current) {
      case 0: {
        $('.step_1').show();
        break;
      }
      case 1: {
        $('.step_2').show();
        break;
      }
      case 2: {
        $('.step_3').show();
        break;
      }
      case 3: {
        $('.step_4').show();
        break;
      }
      default: {

      }
    }
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    for (const i in this.validateForm.controls) {
      const status = this.validateForm.controls[i].status;
      if (status === 'INVALID') {
        console.log(i);
        return false;
      }
    }
    return true;
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.loginPasswordEnt.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.loginPassword.value) {
      return {confirm: true, error: true};
    }
  };

  updateConfirmPayValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.payPasswordEnt.updateValueAndValidity());
  }

  confirmationPayPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.payPassword.value) {
      return {confirm: true, error: true};
    }
  };

  // 倒计时
  countDown() {
    this.timerFlag = true;
    const countTimer = setInterval(() => {
      --this.countDownNum;
      if (this.countDownNum === 0) {
        this.timerFlag = false;
        this.countDownNum = 60;
        clearInterval(countTimer);
      }
    }, 1000);
  }

  // 手机号校验
  checkPhone(data) {
    if (data === 'phone') {
      const varlue = this.validateForm.controls.phone.value;
      if (this.validateForm.get('phone').dirty) {
        console.log(this.common.reqPhone(varlue));
        if (!this.common.reqPhone(varlue)) {
          this.phoneErrFlag = true;
          return false;
        }
        this.phoneErrFlag = false;
        return true;
      }
    }
    if (data === 'corpPhone') {
      const corpPhone = this.validateForm.controls.corpPhone.value;
      if (this.validateForm.get('corpPhone').dirty) {
        console.log(this.common.reqPhone(corpPhone));
        if (!this.common.reqPhone(corpPhone)) {
          this.phoneCorpErrFlag = true;
          return false;
        }
        this.phoneCorpErrFlag = false;
        return true;
      }
    }
  }


  // 验证码校验
  checkCaptcha() {
    // if (this.validateForm.get('captcha').dirty) {
    //   const captcha = this.validateForm.controls.captcha.value;
    //   if (!captcha) {
    //     this.checkCaptchaFlag = true;
    //     return false;
    //   }
    //   this.checkCaptchaFlag = false;
    //   return true;
    // }

  }

  // 获取验证码
  getCaptcha() {
    if (!this.checkPhone('phone')) {
      this.validateForm.controls['phone'].markAsDirty();
      this.validateForm.controls['phone'].updateValueAndValidity();
      return;
    }
    this.countDown();
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      phone: this.validateForm.controls.phone.value, // 手机号码
      productCode: this.inputData.productCode, // 产品编码
      bankCode: this.inputData.bankCode, // 银行编码
    };
    // const resData = this.common.api_fundOpenSendMessage(sendData);
    // if (resData.response_head.service_status === '01') {
    //   this.errMsg = resData.response_head.service_resp_desc;
    //   this.showErrModal();
    // } else {
    //   this.showModal();
    // }
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showLoginModal(): void {
    this.isLoginVisible = true;
  }

  handleLoginOk(): void {
    this.isLoginVisible = false;
    this.router.navigate(['/home/login']);
  }

  handleLoginCancel(): void {
    this.isLoginVisible = false;
  }

  showErrModal(): void {
    this.isErrVisible = true;
  }

  handleErrOk(): void {
    this.isErrVisible = false;
  }

  handleErrCancel(): void {
    this.isErrVisible = false;
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };


  onChanges(values: any): void {
    console.log(values, this.values);
  }

  goHome() {
    this.router.navigate(['/home/moneyHDHome']);
  }
}

