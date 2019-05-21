import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-fond',
  templateUrl: './page-not-fond.component.html',
  styleUrls: ['./page-not-fond.component.css']
})
export class PageNotFondComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
