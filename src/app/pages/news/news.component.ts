import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  


  news = []
  all_news = []
  subs: any;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }
  ngOnDestroy(): void {
    // this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.spinner.requestStarted();

    var base_min = 0
    this.news.push({content: 'welcome to the VSM'})
    var now = new Date();
    console.log(now.getMonth(), now.getDate(), now.getHours())
    if(now.getDate() == 21 && now.getHours() < 16) {
      console.log('day 1 testing');      
      var start_time = new Date('2020-08-21 12:30:00')
      var end_time = new Date('2020-08-21 13:30:00')
    }
    else if(now.getDate() == 21){
      console.log('day 1');      
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }
    else if(now.getDate() == 22){
      console.log('day 2');
      var start_time = new Date('2020-08-22 21:00:00')
      var end_time = new Date('2020-08-22 22:00:00')
      base_min = 60
    }
    else if(now.getDate() == 23){
      console.log('day 3');
      var start_time = new Date('2020-08-23 21:00:00')
      var end_time = new Date('2020-08-23 22:00:00')
      base_min = 120
    }
    else {
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }

    this.http.get<any>('https://api2.ecell.in/vsm/news/').subscribe(
      data => {      
          
        this.spinner.requestEnded();

        console.log(data)
        this.all_news = data
        // var current_time = new Date();
    
        // var diff = current_time.getTime() - start_time.getTime()
        
        // var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
        // console.log('minutes into game', minutes);
        // var l = minutes;

        // if ( current_time.getTime() > end_time.getTime()){
        //   minutes = base_min + 60
        // }
        
        // this.all_news.forEach(element => {
          // console.log(element['show_id'])
          // if( element['show_id'] <= minutes){
            // var n = {content: "<h3>" + element['title'] + "</h3> <br>" + element['content']}
            // var m = this.news.length            
            // this.news.splice(m-1, 0 , n)
          // }
        // });

        // if ( current_time.getTime() > end_time.getTime()){
        //   minutes = base_min + 60;
        //   return;
        // }

        // var i = 0
        // const source = interval(1000);
        // this.subs = source.subscribe(val => {
        //   var current_time = new Date();
          
        //   var diff = current_time.getTime() - start_time.getTime()
        
        //   var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
        //   console.log('inside loop', minutes);

        //   if ( current_time.getTime() > end_time.getTime()){
        //     minutes = base_min + 60;
        //     return;
        //   }          

          // this.all_news.forEach(element => {
          //   // console.log(element['show_id'])
          //   if( element['show_id'] == minutes && minutes != l){
          //     l = minutes;
          //     var n = {content: "<h3>" + element['title'] + "</h3> <br>" + element['content']}
          //     this.news.splice(0,0,n)
          //   }
          // });

        // })
        
      },
      error => {
        console.error('error'); 
        this.spinner.requestEnded();
      }
    )

     
  }

}
