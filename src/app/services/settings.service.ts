import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SettingsService {
  HttpUploadOptions = {
    headers: new HttpHeaders({ "Accept": "application/json" })
  }

  constructor(private http: HttpClient) { }

  getMenus(): Observable<any[]> {
    return this.http.get(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/getMenus`)
      .map(res => res)
      .map(res => (res as Array<any>).length > 0 ? res[0] : []);
  }

  create(body: any): Observable<any> { 
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/addMenuItem`, body)
      .map(res => res)
      .pipe(catchError(error => Observable.throw(error)))
  }

  dragMenu(data: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/updatemanu`, data, this.HttpUploadOptions);
  }

  editUpdate(data: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/editmanu`, data, this.HttpUploadOptions);
  }

  update(body: any, id: any): Observable<any> {
    return this.http.put(`${ConfigService.BASE_URL}/menu.php/settings/menu/${id}`, body)
      .map(res => res);
  }

  changeStatus(body: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/setMenuStatus`, body)
      .map(res => res);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${ConfigService.BASE_URL}/settings/menu/${id}`)
      .map(res => res);
  }
}
