import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRoute,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

import { Observable, of, Subject, timer, zip } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export declare type AuthGuardType =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AuthGuardType {
    const { canActivateChild = [] } = next.routeConfig;
    // 当组件路由未配置子路由权限配置，则进行父路由权限校验；否则，直接放行
    if (!canActivateChild.length) {
      return this.preCheckInterval(state);
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AuthGuardType {
    const { component, children = [] } = childRoute.routeConfig;
    // 只有组件存在且不包含子组件，则进行子路由权限校验；否则，直接放行
    if (component && !children.length) {
      return this.preCheckInterval(state);
    }
    return true;
  }

  // 轮询预检查接口
  private preCheckInterval(
    state: RouterStateSnapshot,
    repeat: boolean = false
  ) {
    const check$: Subject<boolean> = new Subject<boolean>();
    const tokenCheckOperation = (value: number) => {
      // 无授权数据，开启轮询跳转检查
      if (!this.authService.isAuth()) {
        /** repeat */
        // this.preCheckInterval(state, true);
        return of(false);
      }
      return this.preCheck();
    };

    const redirectOperation = (result: boolean) => {
      check$.next(result);
      if (result) {
        check$.complete();
        // 当首次未找到授权信息时，开启轮询跳转
        if (repeat) {
          this.router.navigateByUrl(state.url);
        }
      }
    };

    // 轮询检查并跳转到指定路由
    timer(0, 1e3)
      .pipe(
        switchMap(tokenCheckOperation),
        map(() => this.checkAccess(state)),
        map(redirectOperation),
        takeUntil(check$)
      )
      .subscribe();
    return check$.asObservable();
  }

  // 预检查接口完整性-可扩展
  private preCheck() {
    const requestObservers: Observable<any>[] = [];
    // 检查角色
    const currentRole = this.authService.getRole();
    const currentAccountName = this.authService.getAccountName();
    // if (!currentRole || !currentAccountName) {
    //   requestObservers.push(this.getCurrentUserInfo());
    // }

    const mapOperation = requests => {
      return zipResult => {
        return zipResult.length === requests.length;
      };
    };

    const reqests$ = zip(...requestObservers).pipe(
      map(mapOperation(requestObservers))
    );
    // 无请求接口，表示预检查成功
    return requestObservers.length ? reqests$ : of(true);
  }

  // 获取当前用户信息
  private getCurrentUserInfo() {
    const getCurrentUserInfoOk = (result) => {
      const { data } = result;
      const { roles, userName, aboutToExpire, timeout } = data;
      this.authService.setRole(roles[0]);
      this.authService.setAccountName(userName);
      this.authService.setTimeout(timeout);
      // this.storeService.emitBehaviorStore({
      //   action: 'loginSuccess',
      //   state: { type: 'updatePassword', isExpired: aboutToExpire }
      // });
    };

    // const userInfo$ = this.userManageService
    //   .getUserInfo()
    //   .pipe(tap(getCurrentUserInfoOk));
    // return userInfo$;
  }


  // 检查访问状态
  private checkAccess(state: RouterStateSnapshot) {
    const { url } = state;
    let accessStatus = this.checkAuth(url);
    const isLogin = this.authService.shouldNavigationTo(url);

    // 未授权且登录页，继续访问
    if (!accessStatus && isLogin) {
      return false;
    }

    if (accessStatus) {
      accessStatus = this.checkLoginPath(url);
    }

    // if (accessStatus) {
    //   accessStatus = this.checkRoutePermission(url);
    // }

    return accessStatus;
  }

  // 检查登录状态
  private checkAuth(url: string) {
    const isAuth = this.authService.isAuth();
    const isLogin = this.authService.shouldNavigationTo(url);
    if (!isAuth && !isLogin) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

  // 检查login路径访问性
  private checkLoginPath(url: string) {
    const isLogin = this.authService.shouldNavigationTo(url);
    if (isLogin) {
      const { queryParams } = this.activatedRoute.snapshot;
      this.router.navigate(['/home']);
    }
    return !isLogin;
  }

  // 检查路由访问权限
  // private checkRoutePermission(url: string) {
  //   const hasPermission = this.permissionService.isAccessByRole(url);
  //   if (!hasPermission) {
  //     this.messageService.error(this.i18n.get('common_no_auth_label'));
  //     // 记录原始地址
  //     const queryParams = { from: url };
  //     this.router.navigate(['/403'], { queryParams });
  //   }
  //   return hasPermission;
  // }

}
