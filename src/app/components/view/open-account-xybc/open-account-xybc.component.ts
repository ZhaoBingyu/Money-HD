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
  selector: 'app-open-account-xybc',
  templateUrl: './open-account-xybc.component.html',
  styleUrls: ['./open-account-xybc.component.css']
})

export class OpenAccountXybcComponent implements OnInit {
  options = [];
  nzOptions: any[] | null = null;
  values: any[] | null = null;

  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateForm: FormGroup;
  phoneErrorMsg = '请输入正确的手机号！';
  phoneErrFlag = false;
  isVisible = false;
  isErrVisible = false;
  errMsg = undefined;

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
  service_resp_desc = '';
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
      companyNo: sessionStorage.getItem('companyNo'),
      'Accept-Authentication': sessionStorage.getItem('sessionToken')
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
      bankCode: [null, [Validators.required]],  // 银行编码
      productCode: [null, [Validators.required]],  // 产品编码
      phone: [null, [Validators.required]],  // 手机号
      token: [null, [Validators.required]],  // 短信验证码token
      code: [null, [Validators.required]],  // 短信验证码
      isIcbc: [null, [Validators.required]],  // 是否工行标志（0-否；1-是）
      regNo: [null, [Validators.required]],  // 证件号码[组织机构代码]
      clientName: [null, [Validators.required]],  // 客户名称
      currtype: [null, [Validators.required]],  // 币种
      accno: [null, [Validators.required]],  // 结算账户账号
      accname: [null, [Validators.required]],  // 结算账户户名
      openbankno: [null, [Validators.required]],  // 结算账户开户行行号，is_icbc为0时必输
      openbankname: [null, [Validators.required]],  // 结算账户开户行行名，is_icbc为0时必输
      busAddr: [null, [Validators.required]],  // 办公地址，is_icbc为0时必输
      busZipCode: [null, [Validators.required]],  // 办公地址邮编 ，is_icbc为0时必输
      busSphere: [null, [Validators.required]],  // 经营范围，is_icbc为0时必输
      companyName: [null, [Validators.required]],  // 公司全称
      orgCode: [null, [Validators.required]],  // 组织机构代码，is_icbc为0时必输
      taxCode: [null, [Validators.required]],  // 税务登记证号码，is_icbc为0时必输
      busCode: [null, [Validators.required]],  // 营业执照号，is_icbc为0时必输
      busValidate: [null, [Validators.required]],  // 营业执照有效期，is_icbc为0时必输
      corpRepresentName: [null, [Validators.required]],  // 法定代表姓名，is_icbc为0时必输
      corpRepresentRegtype: [null, [Validators.required]],  // 法定代表证件类型，is_icbc为0时必输
      corpRepresentRegno: [null, [Validators.required]],  // 法定代表证件号码，is_icbc为0时必输
      corpRepresentValidate: [null, [Validators.required]],  // 法定代表证件有效期，is_icbc为0时
      authTransName: [null, [Validators.required]],  // 授权办理人姓名，is_icbc为0时必输
      authTransRegtype: [null, [Validators.required]],  // 授权办理人证件类型，is_icbc为0时必输
      authTransRegno: [null, [Validators.required]],  // 授权办理人证件号码，is_icbc为0时必输
      authTransValidate: [null, [Validators.required]],  // 授权办理人证件有效期，is_icbc为0
      authTransPhoneno: [null, [Validators.required]],  // 授权办理人联系电话，is_icbc为0时必输
      industry: [null, [Validators.required]],  // 所属行业，is_icbc为0时必输
      employeeNo: [null, [Validators.required]],  // 员工人数，is_icbc为0时必输
      income: [null, [Validators.required]],  // 营业收入，is_icbc为0时必输
      assetamount: [null, [Validators.required]],  // 资产总额，is_icbc为0时必输
    });
    this.getAccountNoList();
    this.getCompanyBasicInfo();
    this.getBankList('');

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
    if (!this.checkPhone()) {
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

      accno: this.accountInfo.accountNo, //	结算账户账号
      accname: this.accountInfo.accountName, //	结算账户户名
      openbankno: this.accountInfo.accountBankNo, //	结算账户开户行行号，is_icbc为0时必输
      openbankname: this.accountInfo.accountBankName, //	结算账户开户行行名，is_icbc为0时必输

      industry: this.validateForm.controls.industry.value, //	所属行业，is_icbc为0时必输
      employeeNo: this.validateForm.controls.employeeNo.value.toString(), //	员工人数，is_icbc为0时必输
      income: this.validateForm.controls.income.value.toString(), //	营业收入，is_icbc为0时必输
      assetamount: this.validateForm.controls.assetamount.value.toString(), //	资产总额，is_icbc为0时必输
      busZipCode: this.validateForm.controls.busZipCode.value, //	办公地址邮编 ，is_icbc为0时必输

      isIcbc: '1', //	是否工行标志（0-否；1-是）

      bankCode: this.inputData.bankCode, //	银行编码
      productCode: this.inputData.productCode, //	产品编码

      regNo: this.companyBasicInfo.companyNo, //	证件号码[组织机构代码]
      clientName: this.companyBasicInfo.companyName, //	客户名称
      currtype: ' CNY', //	币种
      busAddr: this.companyBasicInfo.address, //	办公地址，is_icbc为0时必输
      busSphere: this.companyBasicInfo.business, //	经营范围，is_icbc为0时必输
      orgCode: this.companyBasicInfo.companyNo, //	组织机构代码，is_icbc为0时必输
      taxCode: this.companyBasicInfo.companyNo, //	税务登记证号码，is_icbc为0时必输
      busCode: this.companyBasicInfo.companyNo, //	营业执照号，is_icbc为0时必输
      busValidate: this.companyBasicInfo.businessDate, //	营业执照有效期，is_icbc为0时必输

      corpRepresentName: this.companyBasicInfo.corporationName, //	法定代表姓名，is_icbc为0时必输
      corpRepresentRegno: this.companyBasicInfo.corporationNo, //	法定代表证件号码，is_icbc为0时必输
      corpRepresentValidate: this.companyBasicInfo.corporationDate, //	法定代表证件有效期，is_icbc为0时
      corpRepresentRegtype: '0', //	法定代表证件类型，is_icbc为0时必输

      authTransName: this.companyBasicInfo.agentName, //	授权办理人姓名，is_icbc为0时必输
      authTransRegno: this.companyBasicInfo.agentNo, //	授权办理人证件号码，is_icbc为0时必输
      authTransValidate: this.companyBasicInfo.agentDate, //	授权办理人证件有效期，is_icbc为0
      authTransPhoneno: this.companyBasicInfo.phone, //	授权办理人联系电话，is_icbc为0时必输
      authTransRegtype: '0', //	授权办理人证件类型，is_icbc为0时必输

    };
    const resData = this.common.api_fundAccountOpen(sendData);
    const openAccount = resData.response_head.service_resp_code;
    // 未登录
    if (openAccount === 'E88888') {
      this.showErrModal();
      return;
    }

    // 未开户
    if (openAccount === 'E99999') {
      this.showModal();
      this.service_resp_desc = resData.response_head.service_resp_desc;
      this.router.navigate(['/enterCenter/publicAccountMangement']);
      return;
    }
    this.current += 1;
    this.changeContent();
    const countTimer = setInterval(() => {
      --this.jumpCount;
      if (this.jumpCount === 0) {
        this.jumpCount = 0;
        this.router.navigate(['/home/login']);
        clearInterval(countTimer);
      }
    }, 1000);
  }

  checkSubmit2() {
    const submitArr: any = [
      'industry',
      'employeeNo',
      'income',
      'assetamount',
      'busZipCode',
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
  checkPhone() {
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

  // 验证码校验
  checkCaptcha() {
  }

  // 获取验证码
  getCaptcha() {
    if (!this.checkPhone()) {
      this.validateForm.controls['phone'].markAsDirty();
      this.validateForm.controls['phone'].updateValueAndValidity();
      return;
    }
    this.countDown();
    const sendData = {
      phone: this.validateForm.controls.phone.value, // 手机号码
      productCode: this.inputData.productCode, // 产品编码
      bankCode: this.inputData.bankCode, // 银行编码
      'Accept-Authentication': sessionStorage.getItem('sessionToken')
    };
    const resData = this.common.api_fundOpenSendMessage(sendData);
    if (resData.response_head.service_status === '01') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
    } else {
      this.showModal();
    }
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

  showErrModal(): void {
    this.isErrVisible = true;
  }

  handleErrOk(): void {
    this.isErrVisible = false;
    if (this.errMsg === '该企业客户未登入或者登入已失效,请重新登入！！') {
      this.router.navigate(['/home/login']);
    }
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
