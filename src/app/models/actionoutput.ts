import { RMUITreeNode } from './rmuitreenode';
export class ActionOutput {
    level: number;
  item: RMUITreeNode;
  index: number;
  action: number;
}

export class DragOutput {
  menu_id: number;
  current_position: number;
}
