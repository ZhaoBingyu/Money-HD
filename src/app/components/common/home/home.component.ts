import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  isLoginVisible = false;
  isOpenAccountVisible = false;
  isErrVisible = false;
  errMsg = '';

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

  showOpenAccountModal(): void {
    this.isOpenAccountVisible = true;
  }

  handleOpenAccountOk(): void {
    this.isOpenAccountVisible = false;
    const bankCode = JSON.parse(sessionStorage.getItem('inputData')).bankCode;
    switch (bankCode) {
      case 'ICBC':
        this.router.navigate(['/home/openAccountICBC']);
        break;
      case 'JSLC':
        this.router.navigate(['/home/openAccountJSBC']);
        break;
    }
  }

  handleOpenAccountCancel(): void {
    this.isOpenAccountVisible = false;
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

  // model显示
  showModel(data) {
    switch (data) {
      case '':
        return;
      default:
        return;
    }
  }

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
    this.getChannelNo();
  }

  // 保存获取channelNo参数
  getChannelNo() {
    const channelNo = this.common.getUrlParameter('channelNo');
    sessionStorage.setItem('channelNo', channelNo);
  }


}
