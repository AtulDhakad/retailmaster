export class RMTreeModel {
  title: string;
  type: string;
  state?: boolean = false;
  checked?: boolean = false;
  iconClass?: string;
  items?: RMTreeModel[];
}
