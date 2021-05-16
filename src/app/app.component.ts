import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, timer } from 'rxjs';
import { filter, takeUntil, throttleTime } from 'rxjs/operators';
import { AuthService } from './shared/services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  isCollapsed = false;
  operationGapTime: number;
 

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onScreenEvent();
    this.onSessionInterval();
  }



  // 检测屏幕鼠标事件
  onScreenEvent() {
 
    const screenEventOk = _value => {
      console.log('检测');
      // 将分钟转换为毫秒
      const timeout = this.authService.getTimeout() * 6e4;
      const cacheTimespan = this.authService.getTimespan();
      const timespan = Date.now();
      const offset = timespan - cacheTimespan;

      // 事件的时间戳间隔小于Session过期时间，则时间重新开始计数；否则，保持间隔
      this.operationGapTime = offset < timeout ? 0 : offset % timeout;

      // 鼠标移动，便更新时间戳
      this.authService.setTimespan(timespan);
    };

    fromEvent(document, 'mousemove')
      .pipe(throttleTime(1e4), 
      // takeUntil(this._destroy$)
    )
    .subscribe(screenEventOk);
  }

  private _destroy$(_destroy$: any): import("rxjs").OperatorFunction<Event, Event> {
    throw new Error('Method not implemented.');
  }


  // 绑定Session过期心跳检测事件
  onSessionInterval(gapTime: number = 5 * 1e3) {
    const sessionIntervalOk = _value => {

      console.log(2222, this.operationGapTime);
      // 将分钟转换为毫秒
      const timeout = 5000;
      this.operationGapTime += gapTime;

      // 事件的时间戳间隔大于Session过期时间，则跳转到授权页面；否则，清空心跳计数
      if (!this.authService.isAuth() || this.operationGapTime > timeout) {
        const url = this.router.url;
        if (!this.authService.shouldNavigationTo(url)) {
          this.authService.redirectToLogout();
        }
        this.operationGapTime = 0;
      }

      // 自动切换语言环境
      // this.autoChangeLanguage();
      // 自动更新菜单项
      // this.autoUpdateMenus();
    };

    const filterOperation = () => {
      const { url } = this.router;
      const isLogin = this.authService.shouldNavigationTo(url);
      // 登录的跳转过程中，需要排除掉
      return !(isLogin || url === '/');
    };

    timer(0, gapTime)
      .pipe(
        filter(filterOperation),
        // takeUntil(this._destroy$)
      )
      .subscribe(sessionIntervalOk);
  }

}
