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
  selector: 'app-redeem-purchase',
  templateUrl: './redeem-purchase.component.html',
  styleUrls: ['./redeem-purchase.component.css']
})

export class RedeemPurchaseComponent implements OnInit {
  options = [];
  values: any[] | null = null;
  current = 0;
  countDownNum = 60;
  timerFlag = false;
  validateFormStep0: FormGroup;
  phoneErrorMsg = '请输入正确的手机号！';
  phoneErrFlag = false;
  isVisible = false;
  token: any = undefined;
  iframe: any;
  jumpCount = 5;
  productInfo: any = {};
  redeemAmt: any = undefined; // 可赎回份额

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public url: CommonUrlService,
              private sanitizer: DomSanitizer,
              private common: CommonService,
              private msg: NzMessageService,
              private i18n: NzI18nService) {
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.url.commonIframeUrl}sms.pdf`);
  }

  loading = false;

  ngOnInit() {
    this.i18n.setLocale(zh_CN);
    this.validateFormStep0 = this.fb.group({
      portion: [null, [Validators.required]],  // 份额
      code: [null, [Validators.required]],  // 手机号验证码
      payPassword: [null, [Validators.required]],  // 支付密码
    });
    this.productInfo = JSON.parse(sessionStorage.getItem('redeemProductInfo'));
    this.getRedeemAmt();
  }


  // 可赎回份额
  getRedeemAmt() {
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      productCode: this.productInfo.productCode, //	产品编码
      bankCode: this.productInfo.productCode, //	产品编码
    };
    const resData = this.common.api_fundHoldProduct(sendData);
    this.productInfo.availableShare = resData.response_body.availableShare;
  }

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
      bankCode: this.productInfo.bankCode, // 	银行编码
      productCode: this.productInfo.productCode, // 	产品编码
    };
    const resData = this.common.api_fundVolSendMessage(sendData);
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

  redeemSubmit() {
    if (!this.submitForm0()) {
      return;
    }
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      portion: this.validateFormStep0.controls.portion.value, // 份额
      code: this.validateFormStep0.controls.code.value, // 短信验证码
      token: this.token, // 短信验证码token
      bankCode: this.productInfo.bankCode, // 产品银行编码
      productCode: this.productInfo.productCode, // 产品编码
      payPassword: this.validateFormStep0.controls.payPassword.value, // 支付密码
    };
    const resData = this.common.api_fundVolSendMessage(sendData);
  }


  goBack() {
    this.router.navigate(['/home/enterCenter/myAssets']);
  }
}































