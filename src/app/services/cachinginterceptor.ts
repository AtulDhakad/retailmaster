import {HttpResponse} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
export class CachingInterceptor implements HttpInterceptor {
  private cache = {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

   // console.log('Checking cache for ' + req.urlWithParams);

    const cachedResponse = this.cache[req.urlWithParams] || null;
    if (cachedResponse) {
   //  console.log('Returning cached version of ' + req.urlWithParams);
      return Observable.of(cachedResponse);
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        if (req.urlWithParams.indexOf('getOrderDetails') === -1) {
     //  console.log('Setting the cache value for ' + req.urlWithParams);
          this.cache[req.urlWithParams] = event;
        }
      }
    });

  }
}
