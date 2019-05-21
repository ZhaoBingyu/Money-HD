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
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})


export class AccountInfoComponent implements OnInit {

  // 理财产品List
  public productList = [{}, {}];

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
  }

  applyForPurchase(data) {
    console.log(data);
    this.common.setRouterJump(data);
    this.router.navigate(['/home/applyForPurchase']);
  }

  goUpdateLoginPwd() {
    this.router.navigate(['/home/updateLoginPassword']);
  }
  goUpdatePayPwd() {
    this.router.navigate(['/home/updatePayPassword']);
  }
}









