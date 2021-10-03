import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: [];

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.requestStarted();
    this.http.get<any>("https://api2.ecell.in/vsm/faq/").subscribe(
      data => {
        this.faqs = data.reverse();
        this.spinner.requestEnded();
      }
    )
  }

}
