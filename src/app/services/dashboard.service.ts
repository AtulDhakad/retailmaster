import {Injectable} from '@angular/core';
import {Employee} from '../models/employee';
import {Gridline} from '../models/gridline';
import {PerformanceTargetStore} from '../models/performancetargetstore';
import {Utils} from '../utils/utils';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class DashboardService {
  gridline: Gridline;
  constructor(private http: HttpClient) {}
  getStore(): Observable<PerformanceTargetStore[]> {
    return this.http.get(`${ConfigService.STORE_URL}/store/storeemployees/data/`)
      .map(response => response as PerformanceTargetStore[])
      .catch(this.handleError);
    // return Utils.getStoreArr();

  }
  getEmployee(): Observable<Employee[]> {
    // return Utils.getEmployeeArr();
    //  http://api.retailmaster.xyz/rest/V1/store/target/data/
    return this.http.get(`${ConfigService.STORE_URL}/store/target/data/`)
      .map(response => response as Employee[])
      .catch(this.handleError);
  }
  getGridlineSettings(): Observable<Gridline> {
    return this.http.get(ConfigService.STORE_URL.concat('/store/gridlinesettings/'))
      .map(response => response as Gridline)
      .catch(this.handleError);
    /*return this.http.get(`${ConfigService.BASE_URL2}/index/gridline_settings`)
      .map(res => res.json())
      .map(res => {
        // res = res.data.length > 0 ? res.data[0] : {};
        this.gridline = {
          max_value: res.max_value,
          gridline_interval: res.gridline_interval
        };
        return this.gridline;
      });*/
  }
  private handleError(error: any): Observable<any> {
    // // console.error(error.message); // for demo purposes only
    return error;
  }
  saveGridline(gd: Gridline): Observable<Gridline> {
    return this.http.post(`${ConfigService.STORE_URL}/store/gridlinesettings/update`,
      {id: '1', max_value: gd.max_value, gridline_interval: gd.gridline_interval})
      .map(res => res as Gridline)
      .catch(this.handleError);
  }

  saveEmployee(employee: Employee, targetVal: number): Observable<Employee> {
    let params = new HttpParams();
    params = params.append('id', employee.id.toString());
    //    params = params.append('year', employee.year.toString());
    //    params = params.append('month', employee.month.toString());
    //    params = params.append('store', employee.store.toString());
    params = params.append('target', targetVal.toString());
    // http://api.retailmaster.xyz/rest/V1/store/storeemployees/update?id=6&year=1991&month=11&store=ger&target=3
    return this.http.post(ConfigService.STORE_URL.concat('/store/target/update'), {params})
      .map(res => res as Employee)
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveStore(store: PerformanceTargetStore, targetVal: number) {
    let params = new HttpParams();
    params = params.append('id', store.id.toString());
    params = params.append('year', store.year.toString());
    params = params.append('month', store.month.toString());
    params = params.append('store', store.store.toString());
    params = params.append('employee', '');
    params = params.append('target', targetVal.toString());
    // http://api.retailmaster.xyz/rest/V1/store/target/update?id=2&year=1994&month=11&store=eng&employee=test1&target=3
    return this.http.post(ConfigService.STORE_URL.concat('/store/storeemployees/update'), {params})
      .map(res => res
      //  // console.log(res)
      )
      .catch(error =>
        Observable.throw(error)
      );
  }
  saveAllData(stores: PerformanceTargetStore[]) {
    //    for (const st of stores) {
    //      // console.log(st)
    //      for (const emp of st.employee) {
    //        // console.log(emp);
    //      }
    //    }
  }
}
