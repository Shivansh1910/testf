import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-sponser',
  templateUrl: './sponser.component.html',
  styleUrls: ['./sponser.component.css']
})
export class SponserComponent implements OnInit {

  countDownDate;
  time;
  clock: Observable<any>;
  days;
  hr;
  min;
  sec;

  constructor() { }

  ngOnInit(): void {
    this.countDownDate = new Date("August 21, 2020 21:00:00").getTime();
    var now = new Date().getTime();

    var distance = this.countDownDate - now;
    this.time = distance/100;

    const source = interval(1000);
    source.subscribe(val => this.callFunc())

  }

  callFunc(){
    var now = new Date().getTime();
    var distance = this.countDownDate - now;
    distance /= 1000;
    this.time = distance;
    var days: number = Math.floor (distance / (24 * 3600))
    distance -= days * 24 * 3600
    var hr: number = Math.floor(distance / 3600);
    var min: number = Math.floor( (distance - hr*3600)/60 );
    var seconds: number = Math.floor( (distance - hr*3600 - min*60));
    // console.log(days, hr, min, seconds)
    this.days = days;
    this.hr = hr;
    this.min = min;
    this.sec = seconds;

    // console.log(distance);
    
  }

}
