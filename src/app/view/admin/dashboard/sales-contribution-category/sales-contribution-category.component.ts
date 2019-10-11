import { ChartSeries } from '../../../../models/chartseries';
import {Component} from '@angular/core';


@Component({
  selector: 'app-dashboard-sales-contribution-category',
  templateUrl: './sales-contribution-category.html'
})

export class DashboardSalesContributionCategoryComponent {
  activeYear: number = 0;
  activeCategory: number = 0;
  categories: string[] = ['GlowSkinWhite', 'AuraBotanic', 'Herbaku', 'DivaCare', 'Brand1', 'Brand2', 'Brand3'];
  years: string[] = [];

  chartsData: ChartSeries[] = [];

  view: any[] = [document.body.clientWidth - 200, 400];
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
        value: Math.round(Math.random() * 10000)
      });
    });
  }

  onSelect(event) {
    // console.log(event);
  }
}
