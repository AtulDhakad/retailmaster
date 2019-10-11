import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

import { FinanceService } from 'src/app/services/finance.service';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-download-bank-deposits-from-qbo',
  templateUrl: './download-bank-deposits-from-qbo.component.html',
  styleUrls: ['./download-bank-deposits-from-qbo.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DownloadBankDepositsFromQboComponent implements OnInit {

  dateRange:FormGroup;
  tableData:any;
  toBeDelete:any=[];
  loading:boolean=false;
  constructor(private fb:FormBuilder, private financeService: FinanceService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.dateRange= this.fb.group({
      fromDate:['',[Validators.required]],
      toDate:['',[Validators.required]]
    })
  }

  get dr(){return this.dateRange.controls;}

  onSubmit(){
    if(this.dateRange.invalid){
      return;
    }
    console.log(this.dateRange.value);
    
    const dates = {
      fromdate: this.dateRange.value.fromDate.format('YYYY-MM-DD'),
      todate: this.dateRange.value.toDate.format('YYYY-MM-DD')
    }
    console.log('dates',dates);
    this.loading=true;
    this.financeService.downloadQBOToM2(dates)
    .subscribe( (res:any)=>{
      console.log('download res',res);
      
      if(res.status==="0"){       
        this.toastr.info("No recorde found");
      } else {
        this.toastr.success('Downloaded records have been saved');
        this.tableData= res;
      }
      this.loading=false;
    },err=>{
      this.loading=false;
      console.log('Download err',err)
      this.toastr.error("Something went wrong");
    })
  }

  onDelete(row){
    if(this.toBeDelete.some( (r:any)=> r === row.qbdpid )){
      this.toBeDelete = this.toBeDelete.filter( (r:any) => r!==row.qbdpid )
    }else{
      this.toBeDelete.push(row.qbdpid);
    }
    console.log(this.toBeDelete);       
  }
  
  onUpdate(){
    this.loading=true;
    this.financeService.makeAsDeleted(this.toBeDelete)
    .subscribe( (res:any)=>{  
      
        if(res.status === 1){
          this.tableData = this.tableData.filter((t:any)=> !this.toBeDelete.some((d:any)=> d === t.qbdpid ) )
          this.toBeDelete=[];
          this.toastr.success('Records updated successfully');
        }else if(res.status === 0){
          this.toastr.info('Record not updated');
        }
        this.loading=false;
    },err=>{
      this.toastr.error("Something went wrong");
      console.log(err);
      this.loading=false;
    })
  }
}
