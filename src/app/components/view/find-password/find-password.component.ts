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
  selector: 'app-find-password',
  templateUrl: './find-password.component.html',
  styleUrls: ['./find-password.component.css']
})


export class FindPasswordComponent implements OnInit {

  phoneErrorMsg = '请输入正确的手机号！';
  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateForm: FormGroup;
  phoneErrFlag = false;
  isVisible = false;
  verifyCodeImgUrl = '../../../../assets/img/bg_login.png';
  jumpCount = 5;
  verifyCode = undefined; // 图片展现码
  verifyToken = undefined;
  verifyCodeFlag = false;
  token = undefined;
  errMsgCode: any = false;
  submitErrMsg = undefined;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public url: CommonUrlService,
              private common: CommonService,
              private i18n: NzI18nService) {
  }

  ngOnInit() {
    this.i18n.setLocale(zh_CN);
    this.getImgCode();
    this.validateForm = this.fb.group({
      companyName: [null, [Validators.required]],  // 公司名称
      verifyCode: [null, [Validators.required]],  // 图片展现码
      phone: [null, [Validators.required]],  // 手机号
      code: [null, [Validators.required]], // 短信验证码
      loginPassword: [null, [Validators.required]],  // 登录密码
      loginPasswordEnt: [null, [Validators.required, this.confirmationValidator]],  // 登录密码确认
    });
  }

  // 获取图片验证码
  getImgCode() {
    const sendData = {};
    const resData = this.common.yql_fundVerifyCode(sendData);
    this.verifyCode = resData.response_body.verifyCode;
    this.verifyToken = resData.response_body.verifyToken;
    // verifyCode	图片展现码
    // verifyToken	图片token

  }

  // 获取短信验证码
  getCaptcha() {
    if (!this.checkPhone()) {
      this.validateForm.controls['phone'].markAsDirty();
      this.validateForm.controls['phone'].updateValueAndValidity();
      return;
    }
    this.countDown();
    const sendData = {
      phone: this.validateForm.controls.phone.value
    };
    const resData = this.common.yql_fundSendMessageFindPwd(sendData);
    // token	token信息
    this.token = resData.response_body.token;
  }


  // 图片验证码校验
  checkImgCaptcha() {
    setTimeout(() => {
      const str1 = this.validateForm.controls.verifyCode.value.toLocaleLowerCase();
      const str2 = this.verifyCode.toString().toLocaleLowerCase();
      if (str1 === str2) {
        this.verifyCodeFlag = false;
        return;
      } else {
        this.verifyCodeFlag = true;
      }
    }, 0);
  }

  // 验证码校验
  checkCaptcha() {
    this.errMsgCode = false;
    const sendData = {
      phone: this.validateForm.controls.phone.value, // 手机号码
      token: this.token, // 短信验证码token
      code: this.validateForm.controls.code.value, // 短信验证码
    };
    const resData: any = this.common.yy_sendMessageValidate(sendData);
    if (resData.response_head.service_status !== '00') {
      this.errMsgCode = true;
    }
  }

  checkCaptchaKeyUp() {
    const length = this.validateForm.controls.code.value.toString().length;
    if (length > 5) {
      this.errMsgCode = false;
      const sendData = {
        phone: this.validateForm.controls.phone.value, // 手机号码
        token: this.token, // 短信验证码token
        code: this.validateForm.controls.code.value, // 短信验证码
      };
      const resData: any = this.common.yy_sendMessageValidate(sendData);
      if (resData.response_head.service_status !== '00') {
        this.errMsgCode = true;
      }
    }

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
        const countTimer = setInterval(() => {
          --this.jumpCount;
          if (this.jumpCount === 0) {
            this.jumpCount = 0;
            this.router.navigate(['/home/login']);
            clearInterval(countTimer);
          }
        }, 1000);
        $('.step_4').show();
        break;
      }
    }

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
        const countTimer = setInterval(() => {
          --this.jumpCount;
          if (this.jumpCount === 0) {
            this.jumpCount = 0;
            this.router.navigate(['/home/login']);
            clearInterval(countTimer);
          }
        }, 1000);
        $('.step_4').show();
        break;
      }
      default: {

      }
    }
  }


  checkStep0() {
    this.checkSubmit0();
    if (!this.validateForm.controls.companyName.value) {
      return;
    }
    if (!this.validateForm.controls.verifyCode.value) {
      return;
    }
    if (this.verifyCodeFlag) {
      return;
    }

    this.current += 1;
    this.changeContent();
  }

  checkSubmit0() {
    this.validateForm.controls['companyName'].markAsDirty();
    this.validateForm.controls['companyName'].updateValueAndValidity();
    this.validateForm.controls['verifyCode'].markAsDirty();
    this.validateForm.controls['verifyCode'].updateValueAndValidity();
    const status1 = this.validateForm.controls['companyName'].status;
    if (status1 === 'INVALID') {
      console.log('companyName');
      return false;
    }
    const status2 = this.validateForm.controls['verifyCode'].status;
    if (status2 === 'INVALID') {
      console.log('verifyCode');
      return false;
    }
    return true;
  }

  checkStep1() {
    if (!this.checkSubmit1()) {
      return;
    }
    if (this.errMsgCode) {
      return;
    }


    this.current += 1;
    this.changeContent();
  }

  checkSubmit1() {
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

  checkStep2() {
    if (!this.checkSubmit2()) {
      return;
    }
    const sendData = {
      verifyCode: this.verifyCode, // 图片展现码
      verifyToken: this.verifyToken, // 图片token
      token: this.token, // 短信验证码Token
      code: this.validateForm.controls.code.value, // 短信验证码
      loginPassword: this.validateForm.controls.loginPassword.value, // 登录密码
      loginPasswordEnt: this.validateForm.controls.loginPasswordEnt.value, // 登录密码确认
      phone: this.validateForm.controls.phone.value, // 手机号
      companyName: this.validateForm.controls.companyName.value, // 公司名称
    };
    const resData = this.common.yql_fundForgotLoginPassword(sendData);
    if (resData.response_head.service_status !== '00') {
      this.submitErrMsg = resData.response_head.service_resp_desc;
      this.showModal();
    } else {
      this.current += 1;
      this.changeContent();
    }

  }

  checkSubmit2() {
    this.validateForm.controls['loginPassword'].markAsDirty();
    this.validateForm.controls['loginPassword'].updateValueAndValidity();
    this.validateForm.controls['loginPasswordEnt'].markAsDirty();
    this.validateForm.controls['loginPasswordEnt'].updateValueAndValidity();
    const status1 = this.validateForm.controls['loginPassword'].status;
    if (status1 === 'INVALID') {
      console.log('loginPassword');
      return false;
    }
    const status2 = this.validateForm.controls['loginPasswordEnt'].status;
    if (status2 === 'INVALID') {
      console.log('loginPasswordEnt');
      return false;
    }
    return true;
  }

  goLogin() {
    this.router.navigate(['/home/login']);
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


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
