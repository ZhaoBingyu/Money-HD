import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonService} from '../../../../../service/common.service';
import {CommonUrlService} from '../../../../../service/common-url.service';
import {saveAs} from 'file-saver';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {zh_CN, NzI18nService} from 'ng-zorro-antd';


@Component({
  selector: 'app-trade-record-turnout',
  templateUrl: './trade-record-turnout.component.html',
  styleUrls: ['./trade-record-turnout.component.css']
})

export class TradeRecordTurnoutComponent implements OnInit {
  queryLoading = false;
  date: any;
  validateForm: FormGroup;
  pageVo: any = {
    currentPage: undefined,
    rows: undefined,
    totalPages: undefined,
    totalRows: undefined
  };
  userRoleList: any = [];
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
      startDate: [null], // 开始时间
      endDate: [null], // 结束时间
      bankCode: [null], // 银行编码
      productCode: [null], // 产品编码
    });
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
      pageNo: this.pageVo.currentPage, // 查询当前页
      pageSize: 10, // 一页查询条数
      startDate: this.common.onDateFormatChange(this.validateForm.controls.startDate.value), // 开始时间
      endDate: this.common.onDateFormatChange(this.validateForm.controls.endDate.value), // 结束时间
      bankCode: this.validateForm.controls.bankCode.value, // 银行编码
      productCode: this.validateForm.controls.productCode.value, // 产品编码
    };

    const resData = this.common.api_fundCashProductList(sendData);
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













