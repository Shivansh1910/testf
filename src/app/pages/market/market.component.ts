import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MarketdialogComponent } from 'src/app/components/marketdialog/marketdialog.component';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy {

  companies;
  news = [];
  all_news = [];
  game_time: Boolean = false;
  a = false;
  b = false;
  subs: any;
  sub: any;
  cash;

  constructor(private http: HttpClient, private dialog: MatDialog, private spinner: SpinnerService) { }
  
  ngOnDestroy(): void {
    // this.subs.unsubscribe()
    // this.sub.unsubscribe()
  }

  bid(company){
    console.log(company);

    // if(!this.game_time){
    //   alert('market is closed')
    //   return;
    // }

    
    let dialogRef = this.dialog.open(MarketdialogComponent, {
      height: '500px',
      width: '600px',
      data: { mode: 'Buy', company: company },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      var access_token = localStorage.getItem('token');

      var header = new HttpHeaders({
        'Authorization': "Bearer " + access_token 
      });
      var body = new FormData();
      body.append('code', company['code'])
      body.append('transac_type', 'buy')
      body.append('quantity', result)

      var price = result * company['current_market_price'];

      if (this.cash < price){
        alert('Not enough Cash availible')
        return;
      }


      if (result <= 0 ){
        alert ('Invalid Number of Shares (less than 0)')
        return;
      }

      else if (result > 10000){
        alert ('Invalid Number of Shares (more than 10,000)')
        return;
      }



      this.http.post<any>("https://api5.ecell.in/vsm/trans/", body, {headers: header}).subscribe(
        data => {
          console.log(data)
          alert('you have requested for '+ result + ' shares of ' + company['name'] + ' at ' + company['current_market_price'] + '. It will be soon executed if valid' )
          localStorage.removeItem('holding')
          localStorage.removeItem('trans')
          this.ngOnInit()
        },
        error => {
          console.log(error);
        }
      )
    });
    
    
  }

  ngOnInit(): void {
    // this.spinner.requestStarted();

    this.http.get<any>('https://api5.ecell.in/vsm/thread_companies/').subscribe(
      data => {
        data.companies.forEach(element => { element.company.percent = Math.abs(element.company.change*100/(element.company.current_market_price)).toFixed(2)
        });
        console.log(data)
        this.companies = data.companies
        this.a = true;

        this.spinner.requestEnded();
        // if(this.b){
        //   this.spinner.requestEnded();
        // }
      },
      error => {
        console.error('error');
        
      }
    )
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
    // this.sub = check.subscribe(val => {
    //   this.updateCompanies();
      // now = new Date()
      // if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
      //   this.game_time = true;
      // }
      // else {
      //   this.game_time = false;
      // }
    // })

    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
            data => {
              // console.log('cashhhhh')
              this.cash = data['cash'];
              this.cash = Math.floor(this.cash)           
            },
            error => {
              console.log(error);
              
            }
        )

    this.http.get<any>('https://api2.ecell.in/vsm/news/').subscribe(
      data => {      
        this.b = true;
        if(this.a){
          this.spinner.requestEnded();
        }  
        this.all_news = data
        // var current_time = new Date();
        
        // var diff = current_time.getTime() - start_time.getTime()
        
        // var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
        // // console.log('minutes into game', minutes);

        // if ( current_time.getTime() > end_time.getTime()){
        //   minutes = base_min + 60
        // }
        // var l = minutes;
        
        // this.all_news.forEach(element => {
        //   // console.log(element)
        //   if( element['show_id'] <= minutes){
        //     var n = {content: element['content'], title: element['title']}
        //     var m = this.news.length            
        //     this.news.splice(m-1, 0 , n)
        //   }
        // });

        // if ( current_time.getTime() > end_time.getTime()){
        //   minutes = base_min + 60
        //   return;
        // }


        // var i = 0
        
        // const source = interval(10000);
        // this.subs = source.subscribe(val => {
        //   var current_time = new Date();
          
        //   var diff = current_time.getTime() - start_time.getTime()
        
        //   var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
        //   // console.log('inside loop', minutes);



        //   if ( current_time.getTime() > end_time.getTime()){
        //     minutes = base_min + 60;
        //     return;
        //   }     
          
        //   this.all_news.forEach(element => {
        //     // console.log(element['show_id'])
        //     if( element['show_id'] == minutes && minutes != l){
        //       l = minutes;
        //       var n = {content: element['content']}
        //       this.news.splice(0,0,n)
        //     }
        //   });

        // })
        
      },
      error => {
        console.error('error'); 
      }
    )


  }

  updateCompanies(){
    this.http.get<any>('https://api5.ecell.in/vsm/thread_companies/').subscribe(
      data => {        
        data.companies.company.forEach(element => { element.company.percent = Math.abs(element.company.change*100/(element.company.current_market_price)).toFixed(2)
        });
        console.log(data)
        this.companies = data.companies
      },
      error => {
        console.error('error');
        
      }
    )
  }

  sell(cmp){
    console.log(cmp);
    // if(!this.game_time){
    //   alert('market is closed')
    //   return;
    // }

    var company = {};
    company['code'] = cmp['company_code']
    company['name']= cmp['company_name']
    company['current_market_price'] = cmp['company_cmp']
    

    let dialogRef = this.dialog.open(MarketdialogComponent, {
      height: '500px',
      width: '600px',
      data: { mode: 'Sell', company: company, cmp: cmp },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      var access_token = localStorage.getItem('token');

      var header = new HttpHeaders({
        'Authorization': "Bearer " + access_token 
      });
      var body = new FormData();
      body.append('code', company['code'])
      body.append('transac_type', 'sell')
      body.append('quantity', result)

      if (result > cmp['quantity']){
        console.log('rejected')
        alert("You can not sell more shares than you own")
        return;
      }

      if(result < 0){
        console.log('rejected')
        alert("You can not sell negative number of shares")
        return;
      }

      this.http.post<any>("https://api5.ecell.in/vsm/trans/", body, {headers: header}).subscribe(
        data => {
          console.log(data)
          alert('you have transacted for '+ result + ' shares of ' + cmp.company_name + ' at ' + cmp.company_cmp + '. It will be soon executed if valid' ) 
          localStorage.removeItem('holding')
          localStorage.removeItem('trans')
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
      )
    });
  }


  check(company){
    console.log(company)
    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    var body = new FormData();
    body.append('code', company.code)

    this.http.post<any>("https://api5.ecell.in/vsm/single_holdings/", body ,{headers: header}).subscribe(
        data => {
          if (data.status=='success' && data.holding.length !=0){
            console.log(data)
            console.log(data.holding.length)
            this.sell(data.holding[0])
          }
          else{
            console.log('some error occured')
            alert('You don not have any holding of this company')
          }

        },
        error => {
          console.log(error);

          
        }
    )

  }

}
