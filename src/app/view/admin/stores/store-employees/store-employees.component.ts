import {Employee} from '../../../../models/employee';
import {EmployeeRole} from '../../../../models/employeerole';
import {PerformanceTargetStore} from '../../../../models/performancetargetstore';
import {Status} from '../../../../models/status';
import {StoreGroup} from '../../../../models/storegroup';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnDestroy, ViewChild, ViewContainerRef, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-store-employees',
  templateUrl: './store-employees.html'
})

export class StoreEmployeesComponent {
  @ViewChildren('employeeComponent', {read: ViewContainerRef}) employeeComponent: ViewContainerRef;
  employees: Employee[];
  stores: StoreGroup[];
  roles: EmployeeRole[];
  statusArr: Status[] = Utils.getStatusArr();
  selectedEmployee: Employee;
  newEmployee: Employee = new Employee();
  selectedEmployeeRole: number;
  selectedSt: number;
  isActive: number;
  seletedStGroupid: number = 0;
  validationError: string = '';
  showModal: boolean = false;
  showNewModal: boolean = false;
  message: string;
  loading: boolean = false;
  constructor(private service: StoresService) {
    this.setLoading(true);
    this.message = '';
    this.service.getEmployees().subscribe(res => {

      this.employees = res[0].Employees;
      this.roles = res[1].EmployeeRole;
      this.stores = res[2].StoreGroup;
      for (const emp of this.employees) {
        emp.role_name = this.getRoleName(emp.role);
        if (emp.status.toString() === '1') {
          emp.status_name = 'Active';
        } else {
          emp.status_name = 'InActive';
        }
        if (emp.store_id !== null) {
          emp.store = this.getStoreName(emp.store_id);
        }
      }
      this.setLoading(false);
      // this.employees = emps;
    });
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  getStoreName(store_id: number): string {
    let stname: string = '';
    for (const store of this.stores) {
      if (store.group_id.toString() === store_id.toString()) {
        stname = store.name;
        break;
      }
    }
    return stname;
  }
  selectedStoreGroup(storeGrpid: number): void {
    this.seletedStGroupid = storeGrpid;
  }
  onEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  selectedRole(role: number): void {
    this.selectedEmployeeRole = role;
  }
  selectIsActive(val: number): void {
    this.isActive = val;
  }
  onValidation(employee: Employee): boolean {
    this.validationError = '';
    if (employee.password === '') {
      this.validationError = 'Please entere password';
      return false;
    }
    if (employee.confirmpassword === '') {
      this.validationError = 'Please entere confirm password';
      return false;
    }
    if (employee.password !== employee.confirmpassword) {
      this.validationError = 'Password and Confirm Password does not match, Please re-enter';
      return false;
    } else {
      return true;
    }
  }

  onEmployeeUpdate(): void {
    if (this.onValidation(this.selectedEmployee) === true) {
      this.setLoading(true);
      if (this.seletedStGroupid !== undefined) {
        this.selectedEmployee.store_id = this.seletedStGroupid;
      }
      if (this.selectedEmployeeRole !== undefined) {
        this.selectedEmployee.role = this.selectedEmployeeRole;
      }
      if (this.isActive !== undefined) {
        this.selectedEmployee.status = this.isActive;
      }
      this.service.updateemployee(this.selectedEmployee).subscribe(res => {
        const employee: Employee = res as Employee;
        for (const emp of this.employees) {
          if (emp.id === employee.id) {
            emp.name = employee.name;
            emp.role = employee.role;
            emp.loginname = employee.loginname;
            emp.password = employee.password;
            emp.status = employee.status;
            emp.role_name = this.getRoleName(emp.role);
            if (emp.status.toString() === '1') {
              emp.status_name = 'Active';
            } else {
              emp.status_name = 'InActive';
            }
            if (emp.store_id !== null) {
              emp.store = this.getStoreName(emp.store_id);
            }
          }
        }
        this.showModal = false;
        this.setLoading(false);
        this.showMessage('Employee updated successfully');
      });
    }
  }
  onNewEmployeeSave(): void {
    this.newEmployee.store_id = this.seletedStGroupid;
    this.newEmployee.role = this.selectedEmployeeRole;
    this.newEmployee.status = this.isActive;
    if (this.onValidation(this.newEmployee) === true) {
      this.setLoading(true);
      this.service.saveemployee(this.newEmployee).subscribe(res => {
        const emp: Employee = res as Employee;
        emp.role_name = this.getRoleName(emp.role);
        if (emp.status.toString() === '1') {
          emp.status_name = 'Active';
        } else {
          emp.status_name = 'InActive';
        }
        if (emp.store_id !== null) {
          emp.store = this.getStoreName(emp.store_id);
        }
        this.employees.push(emp);
        this.showNewModal = false;
        this.setLoading(false);
        this.showMessage('Employee saved successfully');
      });
    }
  }
  getRoleName(roleid: number): string {
    let returnVal: string = '';
    for (const role of this.roles) {
      if (role.employee_role_id.toString() === roleid.toString()) {
        returnVal = role.name;
        break;
      }
    }
    return returnVal;
  }
  onNewEmployeeClick(): void {
    this.showNewModal = true;
  }
  onDeleteClick(): void {
    this.setLoading(true);
    this.service.deleteEmployee(this.selectedEmployee).subscribe(res => {
      let index: number = 0;
      for (const emp of this.employees) {
        if (emp.id.toString() === res.id.toString()) {
          index = this.employees.indexOf(emp);
          break;
        }
      }
      if (index !== 0) {
        this.employees.splice(index, 1);
      }
      this.setLoading(false);
      this.showMessage('Employee deleted successfully');
    });
  }
}
