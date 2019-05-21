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
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})


export class AccountManagementComponent implements OnInit {
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
  userRoleList: any = [];
  downFlag = false;

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

  // 企业理财开户行业列表 理财账户列表
  querySubmit() {
    this.userRoleList = [];
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken')
    };
    const resData = this.common.api_fundCompanyBankList(sendData);

    try {
      // this.userRoleList = resData;
      this.downFlag = true;
    } catch (e) {
      this.userRoleList = [];
      this.downFlag = false;
    }
    this.queryLoading = false;
    this.userRoleList = [{}];
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

  goDrawCash(data) {
    sessionStorage.setItem('drawCashInfo', JSON.stringify(data));
    this.router.navigate(['/home/drawCash']);
  }
}











