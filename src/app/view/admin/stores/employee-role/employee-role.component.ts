import {EmployeeRole} from '../../../../models/employeerole';
import {Status} from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.html'
})
export class EmployeeRoleComponent implements OnInit {
  employeeRoleList: EmployeeRole[];
  selectedEmployeeRole: EmployeeRole;
  newEmployeeRole: EmployeeRole;
  selectedEmployeeRoleList: EmployeeRole[];
  statusArrList: Status[];
  message: string;
  selectedSt: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {}

  ngOnInit() {
    this.message = '';
    this.selectedSt = '';
    this.statusArrList = Utils.getStatusArr();
    this.setLoading(true);
    this.newEmployeeRole = new EmployeeRole();
    this.getEmployeeRoleList();
  }
  getEmployeeRoleList(): void {
    this.storeService.getEmployeeRoleList().subscribe(list => {
      this.employeeRoleList = list
      this.selectedEmployeeRoleList = new Array();
      this.setLoading(false);
    });
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  //  onCheckBoxChange(er: EmployeeRole, isChecked: boolean): void {
  //    if (isChecked) {
  //      this.employeeRoleList.find(item => item.employee_role_id === er.employee_role_id).is_active = '1';
  //      this.selectedEmployeeRoleList.push(er);
  //    } else {
  //      this.employeeRoleList.find(item => item.employee_role_id === er.employee_role_id).is_active = '0';
  //      const index = this.selectedEmployeeRoleList.findIndex(item => item.employee_role_id === er.employee_role_id);
  //      this.selectedEmployeeRoleList.splice(index, 1);
  //    }
  //    // console.log(this.selectedEmployeeRoleList);
  //    // console.log(this.employeeRoleList);
  //  }
  onEmployeeRoleSelected(er: EmployeeRole): void {
    this.selectedEmployeeRole = er;
    this.selectedSt = er.is_active;
  }
  onUpdateEmployeeRole(): void {
    // console.log(this.selectedEmployeeRole);
    this.setLoading(true);
    this.selectedEmployeeRole.is_active = this.selectedSt;
    this.storeService.updateEmployeeRole(this.selectedEmployeeRole).subscribe(employeeRole => {
      // console.log(employeeRole);
      this.getEmployeeRoleList();
      this.selectedSt = '';
      this.showMessage('Employee Role updated successfully');
    });
  }
  OnSaveEmployeeRole(): void {
    this.setLoading(true);
    this.newEmployeeRole.is_active = this.selectedSt;
    this.storeService.saveEmployeeRole(this.newEmployeeRole).subscribe(employeeRole => {
      // console.log(employeeRole);
      this.newEmployeeRole = new EmployeeRole();
      this.getEmployeeRoleList();
      this.selectedSt = '';
      this.showMessage('Employee Role saved successfully');
    });
  }
  //  onEmployeeRoleActivate(): void {
  //    this.spinnerService.show();
  //    if (this.selectedEmployeeRoleList !== undefined) {
  //      for (const cur of this.selectedEmployeeRoleList) {
  //        cur.is_active = '1';
  //      }
  //      this.storeService.setEmployeeRoleSelected(this.selectedEmployeeRoleList).subscribe(list => {
  //        this.employeeRoleList = list
  //        this.selectedEmployeeRoleList = new Array()
  //        this.spinnerService.hide();
  //      });
  //    }
  //  }
  //  onEmployeeRoleDeactivate(): void {
  //    this.spinnerService.show();
  //    for (const cur of this.selectedEmployeeRoleList) {
  //      cur.is_active = '0';
  //    }
  //    this.storeService.setEmployeeRoleSelected(this.selectedEmployeeRoleList).subscribe(list => {
  //      this.employeeRoleList = list
  //      this.selectedEmployeeRoleList = new Array()
  //      this.spinnerService.hide();
  //    });
  //  }
  onEmployeeRoleDelete(): void {
    this.setLoading(true);
    this.selectedEmployeeRoleList.push(this.selectedEmployeeRole);
    this.storeService.deleteSelectedEmployeeRole(this.selectedEmployeeRoleList).subscribe(list => {
      this.employeeRoleList = list
      this.selectedEmployeeRoleList = new Array()
      this.setLoading(false);
      this.selectedSt = '';
      this.showMessage('Employee Role deleted successfully');
    });
  }

}
