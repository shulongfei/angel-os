import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  set(key: string, value: any) {
    document.cookie = key + "=" + value
  }

  get(sName: string): any {
    let aCookie = document.cookie.split('; ');
    for (let i = 0; i < aCookie.length; i++) {
      let aCrumb = aCookie[i].split('=');
      if (sName == aCrumb[0])
        return aCrumb[1];
    }
    return null;
  }

  del(name: string) {
    let exp: any = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.get(name);
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }

  delAll() {
    var myDate: any = new Date();
    //设置时间
    myDate.setTime(-1000);
    let data = document.cookie;
    let dataArray = data.split('; ');
    for (var i = 0; i < dataArray.length; i++) {
      let varName = dataArray[i].split('=');
      document.cookie = varName[0] + '=\'\'; expires=' + myDate.toGMTString();
    }
  }

}
