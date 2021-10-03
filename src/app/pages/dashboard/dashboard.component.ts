import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  holdings;
  transactions;
  cash : number;
  count : number;
  net : number = 0;
  net_worth: number;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.requestStarted();

    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    var retrievedObject = localStorage.getItem('holding');
    if (retrievedObject !=null){
      console.log('retrievedObject');
      this.holdings  = JSON.parse(retrievedObject);
      this.count = this.holdings.length

      this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
          data => {
            // console.log('cashhhhh')
            this.cash = data['cash'];
            this.cash = Math.floor(this.cash)
            this.net_worth = this.net + this.cash;
            this.spinnerService.requestEnded();              
          },
          error => {
            console.log(error);
            
          }
      )

      this.holdings.forEach(element => {
        this.net += element['quantity']*element['company_cmp']      
        this.net = Math.floor(this.net)
      });
      this.spinnerService.requestEnded();
    }

    else{
      this.http.get<any>('https://api5.ecell.in/vsm/my-holdings/', {headers: header}).subscribe(
        data => {
          console.log('from server')
          this.holdings = data

          this.count = this.holdings.length

          this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
              data => {
                // console.log('cashhhhh')
                this.cash = data['cash'];
                this.cash = Math.floor(this.cash)
                this.net_worth = this.net + this.cash;
                this.spinnerService.requestEnded();              
              },
              error => {
                console.log(error);
                
              }
          )

          this.holdings.forEach(element => {
            this.net += element['quantity']*element['company_cmp']      
            this.net = Math.floor(this.net)
          });
        },
        error => {
          console.error('error');
          
        }
      )
    }
      

    var retrievedObject1 = localStorage.getItem('trans');
    if (retrievedObject1 !=null){
      console.log('retrievedObject1');
      this.transactions  = JSON.parse(retrievedObject1);
      this.spinnerService.requestEnded();
    }
    else{
      this.http.get<any>('https://api5.ecell.in/vsm/trans/', {headers: header}).subscribe(
        data => {
          console.log('from server')
          this.transactions = data.reverse()
          localStorage.setItem('trans', JSON.stringify(this.transactions));
        },
        error => {
          console.error('error');
          
        }
      )
    }
    
  }

}
