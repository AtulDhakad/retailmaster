import {Employee} from '../../../../../models/employee';
import {TotalTargetObject} from '../../../../../models/totaltargetobject';
import {DashboardService} from '../../../../../services/dashboard.service';
import {Utils} from '../../../../../utils/utils';
import {Component, OnInit, Input, EventEmitter, Output, NgZone, ChangeDetectorRef} from '@angular/core';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  @Input() storeName: string;
  @Input() max_val: number;
  @Input() grid_intervel: number;
  @Output() onSelectEmp: EventEmitter<Employee> = new EventEmitter();
  @Output() onTotalTarget: EventEmitter<Object> = new EventEmitter();
  filteredEmployee: Employee[];
  selectedEmployee: Employee;
  totalTarget: number = 0;
  constructor(private service: DashboardService) {}

  ngOnInit() {
    //    this.service.getEmployee().then(emps => {
    //      // this.employees = emps;
    //      this.filteredEmployee = Array();
    //      if (this.storeName !== '') {
    //        for (const emp of emps) {
    //          if (emp.store === this.storeName) {
    //            emp.target = 200;
    //            this.filteredEmployee.push(emp);
    //          }
    //        }
    //      }
    //    });
    const employees = Utils.empArr;
    this.filteredEmployee = Array();
    if (employees !== undefined && this.storeName !== '') {
      this.totalTarget = 0;
      for (const emp of employees) {
        if (emp.store === this.storeName) {
          this.totalTarget = this.totalTarget + emp.target;
          this.filteredEmployee.push(emp);
        }
      }
    }
//    if (this.filteredEmployee !== undefined && this.totalTarget !== 0) {
//      const totalTargetObject: TotalTargetObject = new TotalTargetObject();
//      totalTargetObject.storeName = this.storeName;
//      totalTargetObject.totalTarget = this.totalTarget;
//      this.onTotalTarget.emit(totalTargetObject);
//    }

    // console.log(this.filteredEmployee);
  }
  onSelectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    for (const emp of this.filteredEmployee) {
      if (emp.id === employee.id) {
        emp.target = employee.target;
      }
    }
    this.onSelectEmp.emit(this.selectedEmployee);
  }
}
