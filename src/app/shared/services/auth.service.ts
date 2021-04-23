import { Injectable } from '@angular/core';
import { 
  some as _some 
} from 'lodash';

import { from, Observable, Subject } from 'rxjs';

export const enum StorageKey {
  ErrorInfo = '__error_info__',
  PasswordStrategy = '__password_strategy__',
  AccountStrategy = '__account_strategy__',
  CurrentRole = '__current_role__',
  AccountName = '__account_name__',
  IsExpire = '__is_expire__',
  Timeout = '__timeout__',
  TimeSpan = '__timespan__',
  InitialStatus = '__initial_status__',
  SiteInfo = '__site_info__',
  FrontTaskQueen = '__front_task_queen__',
  AuthToken = 'X-Auth-Token',
  VncAuthToken = '__X_AUTH_TOKEN__',
  InitData = '__init_data__',
  IpManagement = '__ip_management__'
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  setToken(xAuthToken: any) {
    localStorage.setItem(StorageKey.AuthToken, xAuthToken);
  }

  getToken() {
    return localStorage.getItem(StorageKey.AuthToken);
  }

  isHttps() {
    const httpsReg = /^https/i;
    return httpsReg.test(document.location.protocol);
  }

  removeToken(): any {
    localStorage.removeItem(StorageKey.CurrentRole);
  }

  setRole(role: any) {
    localStorage.setItem(StorageKey.CurrentRole, role);
  }

  getRole() {
    return localStorage.getItem(StorageKey.CurrentRole);
  }

  // 设置账户信息
  setAccountName(accountName: string) {
    localStorage.setItem(StorageKey.AccountName, accountName);
  }

  // 获取账户信息
  getAccountName() {
    return localStorage.getItem(StorageKey.AccountName);
  }

  // 获取超时时间
  getTimeout() {
    const timeout = localStorage.getItem(StorageKey.Timeout);
    return timeout || 10;
  }

  // 设置超时时间
  setTimeout(timeout: string) {
    localStorage.setItem(StorageKey.Timeout, timeout);
  }

  // 设置时间戳
  setTimespan(value?: number) {
    if (!value) {
      value = Date.now();
    }
    localStorage.set(StorageKey.TimeSpan, value);
  }

  // getTimespan() {
  //   let timespan = localStorage.getItem(StorageKey.TimeSpan);
  //   if (!timespan) {
  //     timespan = Date.now();
  //     this.setTimespan(timespan);
  //   }
  //   return timespan;
  // }

  // logout() {
  //   const excludeCookieKeys = ['livelanguage', StorageKey.ErrorInfo];
  //   this.cookieService.clear(excludeCookieKeys);
  //   this.localStorageService.clear(excludeCookieKeys);
  // }

  // 导航到登出页面
  redirectToLogout(errorCode: string = '') {
    const logoutTips = (title: string = '') => {
      // const content = this.i18n.get('common_logout_tips');
      // this.messageService.info(content, { lvTitle: title, lvDuration: 1e3 });
    };

    // const logoutOperation = () => {
    //   this.router.navigate(['/login']);
    //   this.logout();
    // };
    // if (errorCode) {
    //   const title = this.i18n.get(errorCode);
    //   logoutTips(title);
    //   logoutOperation();
    //   return;
    // }
    // if (!this.isAuth()) {
    //   logoutOperation();
    //   return;
    // }


    // this.sessionManagement
    //   .deleteSessionByTokenUsingPOST({
    //     lvfLoading: false,
    //     lvfOperationTips: false
    //   })
    //   .pipe(
    //     tap(() => logoutTips()),
    //     delay(1e3),
    //     catchError(error => of(error)),
    //     finalize(logoutOperation)
    //   )
    //   .subscribe();
  }

  // 判断时候授权成功
  isAuth() {
    return !!this.getToken();
  }

  // 检查是否需要导航到指定地址
  shouldNavigationTo(url: string) {
    const shouldCheckUrls = [
      '/login',
      '/403',
      '/404'
    ];
    // 只匹配以该地址开始的Url，'xx?yy=/login'这种地址将不在匹配列表里面
    if (_some(shouldCheckUrls, item => url.indexOf(item) === 0)) {
      return true;
    }
    return false;
  }
}