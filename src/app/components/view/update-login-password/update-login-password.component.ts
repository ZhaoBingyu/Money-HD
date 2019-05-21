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
  selector: 'app-update-login-password',
  templateUrl: './update-login-password.component.html',
  styleUrls: ['./update-login-password.component.css']
})

export class UpdateLoginPasswordComponent implements OnInit {

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

  samePersonFlag = true;

  previewImage: string | undefined = '';
  previewVisible = false;
  checkEmailFlag = false;
  iframe: any;
  uploadImgUrl: any;

  bankListOption: any = [{value: 1, label: 'test'}]; // 开户银行列表 模糊查询


  jumpCount = 5;
  errMsg = undefined;

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
  avatarUrl: string;

  ngOnInit() {
    this.i18n.setLocale(zh_CN);

    this.validateFormStep2 = this.fb.group({
      oldPassword: [null, [Validators.required]],  // 旧密码
      newPassword: [null, [Validators.required]],  // 登录密码
      newPasswordEnt: [null, [Validators.required, this.confirmationValidator]], // 确认登录密码
    });
  }

  submitForm2() {
    for (const i in this.validateFormStep2.controls) {
      this.validateFormStep2.controls[i].markAsDirty();
      this.validateFormStep2.controls[i].updateValueAndValidity();
    }
    for (const i in this.validateFormStep2.controls) {
      const status = this.validateFormStep2.controls[i].status;
      if (status === 'INVALID') {
        console.log(i);
        return false;
      }
    }
    return true;
  }

  submit() {
    if (!this.submitForm2()) {
      return;
    }
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      oldPassword: this.validateFormStep2.controls.oldPassword.value,
      newPassword: this.validateFormStep2.controls.newPassword.value,
      newPasswordEnt: this.validateFormStep2.controls.newPasswordEnt.value,
    };
    const reqData = this.common.api_fundChangeLoginPassword(sendData);
    if (reqData.response_head.service_status === '01') {
      this.errMsg = reqData.response_head.service_resp_desc;
      this.showErrModal();
    } else {
      this.showModal();
    }
    // this.router.navigate(['/home/enterCenter/accountInfo']);
  }

  goBack() {
    this.router.navigate(['/home/enterCenter/accountInfo']);
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateFormStep2.controls.newPasswordEnt.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateFormStep2.controls.newPassword.value) {
      return {confirm: true, error: true};
    }
  };


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.router.navigate(['/home/enterCenter/accountInfo']);
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
    // this.router.navigate(['/home/login']);
  }

  handleErrCancel(): void {
    this.isErrVisible = false;
  }


}
