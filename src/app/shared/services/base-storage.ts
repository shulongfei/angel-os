import { Injectable } from '@angular/core';
import { isString as _isString, forEach as _forEach} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BaseStorage {

  _storage;

  constructor() {}

  get(key: string): any {
    const data = this._get(key);
    return this.deserialize(data);
  }

  set(key: string, value: any) {
    if (value === undefined) {
      return this.remove(key);
    }
    this._set(key, this.serialize(value));
    return value;
  }

  remove(key: string) {
    if (!key || !this._has('removeItem')) {
      return;
    }
    this._storage.removeItem(key);
  }

  clear(excludesKey: string[] = []) {
    const localStorageKeys = Object.keys(this._storage);
    _forEach(localStorageKeys, (key: string) => {
      if (excludesKey.includes(key)) {
        return;
      }
      this.remove(key);
    });
  }

  serialize(obj: any): string {
    if (_isString(obj)) {
      return obj;
    }
    return JSON.stringify(obj);
  }


  deserialize(val: string, defaultVal: any = ''): any {
    if (!val) {
      return defaultVal;
    }
    let parseVal = '';
    try {
      parseVal = JSON.parse(val);
    } catch (e) {
      parseVal = val;
    }
    return parseVal !== undefined ? parseVal : defaultVal;
  }

  /*************************  私有方法  *************************/
  private _has(key: string): boolean {
    return this._storage && this._storage[key];
  }

  private _get(key: string): any {
    if (!key || !this._has('getItem')) {
      return;
    }
    return this._storage.getItem(key);
  }

  private _set(key: string, value: any) {
    if (!key || !this._has('setItem')) {
      return;
    }
    this._storage.setItem(key, value);
  }
}

export class SessionService extends BaseStorage {
  _storage = window.sessionStorage;
}


