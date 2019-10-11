import { PermissionType } from './permissiontype';
export interface UserPermission {
  menu_id: string;
  menu_title: string;
  is_active?:boolean,
  permissions?: PermissionType;
  submenu?: UserPermission[];
}
