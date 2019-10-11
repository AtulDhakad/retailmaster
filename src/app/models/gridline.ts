export class Gridline {
  id: string = '1';
  max_value: number;
  gridline_interval: number;
  constructor(max_value: number, gridline_interval: number) {
    this.max_value = max_value;
    this.gridline_interval = gridline_interval;
  }

}
