import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile, zh_CN, NzI18nService} from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {UploadXHRArgs} from 'ng-zorro-antd';
import {Observable, Observer, BehaviorSubject, forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonUrlService} from '../../../service/common-url.service';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-add-public-account-info',
  templateUrl: './add-public-account-info.component.html',
  styleUrls: ['./add-public-account-info.component.css']
})

export class AddPublicAccountInfoComponent implements OnInit {
  isLoginVisible = false;

  options = [];
  nzOptions: any[] | null = null;
  values: any[] | null = null;

  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateForm: FormGroup;
  validateFormStep0: FormGroup;
  validateFormStep1: FormGroup;
  validateFormStep2: FormGroup;
  phoneErrorMsg = '请输入正确的手机号！';
  phoneErrFlag = false;
  isVisible = false;
  isErrVisible = false;
  errMsg = undefined;

  samePersonFlag = false;

  token = undefined; //	token信息


  fileList1_err = false;
  fileList2_err = false;
  fileList3_err = false;
  fileList4_err = false;
  fileList5_err = false;
  previewImage: string | undefined = '';
  previewVisible = false;
  checkEmailFlag = false;
  iframe: any;
  uploadImgUrl: any;

  bankListOption: any = []; // 开户银行列表 模糊查询
  bankOptionInfo: any = {};
  isLoading = false;


  loading = false;

  jumpCount = 5;

  provinceData = [];
  cityData = [];
  avatarUrl: string;

  provinceCode: any = undefined;
  errMsgCode: any = false;
  cityCode: any = undefined;

  /**
   * imageKey id
   imageName  文件名称
   imageSuffix  jpg,png等
   imageType  1:组织机构代码;2:法人身份证正面;3:法人身份证反面;4:代办人身份证正面;5:代办人身份证反面
   **/

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public url: CommonUrlService,
              private sanitizer: DomSanitizer,
              private common: CommonService,
              private msg: NzMessageService,
              private i18n: NzI18nService) {
  }

  ngOnInit() {
    this.i18n.setLocale(zh_CN);
    this.validateFormStep1 = this.fb.group({
      bankName: [null, [Validators.required]],  // 开户银行
      accountName: [null, [Validators.required]],  // 对公账户名称,
      accountNo: [null, [Validators.required]],  // 对公一般户
    });
    this.getBankList('');
  }

  selectBankOption(data) {
    for (let i = 0; i < this.bankListOption.length; i++) {
      if (this.bankListOption[i].bankName === data) {
        this.bankOptionInfo = this.bankListOption[i];
      }
    }
  }


  onSearch(value: string): void {
    this.isLoading = true;
    this.getBankList(value);
  }

  // 开户银行模糊查询100条
  getBankList(value) {
    const sendData = {
      bankName: value, // 开户行名称 模糊查询条件[最多查询100条记录]
    };
    const resData = this.common.yql_fundRegisterCustomerBankInfo(sendData);
    this.bankListOption = resData.response_body.record;
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  // 获取省数据
  getProvinceData() {
    const sendData = {
      provinceCode: '', // 省编码
    };
    const resData = this.common.yql_fundRegisterCustomerProvinceCity(sendData);
    try {
      this.provinceData = resData.response_body.record;
    } catch (e) {
    }
  }

  // 获取市数据
  getCityData() {
    const sendData = {
      provinceCode: this.provinceCode, // 省编码
    };
    const resData = this.common.yql_fundRegisterCustomerProvinceCity(sendData);
    this.cityData = resData.response_body.record;
    this.cityCode = null;
  }

  goLogin() {
    this.router.navigate(['/home/login']);
  }


  goBack() {
    this.router.navigate(['/home/enterCenter/publicAccountMangement']);
  }

  submitForm1() {
    for (const i in this.validateFormStep1.controls) {
      this.validateFormStep1.controls[i].markAsDirty();
      this.validateFormStep1.controls[i].updateValueAndValidity();
    }
    for (const i in this.validateFormStep1.controls) {
      const status = this.validateFormStep1.controls[i].status;
      if (status === 'INVALID') {
        console.log(i);
        return false;
      }
    }
    return true;
  }


  provinceChange(value: string): void {
    this.provinceCode = value;

    this.getCityData();

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.router.navigate(['/home/enterCenter/publicAccountMangement']);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showLoginModal(): void {
    this.isLoginVisible = true;
  }

  handleLoginOk(): void {
    this.router.navigate(['/home/login']);
    this.isLoginVisible = false;
  }

  handleLoginCancel(): void {
    this.isLoginVisible = false;
  }

  showErrModal(): void {
    this.isErrVisible = true;
  }

  handleErrOk(): void {
    this.isErrVisible = false;
    // this.router.navigate(['/home/login']);
  }

  handleErrCancel(): void {
    this.isErrVisible = false;
  }

  submit() {

    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      accountNo: this.validateFormStep1.controls.accountNo.value, // 对公账号
      accountName: this.validateFormStep1.controls.accountName.value, // 对公账户名称
      bankName: this.validateFormStep1.controls.bankName.value, // 对公账号开户行名
      bankNo: this.bankOptionInfo.bankNo, // 对公账号开户行号
      bankLineNo: this.bankOptionInfo.bankLineNo, // 开户行清算行行号
      bankLineName: this.bankOptionInfo.bankLineName, // 开户行清算行行名
      bankShortNo: this.bankOptionInfo.bankShortNo, // 开户行总行标识
      bankShortName: this.bankOptionInfo.bankShortName, // 开户行总行名称
      liqBankNo: this.bankOptionInfo.liqBankNo, // 对公账户清算行行号
      companyName: this.bankOptionInfo.companyName, // 企业名称
      companyNo: this.bankOptionInfo.companyNo, // 企业编号
    };

    const resData = this.common.yql_fundADDCompanyAccount(sendData);
    const openAccount = resData.response_head.service_resp_code;
    // 未登录
    if (openAccount === 'E88888') {
      this.showModal();
      return;
    }

    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
      return;
    }

    this.showModal();
  }

}


