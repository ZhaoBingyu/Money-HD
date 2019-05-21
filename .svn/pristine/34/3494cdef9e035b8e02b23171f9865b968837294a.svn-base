import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonUrlService} from '../../../service/common-url.service';
import {CommonService} from '../../../service/common.service';
import {ajaxSubmit} from '../../../service/common/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstDayLoginValidateForm: FormGroup;
  validateForm: FormGroup;
  countDownNum = 60;
  timerFlag = false;
  phoneErrFlag = false;
  checkCaptchaFlag = false;
  loginErrFlag = false;
  phoneErrorMsg = '请输入正确的手机号！';
  captchaErrorMsg = '请输入正确的验证码！';
  loginErrMsg = '';
  imgCaptchaUrl = '';


  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public url: CommonUrlService,
              private common: CommonService) {
  }

  ngOnInit(): void {
    // this.getImgCaptcha();
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.firstDayLoginValidateForm = this.fb.group({
      imgCode: [null, [Validators.required]], // 图验
      msgCode: [null, [Validators.required]], // 短验
    });
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


  // 登录
  login() {
    if (!this.submitForm()) {
      return;
    }
    this.loginErrFlag = false;
    this.loginErrMsg = '';

    const sendData = {
      phone: this.validateForm.controls.phone.value,
      password: this.validateForm.controls.password.value
    };

    const resData = this.common.yql_fundPlatformLogin(sendData);
    if (resData.response_head.service_status !== '00') {
      this.loginErrFlag = true;
      this.loginErrMsg = resData.response_head.service_resp_desc;
    } else {
      sessionStorage.setItem('sessionToken', resData.response_body.token);   // token	session信息Token
      sessionStorage.setItem('companyName', resData.response_body.companyName);   // companyName	企业名称
      sessionStorage.setItem('userName', resData.response_body.userName);   // userName	用户名称
      sessionStorage.setItem('companyNo', resData.response_body.companyNo);   // userName	用户名称
      sessionStorage.setItem('phone', this.validateForm.controls.phone.value);   // 登录手机号
      this.common.setRouterJump(resData.response_body);
      this.router.navigate(['/home/moneyHDHome']);
    }
  }


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
    const value = this.validateForm.controls.phone.value;
    if (this.validateForm.get('phone').dirty) {
      if (!this.common.reqPhone(value)) {
        this.phoneErrFlag = true;
        this.phoneErrorMsg = '请输入正确的手机号！';
        return false;
      }
      this.phoneErrFlag = false;
      this.phoneErrorMsg = '';
      return true;
    }
  }

  // 验证码校验
  checkCaptcha() {
    if (this.validateForm.get('captcha').dirty) {
      const captcha = this.validateForm.controls.captcha.value;
      if (!captcha) {
        this.checkCaptchaFlag = true;
        return false;
      }
      this.checkCaptchaFlag = false;
      return true;
    }

  }

  // 登录校验
  loginCheck() {
    // const checkPhoneFlag = this.checkPhone();
    // const checkCaptchaFlag = this.checkCaptcha();
    // return checkPhoneFlag && checkCaptchaFlag;
  }

  goRegisterView() {
    this.router.navigate(['/home/register']);
  }

  goFindPasswordView() {
    this.router.navigate(['/home/findPassword']);
  }
}

