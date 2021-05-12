import { Injectable } from '@angular/core';
import { deserialize, serialize } from '../utils/common'
@Injectable({
  providedIn: 'root'
})

export class CookieService {
  // 缓存document
  _doc = window.document;
  // 默认过期时间 "Thu, 01 Jan 1970 00:00:00 GMT"
  _defaultExpires = new Date(0).toUTCString();
  constructor() {}
  get(key: string): any {
    const data = this._get(key);
    return deserialize(data);
  }

  set(key: string, value: any, secure = false) {
    if (value === undefined) {
      return this.remove(key);
    }
    this._set(key, serialize(value), secure);
    return value;
  }

  remove(key: string, secure = false) {
    if (!key || !this._has(key)) {
      return;
    }

    this._doc.cookie = `${encodeURIComponent(key)}=; Expires=${
      this._defaultExpires
    }; Path=/;${secure ? ' Secure; SameSite=Strict;' : ''}`;
  }


  clear(excludesKey: string[] = []) {
    this._each((_, key) => {
      if (excludesKey.includes(key)) {
        return;
      }
      this.remove(key);
    });
  }


  // 判断Cookie是否存在
  private _has(key: string): boolean {
    const escapeKey = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&');
    const cookieReg = new RegExp(`(?:^|;\\s*)${escapeKey}\\s*\\=`);
    return cookieReg.test(this._doc.cookie);
  }

  // 获取Cookie值
  private _get(key: string): any {
    if (!key || !this._has(key)) {
      return;
    }
    const escapeKey = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&');
    const cookieReg = new RegExp(
      `(?:^|.*;\\s*)${escapeKey}\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`
    );
    return decodeURIComponent(this._doc.cookie.replace(cookieReg, '$1'));
  }

  // 设置Cookie值
  private _set(key: string, value: any, secure = false) {
    if (!key) {
      return;
    }
    this._doc.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}; Path=/;${secure ? ' Secure; SameSite=Strict;' : ''}`;
  }


  // 循环遍历Cookie
  private _each(callback: (value: string, key: string) => void) {
    // 匹配";"以及"; "两种情况
    const cookies = this._doc.cookie.split(/; ?/g);
    let cookie;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < cookies.length; index++) {
      cookie = cookies[index];
      // 去掉空格
      if (!cookie.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')) {
        continue;
      }
      const [key, value] = cookie.split('=');
      callback(value, key);
    }
  }
}

