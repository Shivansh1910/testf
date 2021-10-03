import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  
  showOverlay: Boolean = false;

  constructor(private spinerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinerService.getSpinnerObserver().subscribe((status) => {
      this.showOverlay = status === 'start';
      this.cdRef.detectChanges();
    })
  }

}
