import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {CommonService} from '../../../../service/common.service';
import {CommonUrlService} from '../../../../service/common-url.service';

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.css']
})


export class MyAssetsComponent implements OnInit {
  isErrVisible = false;
  isLoginVisible = false;
  errMsg = '';
  queryLoading = false;
  validateForm: FormGroup;
  resultData: any = [];
  pageVo: any = {
    currentPage: undefined,
    rows: undefined,
    totalPages: undefined,
    totalRows: undefined
  };
  roleUseScopeList: any;

  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [];
  userRoleList: any = [];


  // 理财产品List
  public productList: any = [];
  eyeLookFlag: any = true;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public common: CommonService,
              public url: CommonUrlService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      enumType: [null],
      enumName: [null],
      enumParentName: [null],
      enumCode: [null],
      status: [null]
    });
    this.querySubmit();
  }

// 查看详情
  changeEyeLookFlag(item) {
    item.eyeLookFlag = !item.eyeLookFlag;
    const productInfo = item;
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken'),
      productCode: productInfo.productCode, //	产品编码
      bankCode: productInfo.bankCode, //	银行编码
    };
    const resData = this.common.api_fundHoldProduct(sendData);

    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].productCode === item.productCode) {
        this.productList[i].availableShare = resData.response_body.availableShare;
      }
    }
  }

//  查询
  querySubmit() {
    this.productList = [];
    const sendData = {
      'Accept-Authentication': sessionStorage.getItem('sessionToken')
    };
    const resData = this.common.api_fundCompanyBankList(sendData);
    const openAccount = resData.response_head.service_resp_code;
    // // 未登录
    // if (openAccount === 'E88888') {
    //   this.showLoginModal();
    //   return;
    // }
    if (resData.response_head.service_status !== '00') {
      this.showErrModel();
      this.errMsg = resData.response_head.service_resp_desc;
    }

    try {
      this.productList = resData.response_body.record;
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i].eyeLookFlag = true;
      }

    } catch (e) {
    }


    // try {
    //   // this.userRoleList = resData;
    //   this.downFlag = true;
    // } catch (e) {
    //   this.userRoleList = [];
    //   this.downFlag = false;
    // }
    // this.queryLoading = false;
    // try {
    //   this.userRoleList = JSON.parse(this.common.selectEnumList(sendData).dataList[0]);
    //   for (let i = 0; i < this.userRoleList.length; i++) {
    //     if (this.userRoleList[i].status === 'S') {
    //       this.userRoleList[i].statusText = '有效';
    //     } else {
    //       this.userRoleList[i].statusText = '无效';
    //     }
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // this.resultData = this.data;
    this.queryLoading = false;
  }


//  延时查询
  delayQuerySubmit() {
    this.queryLoading = true;
    setTimeout(() => {
      this.querySubmit();
    }, 20);
  }

//  重置
  resetBtn() {
    this.validateForm.reset();
  }

  freshRoleInfoList($event) {
    // console.log($event);
    if ($event.code === '2000') {
      this.querySubmit();
    }
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  goApplyPurchase(item) {
    console.log(item);
    // const bankCode = this.productInfo.bankCode;
    // switch (bankCode) {
    //   case 'ICBC':
    //     this.router.navigate(['/home/openAccountICBC']);
    //     break;
    //   case 'JSLC':
    //     this.router.navigate(['/home/openAccountJSBC']);
    //     break;
    // }
    this.router.navigate(['/home/applyForPurchase']);
  }

  goRedeemPurchase(item) {
    console.log(item);
    sessionStorage.setItem('redeemProductInfo', JSON.stringify(item));
    this.router.navigate(['/home/redeemPurchase']);
  }


  showLoginModal(): void {
    this.isLoginVisible = true;
  }

  handleLoginOk(): void {
    this.isLoginVisible = false;
    this.router.navigate(['/home/login']);
  }

  handleLoginCancel(): void {
    this.isLoginVisible = false;
  }

  showErrModel(): void {
    this.isErrVisible = true;
  }

  handleErrOk(): void {
    this.isErrVisible = false;
  }

  handleErrCancel(): void {
    this.isErrVisible = false;
  }

}

