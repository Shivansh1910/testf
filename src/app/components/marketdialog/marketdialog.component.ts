import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-marketdialog',
  templateUrl: './marketdialog.component.html',
  styleUrls: ['./marketdialog.component.css']
})
export class MarketdialogComponent implements OnInit {

  number : number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MarketdialogComponent>) { }

  ngOnInit(): void {
    if(this.data['cmp']['quantity']){
      this.number = this.data['cmp']['quantity']
    }
  }

  buy(){
    
    this.dialogRef.close(this.number)
  }


}
