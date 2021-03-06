import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {zh_CN, NzI18nService} from 'ng-zorro-antd';
import {CommonService} from '../../../../service/common.service';
import {CommonUrlService} from '../../../../service/common-url.service';

@Component({
  selector: 'app-public-account-management',
  templateUrl: './public-account-management.component.html',
  styleUrls: ['./public-account-management.component.css']
})

export class PublicAccountManagementComponent implements OnInit {
  queryLoading = false;
  date: any;
  validateForm: FormGroup;
  pageVo: any = {
    currentPage: undefined,
    rows: undefined,
    totalPages: undefined,
    totalRows: undefined
  };
  data = [];
  userRoleList: any = [{test: 'test'}];
  isVisible = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public common: CommonService,
              public url: CommonUrlService,
              private i18n: NzI18nService) {
  }

  ngOnInit() {
    this.i18n.setLocale(zh_CN);
    this.validateForm = this.fb.group({
      date: [null, [Validators.required]],
      custNo: [null],
      custName: [null],
      sales: [null],
      fgs: [null],
      agentName: [null],
      classifyName: [null],
      productLine: [null],
    });
    this.querySubmit();
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    for (const i in this.validateForm.controls) {
      // console.log(this.validateForm.controls[i].status);
      const status = this.validateForm.controls[i].status;
      if (status === 'INVALID') {
        // console.log(i);
        return false;
      }
    }
    return true;
  }

//  查询
  querySubmit() {
    this.userRoleList = [];
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
    };
    const resData: any = this.common.api_fundCompanyAccount(sendData);
    try {
      const openAccount = resData.response_head.service_resp_code;
      // // 未登录
      // if (openAccount === 'E88888') {
      //   this.showModal();
      //   return;
      // } else {
      //   // 00:成功；01:失败;02:未明确
      //   this.userRoleList = resData.response_body.recordList;
      //   for (let i = 0; i < this.userRoleList.length; i++) {
      //     this.userRoleList[i].expand = false;
      //     switch (this.userRoleList[i].status) {
      //       case '00':
      //         this.userRoleList[i].statusText = '成功';
      //         break;
      //       case '01':
      //         this.userRoleList[i].statusText = '失败';
      //         break;
      //       case '02':
      //         this.userRoleList[i].statusText = '未明确';
      //         break;
      //     }
      //   }
      // }
      this.userRoleList = resData.response_body.record;
    }catch (e) {
    }



    this.queryLoading = false;

  }

//  延时查询
  delayQuerySubmit() {
    if (!this.submitForm()) {
      return;
    }
    this.queryLoading = true;
    setTimeout(() => {
      this.querySubmit();
    }, 20);
  }

//  重置
  resetBtn() {
    this.validateForm.reset();
    this.date = null;
  }

  goAddAccount() {
    this.router.navigate(['/home/addPubAccountInfo']);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.router.navigate(['/home/login']);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}











