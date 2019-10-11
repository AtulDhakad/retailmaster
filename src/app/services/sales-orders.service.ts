import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import 'rxjs/add/operator/map';
import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SalesOrdersService {

  constructor(private _http: HttpClient) {

  }

  getStuff(url: string): Observable<any> {
    const urlWithId = url;

    const headers = new HttpHeaders({'Accept': 'application/json'});
    headers.append('Authorization', 'Bearer lh5o41whxfb7xdy8nfwyx1p4dfi3cbht');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    // const options = new HttpHeaders( headers);

    return this._http
      .get(urlWithId, {headers: headers})
      .map(res => res);
  }

}
