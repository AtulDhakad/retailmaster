import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Nav } from '../models/nav';
import { ConfigService } from './config.service';

@Injectable()
export class SidenavService {
    private navs: Nav[] = [];

    private itemSource = new BehaviorSubject(false);
    itemMessage = this.itemSource.asObservable();

    private navs$: BehaviorSubject<Nav[]> = new BehaviorSubject<Nav[]>(this.navs);

    constructor(private http: HttpClient) {
        this.fetchMenus();
    }

    refreshItem(message: boolean) {
        this.itemSource.next(message);
        this.fetchMenus();
    }

    getNavItems(): Observable<Nav[]> {
        return this.navs$;
    }

    private fetchMenus(): void {
        const sub = this.http.get(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/getMenus`)
            .map(res => {
                console.log('res', res);
                return res;
            })
            .subscribe(res => {
                this.navs = res[0];
                this.navs$.next(this.navs);
                if (sub) { sub.unsubscribe(); }
            });
    }
}
