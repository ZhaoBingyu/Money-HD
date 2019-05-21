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
import {forkJoin} from 'rxjs';

import {Observable, Observer} from 'rxjs';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonUrlService} from '../../../service/common-url.service';
import {CommonService} from '../../../service/common.service';
import {login} from '../../../service/common/loginManage';

@Component({
  selector: 'app-draw-cash',
  templateUrl: './draw-cash.component.html',
  styleUrls: ['./draw-cash.component.css']
})

export class DrawCashComponent implements OnInit {

  values: any[] | null = null;
  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateForm: FormGroup;
  validateFormStep0: FormGroup;
  phoneErrorMsg = '请输入正确的手机号！';
  phoneErrFlag = false;
  isVisible = false;
  iframe: any;
  jumpCount = 5;
  drawCashInfo: any = {};
  drawCashAmt: any = undefined;
  token: any = undefined;

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
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.url.commonIframeUrl}sms.pdf`);
    this.i18n.setLocale(zh_CN);
    this.validateFormStep0 = this.fb.group({
      amount: [null, [Validators.required]],  // 金额
      code: [null, [Validators.required]],  // 手机号验证码
      payPassword: [null, [Validators.required]],  // 支付密码
    });
    this.getDrawCashAmt();
  }

  // 获取可转出余额
  getDrawCashAmt() {
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      productCode: this.drawCashInfo.productCode, //	产品编码
      bankCode: this.drawCashInfo.productCode, //	产品编码
    };
    const resData = this.common.api_fundAccountProduct(sendData);
    this.drawCashAmt = resData.response_data.amount;
  }

  formatterDollar = (value) => {
    value = value || '';
    return `￥ ${value}`;
  };
  parserDollar = (value: string) => value.replace('￥ ', '');

  submitForm0() {
    for (const i in this.validateFormStep0.controls) {
      this.validateFormStep0.controls[i].markAsDirty();
      this.validateFormStep0.controls[i].updateValueAndValidity();
    }
    for (const i in this.validateFormStep0.controls) {
      const status = this.validateFormStep0.controls[i].status;
      if (status === 'INVALID') {
        console.log(i);
        return false;
      }
    }
    return true;
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
    this.countDown();
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      bankCode: this.drawCashInfo.bankCode, // 	银行编码
      productCode: this.drawCashInfo.productCode, // 	产品编码
    };
    const resData = this.common.api_fundCashSendMessage(sendData);
    // console.log(resData);
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  drawCashSubmit() {
    if (!this.submitForm0()) {
      return;
    }
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      amount: this.validateFormStep0.controls.amount.value, // 份额
      code: this.validateFormStep0.controls.code.value, // 短信验证码
      token: this.token, // 短信验证码token
      bankCode: this.drawCashInfo.bankCode, // 产品银行编码
      productCode: this.drawCashInfo.productCode, // 产品编码
      payPassword: this.validateFormStep0.controls.payPassword.value, // 支付密码
    };
    const resData = this.common.api_fundCashProduct(sendData);
  }

  goBack() {
    this.router.navigate(['/home/enterCenter/accountManagement']);
  }
}

















































