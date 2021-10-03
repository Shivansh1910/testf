import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private http: HttpClient) {
    this.location = location;
  }

  url;
  fname;
  lname;
  access_token;
  game_time: Boolean = true;

  logout(){
    localStorage.clear();
    alert('You have successfully logout')
    this.router.navigate(['/login'])
    // window.location.reload();
  }

  ngOnInit() {

    if(!localStorage.getItem('token')){
      alert('You are not currently logged in! please login to continue.')
      // this.router.navigate(['/login'])
      this.router.navigate(['/login'])
    }

    var base_min = 0
    var now = new Date();
    console.log(now.getMonth(), now.getDate(), now.getHours())
    // if(now.getDate() == 21 && now.getHours() < 16) {
    //   console.log('day 1 testing');      
    //   var start_time = new Date('2020-08-21 12:30:00')
    //   var end_time = new Date('2020-08-21 13:30:00')
    // }
    // else if(now.getDate() == 21){
    //   console.log('day 1');      
    //   var start_time = new Date('2020-08-21 21:00:00')
    //   var end_time = new Date('2020-08-21 22:00:00')
    // }
    // else if(now.getDate() == 22){
    //   console.log('day 2');
    //   var start_time = new Date('2020-08-22 21:00:00')
    //   var end_time = new Date('2020-08-22 22:00:00')
    //   base_min = 60
    // }
    // else if(now.getDate() == 23){
    //   console.log('day 3');
    //   var start_time = new Date('2020-08-23 21:00:00')
    //   var end_time = new Date('2020-08-23 22:00:00')
    //   base_min = 120
    // }
    // else {
    //   var start_time = new Date('2020-08-21 21:00:00')
    //   var end_time = new Date('2020-08-21 22:00:00')
    // }

    // if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
    //   this.game_time = true;
    // }
    // else {
    //   this.game_time = false;
    // }
    // const check = interval(1000)
    // check.subscribe(val => {
    //   now = new Date()
    //   if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
    //     this.game_time = true;
    //   }
    //   else {
    //     this.game_time = false;
    //   }
    // })


    this.url = 'https://www.ecell.in/ca/dash/assets/img/person_holder.jpg';
    if(localStorage.getItem('image_url')){
      this.url = localStorage.getItem('image_url');
    }
    var access_token = localStorage.getItem('token');

    var header = new HttpHeaders({
      'Authorization': "Bearer " + access_token 
    });

    this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
      data => {
        // console.log(data)
        this.fname = data['fname'];
        this.lname = data['lname'];
      },
      error => {
        console.info('referesh token: ', localStorage.getItem('refresh_token'))
        if(!localStorage.getItem('refresh_token')){
          this.logout()
        }
        var authToken = localStorage.getItem('refresh_token')
        var body = new FormData();
        body.append('grant_type', 'refresh_token');
        body.append('client_id', 'lMUgn0nSzO8TX2EdU0gQ7IoaLI6iDeUsBSUVC2qd');
        body.append('client_secret', 'qg3qhBTh6YEjJDd7nP9CrBZuMip8JjsG3SwV2l4KD6Is1gefhKPGko1p7QF9bPpLQ2xkt1blj99wXCzftTyX4XEz9R9bgdIjKbBC5azt3HJpJy2hPaoZvhKdwKFjOEkB');
        body.append('refresh_token', localStorage.getItem('refresh_token'));
        
        this.http.post<any>("https://api5.ecell.in/django-oauth/token", body).subscribe(
          data => {
            this.access_token = data['access_token'];
            // console.log(data);
            localStorage.setItem('token', this.access_token);
            localStorage.setItem('refresh_token', data['refresh_token'])

            var header1 = new HttpHeaders({
              'Authorization': "Bearer " + data['access_token']
            });

            this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header1}).subscribe(
            data => {
              console.log(data)
              this.fname = data['fname'];
              this.lname = data['lname'];
            },
            error => {
              console.log('error ')
            }
            )
            
          }, error =>{
            this.logout()
            console.log('error', error)
          });
              
      }
    )
    
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
