import { Injectable } from '@angular/core';
import { 
  some as _some 
} from 'lodash';

import { from, Observable, Subject } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { SessionService } from '../services/session.service';
import { LocalService } from '../services/local.service';
import { I18NService } from '../services/i18n.service'

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

  constructor(
    public i18n: I18NService,
    private cookie: CookieService,
    private sessionService: SessionService,
    private localService: LocalService
  ) {

  }
  
  setToken(xAuthToken: any) {
    this.cookie.set(StorageKey.AuthToken, xAuthToken);
  }

  getToken() {
    return this.cookie.get(StorageKey.AuthToken);
  }

  isHttps() {
    const httpsReg = /^https/i;
    return httpsReg.test(document.location.protocol);
  }

  removeToken(): any {
    this.localService.remove(StorageKey.CurrentRole);
  }

  setRole(role: any) {
    this.localService.set(StorageKey.CurrentRole, role);
  }

  getRole() {
    return this.localService.get(StorageKey.CurrentRole);
  }

  // 设置账户信息
  setAccountName(accountName: string) {
    this.localService.set(StorageKey.AccountName, accountName);
  }

  // 获取账户信息
  getAccountName() {
    return this.localService.get(StorageKey.AccountName);
  }

  // 获取超时时间
  getTimeout() {
    const timeout = this.localService.get(StorageKey.Timeout);
    return timeout || 10;
  }

  // 设置超时时间
  setTimeout(timeout: string) {
    this.localService.set(StorageKey.Timeout, timeout);
  }

  // 设置时间戳
  setTimespan(value?: number) {
    if (!value) {
      value = Date.now();
    }
    this.localService.set(StorageKey.TimeSpan, value);
  }

  getTimespan() {
    let timespan = this.localService.get(StorageKey.TimeSpan);
    if (!timespan) {
      timespan = Date.now();
      this.setTimespan(timespan);
    }
    return timespan;
  }

  logout() {
    const excludeCookieKeys = ['language', StorageKey.ErrorInfo];
    this.cookie.clear(excludeCookieKeys);
    this.localService.clear(excludeCookieKeys);
  }

  // 导航到登出页面
  redirectToLogout(errorCode: string = '') {
    const logoutTips = (title: string = '') => {
      const content = this.i18n.get('common_logout_tips');
      // this.messageService.info(content, { title: title, lvDuration: 1e3 });
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