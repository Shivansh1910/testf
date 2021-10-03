import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sec-login',
  templateUrl: './sec-login.component.html',
  styleUrls: ['./sec-login.component.css']
})
export class SecLoginComponent implements OnInit {

  token;
  constructor() { }

  saveToken(){
    localStorage.setItem('token', this.token);
  }
  
  ngOnInit(): void {

  }

}
