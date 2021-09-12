import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {  filter, map } from 'rxjs/operators'

interface Store {
  action: string;
  state: any;
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // 订阅初始化后的流
  store$ = new Subject<Store>(); 
  behaviorStoreMap$: { [key: string]: BehaviorSubject<any> } = {};

  constructor() {}

  // 同步
  // 发布
  emitStore(source: Store) {
    this.store$.next(source);
  }

  // 订阅，所有流
  onStore() {
    return this.store$.asObservable();
  }

  // 订阅，具体流
  getState(action) {
    return this.onStore().pipe(
      filter((res: any) => res.action === action),
      map(res => res.state)
    );
  }

  private initBehavior(action: string) {
    if (!this.behaviorStoreMap$[action]) {
      this.behaviorStoreMap$[action] = new BehaviorSubject(void 0);
    }
  }

  // 有初始值
  // 发布
  emitBehaviorStore({ action, state }: Store) {
    this.initBehavior(action);
    this.behaviorStoreMap$[action].next(state);
  }

  // 订阅，具体流
  getBehaviorState(action) {
    this.initBehavior(action);
    // 过滤初始化值
    return this.behaviorStoreMap$[action].pipe(filter(x => x !== void 0));
  }
}
