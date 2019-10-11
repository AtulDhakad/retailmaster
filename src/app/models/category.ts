export interface Category {
  id: number;
  attribute_set_id?: number;
  parent_id?: number;
  created_at?: string;
  updated_at?: string
  path?: string;
  position?: number;
  level?: number;
  children_count?: number;
  include_in_menu?: number;
  name: string;
  is_active?: number;
  is_anchor?: number;
  custom_use_parent_settings?: number;
  custom_apply_to_products?: number;
  display_mode?: string;
  url_key?: string;
  selected?: boolean;
}
