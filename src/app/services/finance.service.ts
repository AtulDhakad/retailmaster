import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, concatMap, filter, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
@Injectable()
export class FinanceService {
  constructor(private http: HttpClient) { }

  getOrders(){
    // return this.http.get(`${ConfigService.STORE_URL}/orders?searchCriteria[filter_groups][0][filters][0][field]=status&
    // searchCriteria[filter_groups][0][filters][0][value]=Pending`); 

    return this.http.get( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/getM2SalesOrders` )
    .pipe(
      tap(res=>{
       // console.log("M2 res", res);
      })
    )
    
  }

  getQBO(){
    return this.http.get( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/getQboData` )
    .pipe(map( (res:any)=>{
      res = res.filter(d=> d.type === 'bank');
      return res;
    }))    
  }

// my craete function refresh 
  RefgetQBO(){
    return this.http.get( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/getQboData` )
    .pipe(map( (res:any)=>{
      res = res.filter(d=> { 
      
        if(d.type === 'bank' && d.matched_with_order === 'no'){

          return true;

         }else{
            return false;
       }
      
      });
      return res;
    }))    
  }


  downloadQBOToM2(dates){    
    let params = new HttpParams();
    params = params.append('fromdate',dates.fromdate);
    params = params.append('todate',dates.todate);
    return this.http.get(`https://mybeauty.asia/intuit/qbtomagento.php?${params.toString()}`)
    .pipe(      
      concatMap( (res:any) => {
        if(res.status==="0"){
          return of(res);
        } 
        return this.http.post( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/getQboData`,dates)
        .pipe(filter( (res:any) => res.deleted !== "Y" ))
                     
      })
    );    
    
  }

  makeAsDeleted(id:number):Observable<any>{
   // console.log(`${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/makeAsDeleted`,{id});
    
    return this.http.post( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/makeAsDeleted`,{id})
  }

  
  uploadBankDepositsToM2(data){
    return this.http.post( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/uploadbankDepositsToM2`,data)
  }

  //my edit code update order status

  
  updateOrderStatus(data){
    return this.http.post( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/updateOrderStatusCheck`,data)
  }

  
  
  //updated unmatched record
  updateUnmatchrecorde(qboids){
    return this.http.post( `${ConfigService.BASE_URL_M2_CUSTOM}/deposite.php/updateUnmatchrecordes`,qboids)
  }



  }
