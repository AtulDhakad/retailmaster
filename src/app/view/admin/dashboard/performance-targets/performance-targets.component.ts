import {Employee} from '../../../../models/employee';
import {Gridline} from '../../../../models/gridline';
import {PerformanceTargetStore} from '../../../../models/performancetargetstore';
import { TotalTargetObject } from '../../../../models/totaltargetobject';
import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'app-dashboard-performance-targets',
  templateUrl: './performance-targets.html'
})
export class DashboardPerformanceTargetsComponent implements OnInit {
  gridline: Gridline;
  totalInterval: number;
  max_val: number;
  selectedStore: PerformanceTargetStore;
  selectedEmployee: Employee;
  step: number;
  totaIteration: number[];
  stores: PerformanceTargetStore[];
  employees: Employee[];
  targetEntered: number;
  ngOnInit(): void {
    this.initGridline();
  }
  constructor(private service: DashboardService) {}

  initGridline(): void {
    this.service.getGridlineSettings().subscribe(gd => {
      this.gridline = gd[0];
      this.totalInterval = Math.round(this.gridline.max_value / this.gridline.gridline_interval);
      // this.totalInterval = this.totalInterval / 1094;
      this.max_val = this.gridline.max_value;
      this.step = this.gridline.gridline_interval;
      // console.log(this.max_val);
      // console.log(this.step);
      // console.log(this.totalInterval);
      this.totaIteration = new Array(this.totalInterval);
      for (let i: number = 0; i < this.totalInterval; i++) {
        this.totaIteration[i] = i + 1;
      }
    });
    this.GetStoreEmployee();
  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }
  getCssClass() {
    const items: string[] = ['slider slider-purple', 'slider slider-blue', 'slider slider-red', 'slider slider-grey'];
    return items[Math.floor(Math.random() * items.length)];
  }
  onSelectStore(store: PerformanceTargetStore): void {
    this.selectedStore = store;
    this.selectedEmployee = null;
  }
  onTotalTarget(totalStoreTargetObjec: TotalTargetObject) {
   // Utils.stArr.find(item => item.store === totalStoreTargetObjec.storeName).target = totalStoreTargetObjec.totalTarget;
   // this.stores = Utils.stArr;
    // this.tempWebsites.find(item => item.id === store.website_id).name
  }
  onSelectedEmployee(employee: Employee): void {
    this.selectedStore = null;
    this.selectedEmployee = employee;
  }

  onSaveChanges(): void {
    // console.log(this.selectedEmployee);
    // console.log(this.targetEntered);
    // console.log(this.selectedStore);


    if (this.selectedEmployee !== null) {
      // this.selectedEmployee.target = this.targetEntered;
      for (const emp of Utils.empArr) {
        if (emp.id === this.selectedEmployee.id) {
          emp.target = this.targetEntered;
        }
      }
      this.service.saveEmployee(this.selectedEmployee, this.targetEntered);
    } else {
      // this.selectedStore.target = this.targetEntered;
      this.service.saveStore(this.selectedStore, this.targetEntered);
    }
  }
  GetStoreEmployee(): void {
    Utils.getStoreArr();
    Utils.getEmployeeArr();
    /* this.service.getStoreEmployee().then(storeEmployee => {
         // console.log(storeEmployee);
     });*/
    //    this.stores = new Array();
    //    this.employees = new Array();
    //    this.service.getStore().then(strs => {
    //      // console.log(strs);
    //      this.service.getEmployee().then(emps => {
    //        this.employees = emps;
    //        for (const st of strs) {
    //          st.target = 600;
    //          this.stores.push(st);
    //        }
    //      });
    //    });
    this.stores = Utils.stArr;
    // console.log(this.stores);
  }
  saveGridline(): void {
    const gridLine: Gridline = new Gridline(this.gridline.max_value, this.gridline.gridline_interval);
    // 'id=1&max_value=' + this.gridline.max_value + '&gridline_interval=' + this.gridline.gridline_interval
    this.service.saveGridline(gridLine).subscribe(res => {
      this.gridline = res as Gridline;
    });
  }
  onSaveAllStore(): void {
    //  this.service.saveAllData(this.stores)
  }
}

