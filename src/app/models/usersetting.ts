import { UserPermission } from './userpermission';
export interface UserSetting {
  user_id: string;
  data: UserPermission[];
}
