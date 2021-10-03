import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private future: Date;
  private futureString: string;
  private counter$: Observable<number>;
  private subscription: Subscription;
  private message: string;
  number = 0;

  demat;

  config = {};
  
  constructor(private http: HttpClient) { }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');  
  }


  update_profile(){
    console.log('yaha aaya');
    var access_token = localStorage.getItem('token');
    var header = new HttpHeaders({
      'Authorization': "Bearer " + access_token 
    });

    var body = new FormData();

    body.append('demat_accout', this.demat);

    this.http.patch<any>("https://api5.ecell.in/vsm/me/", body,  {headers: header}).subscribe(
      data => {
        // console.log(data);
        alert('Your Demat account ID has been noted')
      },
      error => {
        console.log(error);
        
      }
    )


  }

  
  ngOnInit(): void {
    var access_token = localStorage.getItem('token');
    var header = new HttpHeaders({
      'Authorization': "Bearer " + access_token 
    });
    
    this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
      data => {
        // console.log(data)
        this.demat = data['demat_accout']
      },
      error => {
        console.log(error);
        
      }
    )


    this.config['format'] = 'h:m:s';
    // {leftTime:, format: 'd:h:m:s'}
    this.futureString = 'August 12, 2020 20:00:00';
    this.future = new Date(this.futureString);
    var date = new Date();
    
    let currentDate = new Date();
    var dateSent = new Date(this.futureString);

    var int =  Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())));
    int *= -1;
    this.number = int;
    this.config['leftTime'] = this.number;

    console.log(int, currentDate, dateSent);
    

  }

}
