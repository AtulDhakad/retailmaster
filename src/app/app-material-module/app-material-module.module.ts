import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule 
} from '@angular/material';

import { MatMomentDateModule } from "@angular/material-moment-adapter";

const materialModules =[
  MatFormFieldModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports:[...materialModules]
})
export class AppMaterialModuleModule { }
