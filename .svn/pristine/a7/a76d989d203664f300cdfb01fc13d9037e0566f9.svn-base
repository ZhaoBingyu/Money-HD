import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: any;
  isVisible = false;
  public loginFlag = false;
  subscription: Subscription;

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem('companyName');
    this.loginFlag = this.common.validateLogin();
    this.subscription = this.common.getRouterJump()
      .subscribe(obj => {
        const data: any = obj;
        this.loginFlag = this.common.validateLogin(data.token);
        this.userName = sessionStorage.getItem('companyName') || data.companyName;
      });
  }


// 路由跳转
  changeView(routerPath) {
    switch (routerPath) {
      case 'moneyHDHome': // 首页
        this.router.navigate(['/home/moneyHDHome']);
        return;
      case 'enterpriseCenter': // 企业中心
        this.hasLogined();
        return;
      case 'login': // 登录
        this.router.navigate(['/home/login']);
        return;
      case 'register': // 注册
        this.router.navigate(['/home/register']);
        return;
    }
  }

  // 判断是否登录
  hasLogined() {
    this.isVisible = !this.common.validateLogin();
    this.router.navigate(['/home/enterCenter']);
  }

  logout() {
    sessionStorage.clear();
    const url = window.location.href;
    const index = url.indexOf('#');
    const host = url.slice(0, index);
    window.location.href = host;

  }

  busCertifi() {
    const flag = this.common.validateLogin();
    if (flag) {
      const routerUrl = `/home/portal/custInfoReg`;
      this.router.navigate([routerUrl]);
    } else {
      this.showModal();
    }
  }

  personInfo() {
    const flag = this.common.validateLogin();
    if (flag) {
      const routerUrl = `/home/portal/personInfo`;
      this.router.navigate([routerUrl]);
    } else {
      this.showModal();
    }
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
