import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaders;
  iitb;
  a = false;
  b = false;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  ngOnInit(): void {

    this.spinner.requestStarted();

    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token') 
    });

    this.http.get<any>('https://api5.ecell.in/vsm/leaders/', {headers: header}).subscribe(
      data => {        
        // console.log(data)
        this.leaders = data
        this.a = true;
        if (this.b){
          this.spinner.requestEnded();
        }
      },
      error => {
        console.error(error);
        
      }
    )

    this.http.get<any>('https://api5.ecell.in/vsm/leaders-iitb/', {headers: header}).subscribe(
      data => {        
        // console.log(data)
        this.iitb = data
        this.b = true;
        if (this.a){
          this.spinner.requestEnded();
        }
      },
      error => {
        console.error(error);
        
      }
    )


  }

}
