import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isVisible = false;

  constructor(private router: Router, public common: CommonService) {
  }

  ngOnInit() {
  }

}
