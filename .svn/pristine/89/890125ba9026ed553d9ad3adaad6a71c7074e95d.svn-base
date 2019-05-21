import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-portal-menu-side',
  templateUrl: './portal-menu-side.component.html',
  styleUrls: ['./portal-menu-side.component.css'],
})
export class PortalMenuSideComponent implements OnInit, DoCheck {
  isVisible = false;
  menuArray = [];
  url: any;

  constructor(private router: Router, public common: CommonService) {
  }


  ngOnInit() {
    this.getSideMenu();
  }

  ngDoCheck(): void {
  }

  // 获取侧边菜单
  getSideMenu() {
    try {
      this.menuArray = [{
        'active': false,
        'menuName': '我的资产',
        'url': '/home/enterCenter/myAssets'
      },
        {
          'active': false,
          'open': false,
          'menuChildrenList': [
            {
              'active': false,
              'menuName': '申购',
              'url': '/home/enterCenter/tradeRecordPurchase'
            },
            {
              'active': false,
              'menuName': '赎回',
              'url': '/home/enterCenter/tradeRecordRedeem'
            },
            {
              'active': false,
              'menuName': '转出',
              'url': '/home/enterCenter/tradeRecordTurnout'
            },
            {
              'active': false,
              'menuName': '收益',
              'url': '/home/enterCenter/tradeRecordProfit'
            }
          ],
          'menuName': '交易记录'
        },
        {
          'active': false,
          'menuName': '账户信息',
          'url': '/home/enterCenter/accountInfo'
        },
        {
          'active': false,
          'menuName': '理财账户管理',
          'url': '/home/enterCenter/accountManagement'
        },
        {
          'active': false,
          'url': '/home/enterCenter/publicAccountMangement',
          'menuName': '对公账户管理'
        },
      ];
    } catch (e) {
      // console.log(e);
    }
  }




}
