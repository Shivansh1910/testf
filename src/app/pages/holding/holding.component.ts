import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarketdialogComponent } from 'src/app/components/marketdialog/marketdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {

  companies;
  game_time;
  testing;

  constructor(private http: HttpClient, private dialog: MatDialog, private spinner: SpinnerService) { }


  bid(cmp){
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
          alert('you have transacted for '+ result + ' shares of ' + cmp.company_name + ' at ' + cmp.company_cmp  + '. It will be soon executed if valid' )
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

  ngOnInit(): void {
    this.spinner.requestStarted();
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
    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    var retrievedObject = localStorage.getItem('holding');
    if (retrievedObject !=null){
      console.log('retrievedObject');
      this.companies  = JSON.parse(retrievedObject);
      this.spinner.requestEnded();
    }

    else{
      this.http.get<any>('https://api5.ecell.in/vsm/my-holdings/', {headers: header}).subscribe(
        data => {
          data.forEach(element => { element.curr = element.company_cmp*element.quantity
          });
          console.log('from server')
          this.companies = data;
          localStorage.setItem('holding', JSON.stringify(data));
          this.spinner.requestEnded();
        },
        error => {
          console.error('error');
          this.spinner.requestEnded();
          
        }
      )
    }
    
      
      // const source = interval(1000);
      // source.subscribe(val => this.updateHoldings())
  }

  updateHoldings(){
    // console.log('update kar rhe bhaiya');
    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    this.http.get<any>('https://api5.ecell.in/vsm/my-holdings/', {headers: header}).subscribe(
      data => {
        console.log(data)
        data.forEach(element => { element.curr = element.company_cmp*element.quantity
        });
        
        this.companies = data
      },
      error => {
        console.error('error');
        
      }
    )
   
  }

}
