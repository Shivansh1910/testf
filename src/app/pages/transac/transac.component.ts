import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-transac',
  templateUrl: './transac.component.html',
  styleUrls: ['./transac.component.css']
})
export class TransacComponent implements OnInit {

  companies;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.requestStarted()
    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    var retrievedObject = localStorage.getItem('trans');
    if (retrievedObject !=null){
      console.log('retrievedObject');
      this.companies  = JSON.parse(retrievedObject);
      this.spinner.requestEnded();
    }
    else{
      this.http.get<any>('https://api5.ecell.in/vsm/trans/', {headers: header}).subscribe(
        data => {
          
          console.log('from server')
          this.companies = data.reverse()
          this.spinner.requestEnded()
          localStorage.setItem('trans', JSON.stringify(this.companies));
          // var retrievedObject = localStorage.getItem('trans');
          // console.log(JSON.parse(retrievedObject))
        },
        error => {
          this.spinner.requestEnded();
          console.error('error');
          
        }
      )
    }

      
  }

}
