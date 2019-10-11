import { Status } from './../../../../models/status';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { intersectionWith, isEqual } from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FinanceService } from 'src/app/services/finance.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LLL',
  },
  display: {
    dateInput: 'MMM D, YY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reconcile-bank-deposit',
  templateUrl: './reconcile-bank-deposit.component.html',
  styleUrls: ['./reconcile-bank-deposit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ReconcileBankDepositComponent implements OnInit, OnChanges, OnDestroy {
  private unsub: Subject<any> = new Subject();
  private modalRef: BsModalRef;
  private qboElement: any;

  dropBtn: any;

  loading: boolean = false;
  magento: any = [];
  magentoFiltered: any = [];
  qboData: any;
  qboFiltered: any;
  selectedQbo: any = [];
  selectedM2: any = [];
  matchedQbo: any = [];
  matchedData: any = [];

  //variable m2 and qbo
  amtm2:any =[];
  amtqbo:any =[];


  /** filters */
  orderDateFilter: string;
  paymentDateFilter: string;

  m2orderId: any;
  m2customerNameFilter: any;
  m2OrderAmountFilter: any;
  m2paymentMethodFilter: any;
  m2PaymentTimeFilter: any;
  m2AmountPaidFilter: any;

  depositDate: string;
  depositeAmount: any;
  depositeTime: any;
  depositDescription: any;

  //my match desable
  dontmatch : boolean = false;

  //amount is null
  qbonullamt:any =1;
  m2nullamt:any =1;

  //match button
  allmatchButton: boolean =true;
  //remove checkbox
  removecheckbox:boolean = false;
 //get all data
  allDatas: any =[];

  constructor(
    private financeService: FinanceService,
    private toastr: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getMagentoData();
    this.getQBOData();
  }

  ngOnChanges(changes: SimpleChanges): void {
   // console.log("changes", changes);
  }


  toggleBtn(i, data?, template?: TemplateRef<any>) {
    if (data) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
      this.qboElement = data;
    }

    if (i === this.dropBtn){
      this.dropBtn = -1;
    } else {
      this.dropBtn = i;
    }
  }

  confirmDelete() {
    this.modalRef.hide();
    this.financeService.makeAsDeleted(this.qboElement.id)
      .pipe(takeUntil(this.unsub))
      .subscribe(res => {
        this.getQBOData();
        this.toastr.info(res.message);
      }, err => {
        this.toastr.error(err.message);
      })
  }


  getMagentoData() {
    this.loading = true;
    this.financeService.getOrders()
      .pipe(takeUntil(this.unsub))
      .subscribe((res: any) => {
        if (res.status === 1) {
          let items = res.data;
           //console.log('my payment data m2 atul',items);
          items = items.map((items: any, i) => {
            
            return {
              order_date: moment(items.created_at).format('D-MMM-YY'),
              order_id: items.increment_id,
              id: items.entity_id,
              order_amount: items.base_grand_total,
              firstname: items.customer_firstname,
              lastname: items.customer_lastname,
              payment_method: items.payment.length > 0 ? items.payment[0].method : '',
              matching_id: items.payment && items.payment[0].matching_id ? items.payment[0].matching_id : '0',
              amount_paid: items.payment && items.payment[0].amount_paid ? items.payment[0].amount_paid : '0.00'
            }
          });

          this.magento = items;
          this.magentoFiltered = items;
          //console.log('my payment atul data',items);      
          this.loading = false;
        } else {
          this.loading = false;
          this.toastr.error(res.data);
        }
      })
  }

  //payment method filter M2 data
  filterM2Data() {
    this.loading = true;
    this.financeService.getOrders()
      .pipe(takeUntil(this.unsub))
      .subscribe((res: any) => {
        if (res.status === 1) {
          let items = res.data;
          
          items = items.map((items: any, i) => {
            
            return {
              order_date: moment(items.created_at).format('D-MMM-YY'),
              order_id: items.increment_id,
              id: items.entity_id,
              order_amount: items.base_grand_total,
              firstname: items.customer_firstname,
              lastname: items.customer_lastname,
              payment_method: items.payment.length > 0 ? items.payment[0].method : '',
              matching_id: items.payment && items.payment[0].matching_id ? items.payment[0].matching_id : '0',
              amount_paid: items.payment && items.payment[0].amount_paid ? items.payment[0].amount_paid : '0.00'
            }
          });

          //filter data
          items =   items.filter(d=> {  
                if(d.payment_method === 'fpx' || d.payment_method ==='checkmo' || d.payment_method ==='banktransfer' ){
                return true;
                }else{
                return false;
                }    
          });

          this.magento = items;
          this.magentoFiltered = items;
          //console.log('my payment data',items);
           
          this.loading = false;
        } else {
          this.loading = false;
          this.toastr.error(res.data);
        }
      })
  }





  getQBOData() {
    this.loading = true;
    this.financeService.getQBO()
      .pipe(takeUntil(this.unsub))
      .subscribe(res => {
       // console.log('QBO data', res);
        this.qboData = res;
        this.qboFiltered = res;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.toastr.error('QBO data fetch error');
        console.log('QBO data fetch error', err)
      })
  }
  
//my create function refresh
  RefreshOBO(){

     this.loading = true;
     this.financeService.RefgetQBO()
       .pipe(takeUntil(this.unsub))
       .subscribe(res => {   
              this.qboData = res;
              this.qboFiltered = res
              this.loading = false;
       }, err => {
              this.loading = false;
              this.toastr.error('QBO data fetch error');
              console.log('QBO data fetch error', err)
       })


  }



  onSelectQbo(qbo) {
    if (this.selectedQbo.some(q => q.id === qbo.id)) {
      this.selectedQbo = this.selectedQbo.filter(q => q.id !== qbo.id); 
      
    } else {
    
        // if(qbo.amount_received!=0){
        //  this.selectedQbo.push(qbo);

        // }
          this.selectedQbo.push(qbo); 

    }

    this.matchRecord();
    //console.log('Selected QBOs',this.selectedQbo);
   }


  onSelectM2(mag) {

    if (this.selectedM2.some(q => q.order_id === mag.order_id)) {
      this.selectedM2 = this.selectedM2.filter(q => q.order_id !== mag.order_id);
    } else {

      // if(mag.amount_paid!=0){
      //   this.selectedM2.push(mag);
      // }
      this.selectedM2.push(mag);
      
    }
    this.matchRecord();

    //console.log('atul m2 Selected M2s',this.selectedM2);

  }

  // matchRecord() {
  //   //check length
  //   if (this.selectedM2.length === 0 || this.selectedQbo.length === 0) {
  //     return;
  //   }

  //   if (this.selectedQbo.length === 1) {
  //     //Match one deposit to one or more sales orders 
  //     const qbo = this.selectedQbo[0];
  //     const m2 = this.selectedM2;
  //     const qboAmount = parseFloat(qbo.amount_received);

  //     const m2total = m2.reduce((t, m) => t + parseFloat(m.amount_paid), 0);
  //     if (m2total == qboAmount) {
  //       let m2s = m2.map((m) => m.increment_id);
  //       this.matchedQbo.push({ m2: m2s, qbo: [qbo.id] });
  //       this.toastr.info('matched');
  //       //console.log('m2total', m2s);
  //       console.log('qboAmount', this.matchedQbo);
  //     }
  //   } else if (this.selectedM2.length === 1) {
  //     //Match one or more deposits to a single sales order
  //     const m2 = this.selectedM2[0];
  //     //const m2Amount = m2.amount_paid;
  //     const m2Amount = m2.order_amount;
  //     if (!m2Amount) {
  //       return;
  //       alert("No amount paid")
  //     }
  //     const qbo = this.selectedQbo;
  //     const qboTotal = qbo.reduce((t, q) => t + parseFloat(q.amount_received), 0);
  //    // console.log('m2total', m2Amount);
  //    // console.log('qboAmount', qboTotal);
  //     if (qboTotal == m2Amount) {
  //       this.toastr.info('matched');
  //       let qbos = qbo.map((q) => q.id);
  //       this.matchedQbo = [...this.matchedQbo, { m2: [m2.increment_id], qbo: [...qbos] }];
  //     }

  //   }

  // }

  //old match record 09-10-2019
  // matchRecord() {
  //   //check length
  //   const qbo = this.selectedQbo;
  //   const m2 = this.selectedM2;
  //   //console.log('hello atul amt',m2);
  //   const qboAmount = qbo.reduce((t, m) => t + parseFloat(m.amount_received), 0);
  //   const m2total = m2.reduce((t, m) => t + parseFloat(m.amount_paid), 0);

  //   if (this.selectedQbo.length >= 1 && this.selectedM2.length===1) {
  //     //Match one deposit to one or more sales orders 
      
      
  //     this.matchedQbo.length =0;
  //     this.allmatchButton =true;
  //     if (m2total == qboAmount) {

  //       let qbos = qbo.map((q) => q.id);
  //       let m2s = m2.map((q) => q.order_id);

  //       this.matchedQbo.push({ qbo: qbos,m2:m2s });
  //       this.allmatchButton =false;
  //       this.toastr.info('matched');
  //     //console.log('qboAmount atul3',this.matchedQbo);
        
  //     }
  //    }else if (this.selectedM2.length >= 1 && this.selectedQbo.length===1) {
  //     //Match one or more deposits to a single sales order
    
  //     this.matchedQbo.length =0;
  //     this.allmatchButton =true;
  //     if (m2total == qboAmount) {

  //        let qbos = qbo.map((q) => q.id);
  //        let m2s = m2.map((q) => q.order_id);
  //       this.matchedQbo.push({ qbo: qbos,m2:m2s });
  //       this.toastr.info('matched');
  //       this.allmatchButton =false;
  //     //console.log('M2Amount atul2', this.m2nullamt);
        
  //     }

  //   }else{
  //     this.matchedQbo.length =0;
  //     this.allmatchButton =true;
  //     //console.log('not match');
  //   }


  // }


  matchRecord() {
    //check length

    if (this.selectedQbo.length >= 1 && this.selectedM2.length>=1) {
      //Match one deposit to one or more sales orders 
    
        this.allmatchButton =false;
        this.toastr.info('matched');
      //console.log('qboAmount atul3',this.matchedQbo);
      //console.log('M2Amount atul4441', this.selectedQbo);
     // }
     }else if (this.selectedM2.length >= 1 || this.selectedQbo.length>=1) {
      //Match one or more deposits to a single sales order
     

       // this.toastr.info('matched');
        this.allmatchButton =true;
    //  console.log('M2Amount atul4441', this.selectedQbo);
        
      }else{
     // this.matchedQbo.length =0;
      this.allmatchButton =true;
      //console.log('not match');
    }


  }

  isThisMatched(qbo) {
  
    return this.selectedQbo.some((bmq) => {
      if (bmq.id === qbo.id) {
        return true;
      }
      return false;
    })
    
  }


  isThisMatchedMg2(mg2){

    return this.selectedM2.some((mq) => {

      if (mq.order_id===mg2.order_id) {
        return true;
      }
      return false;
    })


  }

  matchNow() {
    this.allmatchButton =true;
    this.loading = true;
    //this.removecheckbox = false;
    const qbob = this.selectedQbo;
    const m2m = this.selectedM2;
   
     this.allDatas.push({qbob:qbob,m2m:m2m});
    //this.selectedM2.push(mag);
    //this.matchedQbo.length =0;

     this.financeService.updateOrderStatus(this.allDatas).pipe().subscribe((res: any) => {
      // console.log('my order response data444 ',res['data']);
       this.toastr.info(res['message']);
       this.getMagentoData();
       this.getQBOData();
       this.selectedQbo =[];
       this.selectedM2 = [];
       this.allDatas =[];
    
     }, err => {
       this.loading = false;
       console.log('QBO data fetch error', err)
     })

    
  }


  //unmatch record function
  unmatchfn(qboids){
    this.loading = true;
    this.financeService.updateUnmatchrecorde(qboids).pipe().subscribe((res: any) => {
     // console.log('my order response data444 ',res['data']);
      this.toastr.info(res['message']);
      this.getMagentoData();
      this.getQBOData();
      this.selectedQbo =[];
      this.selectedM2 = [];
      this.allDatas =[];
   
    }, err => {
      this.loading = false;
      console.log('QBO data fetch error', err)
    })
    

  }



  /** on filters change */

  dateChange(type: string, event: MatDatepickerInputEvent<Moment>) {
    let d = event.target.value
    if (!moment.isMoment(d)) {
      if (type === 'order_date') {
        this.orderDateFilter = undefined;
      } else if (type === 'payment_date') {
        this.paymentDateFilter = undefined;
      } else if (type === 'deposit_date') {
        this.depositDate = undefined;
      }
      this.filterDataM2Data();
      return;
    }
    let date = d.format('D-MMM-YY');

    if (type === 'order_date') {
      this.orderDateFilter = date;
    } else if (type === 'payment_date') {
      this.paymentDateFilter = date;
    } else if (type === 'deposit_date') {
      this.depositDate = date;
    }

    this.filterDataM2Data();
  }



  filterDataM2Data() {
    let f1: any, f2: any, f3: any;
    //console.log('this.orderDateFilter', this.orderDateFilter);
    if (this.orderDateFilter) {
      if (this.orderDateFilter.trim() !== '') {
        f1 = this.magento.filter(m2 => {
          if (moment(m2.order_date).isSame(moment(this.orderDateFilter), 'day')) {
            return true;
          }
        })
      } else {
        f1 = [];
      }

    } else {
      f1 = this.magento;
    }

    if (this.paymentDateFilter && this.paymentDateFilter.trim() !== '') {
      f2 = this.magento.filter(m2 => {
        if (moment(m2.order_date).isSame(moment(this.paymentDateFilter), 'day')) {
          return true;
        }
      })
    } else {
      f2 = this.magento;
    }


    if (this.depositDate && this.depositDate.trim() !== '') {
      this.qboFiltered = this.qboData.filter(qbo => {
        if (moment(qbo.date).isSame(moment(this.depositDate), 'day')) {
          return true;
        }
      })
    } else {
      this.qboFiltered = this.qboData;
    }

    this.magentoFiltered = intersectionWith(f1, f2, isEqual);

   // console.log('this.magentoFiltered', this.magentoFiltered);
    if (this.magentoFiltered.length === 0) {
      this.magentoFiltered = this.magento;
    }
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

}
