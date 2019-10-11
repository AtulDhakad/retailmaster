import { NavChild } from './navchild';
export interface Nav {
  menu_id?: string;
  icon_path?: string;
  menu_title?: string;
  route?: string;
  submenu?: NavChild[];
}
