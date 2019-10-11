export interface RMUITreeNode {
  title: string;
  id: string;
  route: string;
  is_active: string;
  icon_path?: File;
  collapse?: boolean;
  position?: any;
  store_id?: any;
  menu_id?: number;
  nodes?: RMUITreeNode[];
}
