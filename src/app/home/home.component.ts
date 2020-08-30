import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myCookie;
  myData;

  constructor() { }

  ngOnInit() {
    this.myCookie = document.cookie;
    this.myData = localStorage.getItem('myData');
  }

}
