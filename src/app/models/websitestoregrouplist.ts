import { StoreGroup } from './storegroup';
export class WebsiteStoreGroupList {
   id: number;
  code: string;
  name: string;
  default_group_id: number;
  childrens: StoreGroup[];
}
