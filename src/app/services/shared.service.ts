import { Employee } from '../models/employee';
import {PerformanceTargetStore} from '../models/performancetargetstore';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SharedService {
  stores: PerformanceTargetStore[];
  employees: Employee[];
  private fullScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  emit(data: boolean): void {
    this.fullScreen$.next(data);
  }

  getFullScreenNotifier(): Observable<any> {
    return this.fullScreen$.asObservable();
  }
}
