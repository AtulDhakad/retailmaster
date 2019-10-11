import { ChartSeries } from '../../../../models/chartseries';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-bestselling-products',
  templateUrl: './bestselling-products.html'
})

export class DashboardBestSellingComponent {
  activeYear: number = 0;
  activeCategory: number = 0;
  categories: string[] = ['Whitening cream', 'Facial Cleanser', 'Body Lotion'];
  years: string[] = [];

  chartsData: ChartSeries[] = [];

  view: any[] = [document.body.clientWidth - 200, 30 * this.categories.length];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: [
      '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
    ]
  };
  maxNumber: number = 1000;

  // line, area
  autoScale = true;

  constructor() {
    this.initYears();
    this.createAllStoreChart();
  }

  initYears(): void {
    let year = 2017;
    for (let i = 0; i < 12; i++) {
      this.years.push((year++) + '');
    }
  }

  createAllStoreChart(): void {
    this.categories.forEach(name => {
      this.chartsData.push({
        name: name,
        value: this.maxNumber -= 50
      });
    });
  }

  onSelect(event) {
    // console.log(event);
  }
}
