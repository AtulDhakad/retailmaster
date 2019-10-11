import { Component, ElementRef, OnDestroy, Renderer, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../../models/user';
import { UserPermission } from '../../../../models/userpermission';
import { UserSetting } from '../../../../models/usersetting';
import { SettingsService } from '../../../../services/settings.service';
import { SysAdminService } from '../../../../services/sys-admin.service';

@Component({
  selector: 'app-sys-admin-users-permissions',
  templateUrl: './users-permissions.html'
})

export class SysAdminUsersPermissionsComponent implements OnDestroy {
  // @ViewChildren('closeDialog') closeDialog: ElementRef;
  isUserSetting: User;
  users: User[] = [];
  usersSettings: UserSetting[] = [];
  isEdit: boolean = false;
  hasFullAccess: boolean = false;
  newUser: FormGroup;
  selectedUser: User;
  usersSubscription: Subscription;
  permissions: UserPermission[] = [];
  isExpandAll: boolean = false;
  isPermissionSaving: boolean = false;
  expandedMenus: any = [];
  visibleMenuItems: any = [];
  isDisplayPopup: boolean;
  dialogMsg: string;
  constructor(
    private service: SysAdminService,
    private settingsService: SettingsService,
    private renderer: Renderer) {
    this.init();
  }

  private init(): void {
    this.users.length = 0;
    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
    this.initForm();
  }

  initForm(): void {
    this.newUser = new FormGroup({
      user_id: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      username: new FormControl(''),
      confirm_password: new FormControl(''),
      status: new FormControl(1),
      password: new FormControl('')
    });
  }

  onUserSettingsClick(user: User): void {
    this.isUserSetting = user;
    this.service.getUserPermissions(user.user_id, true).subscribe(res => {
      this.permissions = res;
      this.hasFullAccess = this.isAllMenuPermissionsGrandted();
    });
  }

  onUserPermissionsUpdate(): void {
    this.isPermissionSaving = true;
    this.service.updateUserPermissions(this.isUserSetting.user_id, {
      username: this.isUserSetting.username,
      menupermissions: this.getAllMenuPermissions()
    }, this.permissions).subscribe(res => {
      this.clear();
    });
  }

  onStatusChange(user): void {
    // let data = new FormData();
    // data.append('user_id', user.user_id);
    // data.append('status', user.status);
    this.service.statusChange(user).subscribe(res => {
      // console.log('delete user', res);
      this.init();
    });
  }

  fullAccessClicked(): void {
    this.hasFullAccess = !this.hasFullAccess;
  }
  removeUser(): void {
    let data = new FormData();
    data.append('user_id', this.newUser.controls['user_id'].value);
    this.service.removeUser(data).subscribe(res => {
      // console.log('delete user', res);
      this.closePopup();
      this.init();
    });
  }

  clear(): void {
    this.isEdit = false;
    this.isUserSetting = null;
    this.permissions = [];
    this.expandedMenus = [];
    this.visibleMenuItems = [];
    this.hasFullAccess = false;
    this.isPermissionSaving = false;
    this.isDisplayPopup = false;
  }

  save(): void {
    const body = {
      user_id: this.newUser.controls['user_id'].value,
      firstname: this.newUser.controls['firstname'].value,
      lastname: this.newUser.controls['lastname'].value,
      username: this.newUser.controls['username'].value,
      password: this.newUser.controls['password'].value,
      status: this.newUser.controls['status'].value
    };
    // console.log('send user data', body);
    let data = new FormData();
    data.append('user_id', this.newUser.controls['user_id'].value);
    data.append('firstname', this.newUser.controls['firstname'].value);
    data.append('lastname', this.newUser.controls['lastname'].value);
    data.append('username', this.newUser.controls['username'].value);
    data.append('password', this.newUser.controls['password'].value);
    data.append('status', this.newUser.controls['status'].value);
    if (this.isEdit) {
      this.editUser(data);
    } else {
      this.createUser(data);
    }
  }

  createUser(body: any): void {
    this.dialogMsg = null;
    if (this.newUser.valid && (this.newUser.controls['password'].value === this.newUser.controls['confirm_password'].value)) {
      this.service.createUser(body).subscribe(res => {
        // console.log('res user', res);
        if (res.status == "success") {
          this.closePopup();
          this.init();
        } else {
          this.dialogMsg = res.msg;
        }
      });
    } else {
      this.dialogMsg = "Password not match";
    }
  }

  editUser(body: any): void {
    this.dialogMsg = null;
    this.service.updateUser(body).subscribe(res => {
      // console.log('res user', res);
      if (res.status == "success") {
        this.closePopup();
        this.init();
      } else {
        this.dialogMsg = res.msg;
      }
    });
  }

  private closePopup(): void {
    this.initForm();
    this.isDisplayPopup = false;
    // this.renderer.invokeElementMethod(this.closeDialog.nativeElement, 'click');
  }

  create(): void {
    this.isEdit = false;
    this.isDisplayPopup = true;
    this.initForm();
  }

  expandMe(id, skip): void {
    const index = this.expandedMenus.findIndex(value => value === id);

    if (index !== -1) {
      this.expandedMenus.splice(index, 1);
    } else {
      this.expandedMenus.push(id);
    }
    // console.log(this.expandedMenus);
  }

  collapseAll(): void {
    this.expandedMenus = [];
  }

  expandAllNodes(): void {
    this.expandedMenus = [];
    this.expandedMenus = this.permissions.map(function (menu) { return menu.menu_id; });
  }

  isAddedToExpanded(id): boolean {
    return this.expandedMenus.findIndex(value => value === id) !== -1;
  }

  isPermissionHidden(id, permissions): boolean {
    if (permissions.Create || permissions.Update || permissions.Read || permissions.Delete) {
      this.setVisibility(id, true);
      return false;
    } else if (this.visibleMenuItems.findIndex(value => value === id) !== -1) {
      return false;
    } else if (this.visibleMenuItems.findIndex(value => value === id) === -1) {
      return true;
    }
  }

  takeRights(menu): void {
    const index = this.visibleMenuItems.findIndex(value => value === menu.menu_id);
    if (index !== -1) {
      this.visibleMenuItems.splice(index, 1);
    }
    menu.permissions.Create = false;
    menu.permissions.Read = false;
    menu.permissions.Update = false;
    menu.permissions.Delete = false;
    this.hasFullAccess = false;
  }

  setVisibility(id, skip): void {
    const index = this.visibleMenuItems.findIndex(value => value === id);

    if (index !== -1 && skip) {
      return;
    } else if (index !== -1) {
      this.visibleMenuItems.splice(index, 1);
    } else {
      this.visibleMenuItems.push(id);
    }
  }

  edit(user: User): void {
    this.isEdit = true;
    this.isDisplayPopup = true;
    this.newUser.setValue({
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      confirm_password: '',
      username: user.username,
      password: '',
      status: user.status
    });
    this.selectedUser = user;
  }

  validatePassword(pass: string): boolean {
    return !/^[a-z0-9]+$/i.test(pass);
  }

  validateForm(): void {

  }

  grantPermission(menu, type): void {
    switch (type) {
      case 'create':
        menu.permissions.Create = !menu.permissions.Create;
        break;
      case 'read':
        menu.permissions.Read = !menu.permissions.Read;
        break;
      case 'delete':
        menu.permissions.Delete = !menu.permissions.Delete;
        break;
      case 'update':
        menu.permissions.Update = !menu.permissions.Update;
        break;

    }
    this.hasFullAccess = this.isAllMenuPermissionsGrandted();
  }
  private getAllMenuPermissions(): any[] {
    const permissions: any[] = [];
    (this.permissions || []).forEach(menu => {
      (menu.submenu || []).forEach(submenu => {
        (submenu.submenu || []).forEach(submenu2 => {
          permissions.push({
            menu_id: submenu2.menu_id,
            permissions: {
              Create: submenu2.permissions.Create || this.hasFullAccess ? '1' : '0',
              Delete: submenu2.permissions.Delete || this.hasFullAccess ? '1' : '0',
              Read: submenu2.permissions.Read || this.hasFullAccess ? '1' : '0',
              Update: submenu2.permissions.Update || this.hasFullAccess ? '1' : '0'
            }
          });
        });
      });
    });
    return permissions;
  }

  private isAllMenuPermissionsGrandted(): boolean {
    let hasAllPermissions: boolean = true;
    (this.permissions || []).forEach(menu => {
      (menu.submenu || []).forEach(submenu => {
        (submenu.submenu || []).forEach(submenu2 => {
          if (!(submenu2.permissions.Create && submenu2.permissions.Delete && submenu2.permissions.Read && submenu2.permissions.Update)) {
            hasAllPermissions = false;
          }
        });
      });
    });
    return hasAllPermissions;
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
