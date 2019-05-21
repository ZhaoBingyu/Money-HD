import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-money-hd-home',
  templateUrl: './money-hd-home.component.html',
  styleUrls: ['./money-hd-home.component.css']
})
export class MoneyHdHomeComponent implements OnInit {

  public productList: any = [];

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
    $('#loader-wrapper').hide();
    this.queryProductList();
  }


  queryProductList() {
    const sendData = {
      channelNo: sessionStorage.getItem('channelNo')
    };
    const resData = this.common.yql_fundQueryProductListInfo(sendData);
    this.productList = resData.response_body.record;
  }


  applyForPurchase(data) {
    this.common.setRouterJump(data);
    sessionStorage.setItem('inputData', JSON.stringify(data));
    this.router.navigate(['/home/applyForPurchase']);
  }

}
