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
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Observer, BehaviorSubject, forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonUrlService} from '../../../service/common-url.service';
import {CommonService} from '../../../service/common.service';
import {login} from '../../../service/common/loginManage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList1 = [];
  fileList2 = [];
  fileList3 = [];
  fileList4 = [];
  fileList5 = [];

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


  // selectedProvince = 'Zhejiang';
  selectedCity = '';
  provinceData = [];
  cityData = [];
  avatarUrl: string;

  provinceCode: any = undefined;
  errMsgCode: any = false;
  cityCode: any = undefined;


  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser = '';

  /**
   * imageKey id
   imageName  文件名称
   imageSuffix  jpg,png等
   imageType  1:组织机构代码;2:法人身份证正面;3:法人身份证反面;4:代办人身份证正面;5:代办人身份证反面
   **/
  imageList: any = [{}, {}, {}, {}, {}]; // 文件上传列表

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
    this.getBankList('');
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.url.commonIframeUrl}sms.pdf`);
    this.uploadImgUrl = this.url.commonUrl + 'servlet/imageUpload.servlet';
    // this.uploadImgUrl = 'https://jsonplaceholder.typicode.com/posts/';
    this.i18n.setLocale(zh_CN);
    this.options = this.formatOptions(this.common.provinceCityData);
    setTimeout(() => {
      this.nzOptions = this.options;
    }, 100);

    this.validateFormStep0 = this.fb.group({
      userName: [null, [Validators.required]],  // 用户名
      phone: [null, [Validators.required]],  // 手机号
      code: [null, [Validators.required]],  // 手机号验证码
      email: [null, [Validators.required, this.checkEmail]],  // 邮箱
      loginPassword: [null, [Validators.required]],  // 登录密码
      loginPasswordEnt: [null, [Validators.required, this.confirmationValidator]], // 确认登录密码
      agree: [false],  // 同意协议
    });
    this.validateFormStep1 = this.fb.group({
      channelNo: sessionStorage.getItem('channelNo'),  // 平台编码[畅捷通]

      companyName: [null, [Validators.required]],  // 公司全称
      companyNo: [null, [Validators.required]],  // 统一社会信用代码
      provinceCode: [null, [Validators.required]],  // 省市区
      cityCode: [null, [Validators.required]],  // 市
      area: [null],  // 区
      address: [null, [Validators.required]],  // 详细地址
      business: [null, [Validators.required]],  // 经营范围
      businessDate: [null, [Validators.required]],  // 营业期限(截止) yyyy-mm-dd
      corporationName: [null, [Validators.required]],  // 法人姓名
      corporationNo: [null, [Validators.required]],  // 法人身份证号码
      corporationDate: [null, [Validators.required]],  // 法人身份证有效期限(截止) yyyy-mm-dd
      agentName: [null, [Validators.required]],  // 代办人姓名
      agentNo: [null, [Validators.required]],  // 代办人身份证号码
      agentDate: [null, [Validators.required]],  // 代办人身份证有效期限(截止) yyyy-mm-dd
      accountNo: [null, [Validators.required]],  // 对公账号
      accountName: [null, [Validators.required]],  // 对公账户名称
      bankName: [null, [Validators.required]],  // 对公账号开户行名

      licenseImg: [null, [Validators.required]], // 营业执照img
      corporationCardFrontImg: [null, [Validators.required]], // 法人身份证正面img
      corporationCardBackImg: [null, [Validators.required]], // 法人身份证背面img
      agentCardFrontImg: [null, [Validators.required]], // 代办人身份证正面img
      agentCardBackImg: [null, [Validators.required]], // 代办人身份证背面img

      radioValue: ['false', [Validators.required]] // 法人是否同代办人
    });
    this.validateFormStep2 = this.fb.group({
      payPassword: [null, [Validators.required]],  // 支付密码
      payPasswordEnt: [null, [Validators.required, this.confirmationPayPasswordValidator]],  // 确认支付密码

      // channelNo: [null, [Validators.required]],  // 平台编码[畅捷通]
      // merchUserNo: [null, [Validators.required]],  // 客户唯一编码[畅捷通]
      // inOperator: [null, [Validators.required]],  // 同意协议
      // token: [null, [Validators.required]],  // 开户短信验证码token值
      // imageList: [null, [Validators.required]],  // 循环节点  imageUrl imageName imageSuffix imageSuffix

    });
    this.getProvinceData();
  }


  onSearch(value: string): void {
    this.isLoading = true;
    this.getBankList(value);
    // this.searchChange$.next(value);
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('上传失败');
        this.loading = false;
        break;
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/png';
      if (!isJPG) {
        this.msg.error('请您上传png格式的图片!');
        observer.complete();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error('上传图片不能大于10M!');
        observer.complete();
        return;
      }
      // check height
      // this.checkImageDimension(file).then(dimensionRes => {
      // if (!dimensionRes) {
      //   this.msg.error('Image only 300x300 above');
      //   observer.complete();
      //   return;
      // }

      // observer.next(isJPG && isLt10M && dimensionRes);
      // observer.next(isJPG && isLt10M);
      // observer.complete();
      // });

      observer.next(isJPG && isLt10M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  customReq0 = (item: UploadXHRArgs) => {
    console.log(item);

    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
          this.fileList1_err = false;
          const resData: any = event.body;
          try {

          } catch (e) {
          }
          this.validateFormStep1.controls.licenseImg.setValue(resData.imageKey);
          this.validateFormStep1.controls['liceWnseImg'].markAsDirty();
          this.validateFormStep1.controls['licenseImg'].updateValueAndValidity();
          this.imageList[0] = {
            imageKey: resData.imageKey,
            imageName: item.file.name,
            imageSuffix: 'png',
            imageType: '1',
          };
        }
      },

      err => {
        // 处理失败
        item.onError!(err, item.file!);
        this.msg.error('上传失败');
        this.loading = false;
        this.fileList1_err = true;
      }
    );
  };
  customReq1 = (item: UploadXHRArgs) => {
    console.log(item);
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
          this.fileList2_err = false;
          const resData: any = event.body;
          this.validateFormStep1.controls.corporationCardFrontImg.setValue(resData.imageKey);
          this.validateFormStep1.controls['corporationCardFrontImg'].markAsDirty();
          this.validateFormStep1.controls['corporationCardFrontImg'].updateValueAndValidity();
          this.imageList[1] = {
            imageKey: resData.imageKey,
            imageName: item.file.name,
            imageSuffix: 'png',
            imageType: '2',
          };
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
        this.msg.error('上传失败');
        this.loading = false;
        this.fileList2_err = true;
      }
    );
  };
  customReq2 = (item: UploadXHRArgs) => {
    console.log(item);
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
          this.fileList3_err = false;
          const resData: any = event.body;
          this.validateFormStep1.controls.corporationCardBackImg.setValue(resData.imageKey);
          this.validateFormStep1.controls['corporationCardBackImg'].markAsDirty();
          this.validateFormStep1.controls['corporationCardBackImg'].updateValueAndValidity();
          this.imageList[2] = {
            imageKey: resData.imageKey,
            imageName: item.file.name,
            imageSuffix: 'png',
            imageType: '3',
          };
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
        this.msg.error('上传失败');
        this.loading = false;
        this.fileList3_err = true;
      }
    );
  };
  customReq3 = (item: UploadXHRArgs) => {
    console.log(item);
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
          this.fileList4_err = false;
          const resData: any = event.body;
          this.validateFormStep1.controls.agentCardFrontImg.setValue(resData.imageKey);
          this.validateFormStep1.controls['agentCardFrontImg'].markAsDirty();
          this.validateFormStep1.controls['agentCardFrontImg'].updateValueAndValidity();
          this.imageList[3] = {
            imageKey: resData.imageKey,
            imageName: item.file.name,
            imageSuffix: 'png',
            imageType: '4',
          };
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
        this.msg.error('上传失败');
        this.loading = false;
        this.fileList4_err = true;
      }
    );
  };
  customReq4 = (item: UploadXHRArgs) => {
    console.log(item);
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
          this.fileList5_err = false;
          const resData: any = event.body;
          this.validateFormStep1.controls.agentCardBackImg.setValue(resData.imageKey);
          this.validateFormStep1.controls['agentCardBackImg'].markAsDirty();
          this.validateFormStep1.controls['agentCardBackImg'].updateValueAndValidity();
          this.imageList[4] = {
            imageKey: resData.imageKey,
            imageName: item.file.name,
            imageSuffix: 'png',
            imageType: '5',
          };
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
        this.msg.error('上传失败');
        this.loading = false;
        this.fileList5_err = true;
      }
    );
  };

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

  selectBankOption(data) {
    for (let i = 0; i < this.bankListOption.length; i++) {
      if (this.bankListOption[i].bankName === data) {
        this.bankOptionInfo = this.bankListOption[i];
      }
    }
  }


  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    switch (this.current) {
      case 0:
        this.checkStep0();
        break;
      case 1:
        this.checkStep1();
        break;
      case 2:
        this.checkStep2();
        break;
    }

  }


  // check step current 0
  checkStep0() {
    if (!this.submitForm0()) {
      return;
    }

    if (this.phoneErrFlag) {
      return;
    }
    if (this.checkEmailFlag) {
      return;
    }
    if (!this.validateFormStep0.controls.agree.value) {
      return;
    }

    this.current += 1;
    this.changeContent();
  }

  // check step current 1
  checkStep1() {
    if (!this.submitForm1()) {
      return;
    }
    this.current += 1;
    this.changeContent();
  }

  // check step current 2
  checkStep2() {
    if (!this.submitForm2()) {
      return;
    }

    const sendData = {
      channelNo: sessionStorage.getItem('channelNo') === 'undefined' ? null : sessionStorage.getItem('channelNo'),  // 平台编码[畅捷通]

      userName: this.validateFormStep0.controls.userName.value, // 用户名
      phone: this.validateFormStep0.controls.phone.value, // 手机号
      email: this.validateFormStep0.controls.email.value, // 邮箱
      loginPassword: this.validateFormStep0.controls.loginPassword.value, // 登录密码
      loginPasswordEnt: this.validateFormStep0.controls.loginPasswordEnt.value, // 确认登录密码

      companyName: this.validateFormStep1.controls.companyName.value, // 公司全称
      companyNo: this.validateFormStep1.controls.companyNo.value, // 统一信用代码
      provinceCode: this.validateFormStep1.controls.provinceCode.value, // 省
      cityCode: this.validateFormStep1.controls.cityCode.value, // 市
      area: this.validateFormStep1.controls.area.value, // 区
      address: this.validateFormStep1.controls.address.value, // 详细地址
      business: this.validateFormStep1.controls.business.value, // 经营范围
      businessDate: this.common.onDateFormatChange(this.validateFormStep1.controls.businessDate.value), // 营业期限
      corporationName: this.validateFormStep1.controls.corporationName.value, // 法人姓名
      corporationNo: this.validateFormStep1.controls.corporationNo.value, // 法人身份证号码
      corporationDate: this.common.onDateFormatChange(this.validateFormStep1.controls.corporationDate.value), // 法人身份证有效期限
      agentName: this.validateFormStep1.controls.agentName.value, // 代办人姓名
      agentNo: this.validateFormStep1.controls.agentNo.value, // 代办人身份证号码
      agentDate: this.common.onDateFormatChange(this.validateFormStep1.controls.agentDate.value), // 代办人身份证有效期限
      accountNo: this.validateFormStep1.controls.accountNo.value, // 对公账号
      accountName: this.validateFormStep1.controls.accountName.value, // 对公账户名称

      bankName: this.bankOptionInfo.bankName, // 对公账号开户行名
      bankNo: this.bankOptionInfo.bankNo, // 对公账号开户行号
      bankCode: this.bankOptionInfo.bankNo, // 对公账号总行行号
      bank: this.bankOptionInfo.bankNo, // 对公账号总行行名
      bankLineNo: this.bankOptionInfo.bankLineNo, // 开户行清算行行号
      bankLineName: this.bankOptionInfo.bankLineName, // 开户行清算行行名
      bankShortNo: this.bankOptionInfo.bankShortNo, // 开户行总行标识
      bankShortName: this.bankOptionInfo.bankShortName, // 开户行总行名称
      liqBankNo: this.bankOptionInfo.liqBankNo, // 对公账户清算行行号

      imageList: this.imageList, // 循环节点

      payPassword: this.validateFormStep2.controls.payPassword.value, // 支付密码
      payPasswordEnt: this.validateFormStep2.controls.payPasswordEnt.value, // 确认支付密码

    };
    const resData: any = this.common.yql_fundRegisterCustomerInfo(sendData);
    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
    } else if (resData.response_head.service_status === '00' && resData.response_body.status === '01') {
      this.errMsg = resData.response_body.statusDesc;
      this.showErrModal();
    } else {
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


  }

  goLogin() {
    this.router.navigate(['/home/login']);
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

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateFormStep0.controls.loginPasswordEnt.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateFormStep0.controls.loginPassword.value) {
      return {confirm: true, error: true};
    }
  };

  updateConfirmPayValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateFormStep2.controls.payPasswordEnt.updateValueAndValidity());
  }

  confirmationPayPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateFormStep2.controls.payPassword.value) {
      return {confirm: true, error: true};
    }
  };


  changeSamePerson() {
    this.samePersonFlag = this.validateFormStep1.controls.radioValue.value === 'true' ? true : false;
    if (this.samePersonFlag) {
      this.validateFormStep1.controls.agentName.setValue(this.validateFormStep1.controls.corporationName.value);
      this.validateFormStep1.controls.agentNo.setValue(this.validateFormStep1.controls.corporationNo.value);
      this.validateFormStep1.controls.agentDate.setValue(this.validateFormStep1.controls.corporationDate.value);
      this.validateFormStep1.controls.agentCardFrontImg.setValue(this.validateFormStep1.controls.corporationCardFrontImg.value);
      this.validateFormStep1.controls.agentCardBackImg.setValue(this.validateFormStep1.controls.corporationCardBackImg.value);
      this.imageList[3] = JSON.parse(JSON.stringify(this.imageList[1]));
      this.imageList[4] = JSON.parse(JSON.stringify(this.imageList[2]));
    } else {
      this.validateFormStep1.controls.agentName.setValue(null);
      this.validateFormStep1.controls.agentNo.setValue(null);
      this.validateFormStep1.controls.agentDate.setValue(null);
      this.imageList[3] = {};
      this.imageList[4] = {};
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
    const varlue = this.validateFormStep0.controls.phone.value;
    if (this.validateFormStep0.get('phone').dirty) {
      if (!this.common.reqPhone(varlue)) {
        this.phoneErrFlag = true;
        return false;
      }
      this.phoneErrFlag = false;
      return true;
    }
  }

  // 邮箱校验
  checkEmail = (control: FormControl) => {
    const regexp = new RegExp('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$');
    const flag = regexp.test(control.value);
    if (flag) {
      this.checkEmailFlag = false;
    } else {
      this.checkEmailFlag = true;
    }
  };

  // 验证码校验
  checkCaptcha() {
    this.errMsgCode = false;
    const sendData = {
      phone: this.validateFormStep0.controls.phone.value, // 手机号码
      token: this.token, // 短信验证码token
      code: this.validateFormStep0.controls.code.value, // 短信验证码
    };
    const resData = this.common.yy_sendMessageValidate(sendData);
    if (resData.response_head.service_resp_code === 'E99999') {
      this.errMsgCode = true;
    }
    if (resData.response_head.service_resp_desc === '短信验证码不正确!') {
      this.errMsgCode = true;
    }
    if (resData.response_head.service_status !== '00') {
      this.errMsgCode = true;
    }

  }

  // 获取验证码
  getCaptcha() {
    if (!this.checkPhone()) {
      this.validateFormStep0.controls['phone'].markAsDirty();
      this.validateFormStep0.controls['phone'].updateValueAndValidity();
      return;
    }
    this.countDown();
    const sendData = {
      phone: this.validateFormStep0.controls.phone.value,
      register: '1'
    };
    const resData = this.common.yql_fundSendMessage(sendData);

    if (resData.response_head.service_status !== '00') {
      this.errMsg = resData.response_head.service_resp_desc;
      this.showErrModal();
    } else {
      this.token = resData.response_body.token;
    }

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


  handlePreview = (file: UploadFile) => {

    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };


  onChanges(values: any): void {
    console.log(values, this.values);
    if (this.values) {
      // @ts-ignore
      this.validateFormStep1.controls.provinceCode.setValue(this.values[0]);
      // @ts-ignore
      this.validateFormStep1.controls.cityCode.setValue(this.values[1]);
      // @ts-ignore
      this.validateFormStep1.controls.area.setValue(this.values[2]);
    }
  }

  provinceChange(value: string): void {
    this.provinceCode = value;

    this.getCityData();

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
