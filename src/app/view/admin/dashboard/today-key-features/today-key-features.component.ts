import { ChartData } from '../../../../models/chartdata';
import { ChartSeries } from '../../../../models/chartseries';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-today-key-features',
  templateUrl: './today-key-features.html'
})

export class DashboardKeyFeaturesComponent {

  names: string[] = ['7-day average', '30-day average'];

  chartData: ChartData[] = [];

  view: any[] = [document.body.clientWidth - 200, 400];
  dummyData: number[] = [
    6900, 7800, 2700, 8950,
    5800, 7400, 2000, 9200,
    1100, 6500, 5850, 5800,
    1100, 9100, 4550, 3100,
    2800, 1100, 3100, 5000,
    2900, 4900, 1500, 8100,
    5300, 6950, 1000, 1050,
    7600, 6900, 1100, 6900
  ];

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor() {
    this.names.forEach((name, idx) => {
      const series: ChartSeries[] = [];
      const year: number = 1;
      for (let i = 1; i <= 31; i++) {
        series.push({
          name: i + '',
          value: idx === 0 ? Math.round(Math.random() * 10000) : this.dummyData[i - 1]
        });
      }
      this.chartData.push({
        name: name,
        series: series
      });
    });
  }

  onSelect(event) {
    // console.log(event);
  }
}
