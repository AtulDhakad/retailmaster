import { ChartSeries } from '../../../../models/chartseries';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-key-performance',
  templateUrl: './key-performance.html'
})

export class DashboardKeyPerformanceComponent {

  names: string[] = ['Dropship', 'Facebook', 'Lazada', 'POS', 'Reseller', 'Retail', 'Website'];

  chartsData: ChartSeries[] = [];

  view: any[] = [document.body.clientWidth - 200, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: [
      '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
    ]
  };

  // line, area
  autoScale = true;

  constructor() {
    this.createAllStoreChart();
  }

  createAllStoreChart(): void {
    this.names.forEach(name => {
      this.chartsData.push({
        name: name,
        value: Math.round(Math.random() * 10000)
      });
    });
  }

  onSelect(event) {
    // console.log(event);
  }
}
