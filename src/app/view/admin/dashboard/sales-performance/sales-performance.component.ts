import { ChartSeries } from '../../../../models/chartseries';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-sales-performance',
  templateUrl: './sales-performance.html'
})

export class DashboardSalesPerformanceComponent {

  names: string[] = ['Dropship', 'Facebook', 'Lazada', 'POS', 'Reseller', 'Retail', 'Website'];
  stores: string[] = ['total', 'all_stores', 'dropship', 'facebook', 'lazada', 'pos', 'reseller', 'retail', 'website'];
  chartsData: any = {};

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

  chartType: string = 'year';
  chartTypes: string[] = ['year', 'month', 'week', 'today'];
  selectedChart = 'all_stores';

  // line, area
  autoScale = true;

  constructor() {
    this.filterGraphByYear();
    this.selectedChart = 'all_stores';
  }

  filterGraphByToday(): void {

  }

  filterGraphByWeek(): void {

  }

  filterGraphByMonth(): void {

  }

  filterGraphByYear(cname?: string[]): void {
    cname = cname ? cname : this.stores;
    this.chartTypes.forEach(chartTypeName => {
      cname.forEach((name, idx) => {
        if (name === 'all_stores') {
          this.chartsData[`${name.toLowerCase()}_${chartTypeName}`] = [];
          this.names.forEach(storeName => {
            this.insertYearData(name, idx, storeName, chartTypeName);
          });
        } else {
          this.insertYearData(name, idx, idx === 0 ? 'Total' : idx === 1 ? 'All Stores' : this.names[idx - 2], chartTypeName, true);
        }
      });
    });
  }

  private insertYearData(name: string, idx: number, store_name: string, chartTypeName: string, clearData?: boolean): void {
    const series: ChartSeries[] = [];
    const year: number = 2011;
    const startPoint: number = 1;
    let endPoint: number = 12;
    switch (chartTypeName) {
      case this.chartTypes[0]:
        endPoint = 12;
        break;

      case this.chartTypes[1]:
        endPoint = 31;
        break;

      case this.chartTypes[2]:
        endPoint = 7;
        break;

      case this.chartTypes[3]:
        endPoint = 24;
        break;
    }
    for (let i = startPoint; i <= endPoint; i++) {
      series.push({
        name: i + '',
        value: Math.round(Math.random() * 10000)
      });
    }
    if (clearData) {
      this.chartsData[`${name.toLowerCase()}_${chartTypeName}`] = [];
    }
    this.chartsData[`${name.toLowerCase()}_${chartTypeName}`].push({
      name: store_name,
      series: series
    });
  }

  updateChart(chart: string, type: string): void {
    this.selectedChart = chart;
    this.chartType = type;
  }

  onSelect(event) {
    // console.log(event);
  }
}
