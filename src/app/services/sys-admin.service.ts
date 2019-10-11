import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CompanyAddress } from '../models/companyaddress';
import { CompanyBusinessDetails } from '../models/companybusinessdetails';
import { CompanyContact } from '../models/companycontact';
import { CompanyProfile } from '../models/companyprofile';
import { CompanyRegistration } from '../models/companyregistration';
import { SavePermissionBody } from '../models/savepermissionbody';
import { User } from '../models/user';
import { UserPermission } from '../models/userpermission';
import { UserSetting } from '../models/usersetting';
import { ConfigService } from './config.service';

@Injectable()
export class SysAdminService {
  private usersSettings: UserSetting[] = [];
  private users: User[] = [];
  private companyProfile: CompanyProfile;
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  constructor(private http: HttpClient) {
    this.fetchUsers();
    this.companyProfile = {
      business: null,
      address: null,
      contact: null,
      registration: null
    };
  }

  getUsers(): Observable<User[]> {
    this.fetchUsers();
    return this.users$;
  }

  private fetchUsers(): void {
    const sub = this.http.get(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/getUsers`)
      .map(res => res)
      .subscribe(res => {
        this.users = res as User[];
        this.users$.next(this.users);
        if (sub) { sub.unsubscribe(); }
      });
  }

  createUser(body: User): Observable<any> {
    // console.log(`${ConfigService.BASE_URL_M2_CUSTOM}/insertuser`);
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/insertuser`, body)
      .map(res => res)
  }

  statusChange(body: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/changestatus`, body)
      .map(res => res)
  }

  removeUser(body: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/deleteuser`, body)
      .map(res => res)
  }

  updateUser(body: User): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/insertuser`, body)
      .map(res => res)
  }

  getUserPermissions(user_id: string, refresh?: boolean): Observable<UserPermission[]> {
    let found: UserSetting;
    this.usersSettings.forEach(setting => {
      if (setting.user_id === user_id) {
        found = setting;
      }
    });
    if (found && !refresh) {
      return Observable.create((o: Observer<UserPermission[]>) => {
        o.next(found.data);
        o.complete();
      });
    }
    return this.http.get(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/getSubmenuPermissions/${user_id}`)
      .map(res => res)
      .map(res => {
        let f: boolean = false;
        this.usersSettings.forEach(setting => {
          if (setting.user_id === user_id) {
            f = true;
          }
        });
        const permissions = (res as Array<any>).length > 0 ? this.changePermissionsToBoolean(res[0]) : [];
        if (!f) {
          this.usersSettings.push({
            user_id: user_id,
            data: permissions
          });
        }
        return permissions;
      });
  }

  clearData(): void {
    this.usersSettings = [];
    this.users = [];
    this.users$.next([]);
  }

  updateUserPermissions(user_id: string, body: SavePermissionBody, data: UserPermission[]): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL_M2_CUSTOM}/menu.php/setSubmenuPermissions`, body)
      .map(res => res)
      .map(res => {
        this.usersSettings.forEach((s, i) => {
          if (s.user_id === user_id) {
            this.usersSettings[i].data = data;
          }
        });
      });
  }

  private changePermissionsToBoolean(permissions: UserPermission[]): UserPermission[] {
    (permissions || []).forEach(m => {
      m.permissions.Create = !!m.permissions.Create;
      m.permissions.Read = !!m.permissions.Read;
      m.permissions.Update = !!m.permissions.Update;
      m.permissions.Delete = !!m.permissions.Delete;
      if ((m.submenu || []).length > 0) {
        this.changePermissionsToBoolean(m.submenu);
      }
    });
    return permissions;
  }

  getBusinessDetails(): Observable<CompanyBusinessDetails> {
    if (this.companyProfile.business) {
      return Observable.of(this.companyProfile.business);
    } else {
      return this.http.get(`${ConfigService.BASE_URL}/admin/profile/business`)
        .map(res => res)
        .map(res => {
          const r = (res as Array<any>).length > 0 ? res[0] : null;
          this.companyProfile.business = r;
          return r;
        });
    }
  }

  getContactDetails(): Observable<CompanyContact> {
    if (this.companyProfile.contact) {
      return Observable.of(this.companyProfile.contact);
    } else {
      return this.http.get(`${ConfigService.BASE_URL}/admin/profile/contact`)
        .map(res => res)
        .map(res => {
          const r = (res as Array<any>).length > 0 ? res[0] : null;
          this.companyProfile.contact = r;
          return r;
        });
    }
  }

  getRegistrationDetails(): Observable<CompanyRegistration> {
    if (this.companyProfile.registration) {
      return Observable.of(this.companyProfile.registration);
    } else {
      return this.http.get(`${ConfigService.BASE_URL}/admin/profile/registration`)
        .map(res => res)
        .map(res => {
          const r = (res as Array<any>).length > 0 ? res[0] : null;
          this.companyProfile.registration = r;
          return r;
        });
    }
  }

  getAddressDetails(): Observable<CompanyAddress> {
    if (this.companyProfile.address) {
      return Observable.of(this.companyProfile.address);
    } else {
      return this.http.get(`${ConfigService.BASE_URL}/admin/profile/address`)
        .map(res => res)
        .map(res => {
          const r = (res as Array<any>).length > 0 ? res[0] : null;
          this.companyProfile.address = r;
          return r;
        });
    }
  }

  saveProfile(type: string, body: any): Observable<any> {
    return this.http.post(`${ConfigService.BASE_URL}/admin/profile/${type}`, body)
      .map(res => res)
      .map(res => {
        switch (type) {
          case 'business':
            this.companyProfile.business = body;
            break;

          case 'address':
            this.companyProfile.address = body;
            break;

          case 'registration':
            this.companyProfile.registration = body;
            break;

          case 'contact':
            this.companyProfile.contact = body;
            break;
        }
        return body;
      });
  }
}
