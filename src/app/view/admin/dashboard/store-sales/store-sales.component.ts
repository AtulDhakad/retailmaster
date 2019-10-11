import { Component, OnInit } from '@angular/core';
import { Month, months, stores, years } from './../../../../models/salesData';

@Component({
  selector: 'app-store-sales',
  templateUrl: './store-sales.component.html',
  styleUrls: ['./store-sales.component.scss']
})
export class StoreSalesComponent implements OnInit {
  stores: Array<object> = stores;
  years: number[] = years;
  months: Month[] = months;
  constructor() { }

  ngOnInit() {
    
  }

}
