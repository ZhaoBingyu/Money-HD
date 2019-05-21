import {Component, OnInit, Input} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css'],
})
export class TreeviewComponent implements OnInit {
  @Input() menuArray: any;

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
    this.getActiveTreeItem(this.menuArray, this.router.url);
  }

  // 选中侧边菜单跳转路由
  changeRouter(data) {
    console.log(data);
    event.stopPropagation();
    if (data.menuChildrenList) {
      const routeUrl = '/home/enterCenter/tradeRecordPurchase';
      this.router.navigate([routeUrl]);
      this.getActiveTreeItem(this.menuArray, routeUrl, data);
    } else {
      const routeUrl = data.url;
      this.getActiveTreeItem(this.menuArray, routeUrl);
      this.router.navigate([routeUrl]);
      this.common.setRouterJump(data);
    }

  }

  // active 菜单 递归
  getActiveTreeItem(data, routerUrl, sumMenu?) {
    try {
      for (let i = 0; i < data.length; i++) {
        if (data[i].menuChildrenList) {
          if (sumMenu || routerUrl.indexOf('tradeRecord') > -1) {
            console.log(data[i]);
            data[i].active = true;
            // data[i].open = true;
          } else {
            data[i].open = false;
            data[i].active = false;
          }
          this.getActiveTreeItem(data[i].menuChildrenList, routerUrl);
        } else {
          if (data[i].url === routerUrl) {
            data[i].active = true;
          } else {
            data[i].active = false;
          }
        }
      }
    } catch (e) {

    }

    return data;
  }

}
