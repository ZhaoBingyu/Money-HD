import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isCollapsed = false;




  constructor(public common: CommonService, public router: Router) {
  }

  ngOnInit() {
    $(window).scroll(function () {
      const headerHeight = 64;
      if ($(window).scrollTop() > headerHeight) {
        $('.menu_fold').css({'top': '1px'});
        $('.menu_unfold').css({'top': '1px'});
      } else {
        $('.menu_fold').css({'top': '64px'});
        $('.menu_unfold').css({'top': '64px'});
      }
    });
  }

  ngOnDestroy() {
  }

  toggleCollapsed(): void {
    console.log($(window).scrollTop());
    const headerHeight = 64;
    if ($(window).scrollTop() > headerHeight) {
      $('.menu_fold').css({'top': '1px'});
      $('.menu_unfold').css({'top': '1px'});
    } else {
      $('.menu_fold').css({'top': '64px'});
      $('.menu_unfold').css({'top': '64px'});
    }
    this.isCollapsed = !this.isCollapsed;

  }
}
