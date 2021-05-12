import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { from, TimeoutError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { I18NService } from '../services/i18n.service';
import { assign as _assign } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {
  timer: any;

  constructor(
    public i18n: I18NService,
    private authService: AuthService
  ) { }

  /**
   * 补充httpStatus === 200，存在异常的场景
   * TODO: 根据实际场景判断异常情况
   */

   isException(res: HttpResponse<any>) {
    const code = (res.body && res.body.code) || '0';
    return code !== '0';
  }

  /**
   * 1. ok === true 请求成功，但是返回有异常时
   * 2. status !== 2XX 请求异常
   * 3. 请求超时
   */

  doException(error) {
    let errorType: string;
    if (error instanceof HttpErrorResponse) {
      // http错误
      errorType = 'httpError';
      this.httpException(error);
    } else if (error instanceof TimeoutError) {
      // 超时错误
      errorType = 'TimeoutError';
      this.timeoutException(error);
    } else {
      // unknown error, ok === true
      errorType = 'UnknownError';
      this.unknownException(error);
    }


    // 开发模式时，提示具体错误信息
    if (isDevMode) {
      console.error(`Uncaught ${errorType}:`, error);
    }
  }


  /**
   * http error statusCode !== 2XX
   * 3XX
   * 4XX
   *  401 清除记录的数据，并重定向登陆页
   *  403 跳转到403无权限页面
   *  404 400...其他 错误提示
   * 5XX 系统异常

   */
  httpException(errorResponse) {
    const { status } = errorResponse;
    // 5XX
    if (/^5+/.test(status + '')) {
      return this.serviceErrorException(errorResponse);
    }


    // 4XX
    switch (status) {
      case HttpStatusCodes.Unauthorized:
        this.noAuthErrorException(errorResponse);
        break;
      case HttpStatusCodes.Forbidden:
        this.forbiddenErrorException(errorResponse);
        break;
      default:
        this.clientErrorException(errorResponse);
        break;
    }
  }


  // timeout error
  timeoutException(error) {
    this.errorTips(this.i18n.get('common_timeout_label'));
  }

  // unknown error
  unknownException(errorResponse) {
    const { body, error } = errorResponse;
    const resBody = errorResponse instanceof HttpErrorResponse ? error : body;
    if (!(resBody && (resBody.code || resBody.msg))) {
      return this.errorTips(this.i18n.get('common_exception'));
    }
    const { code, data, msg } = resBody;
    const errorCode = data && data.errorCode ? data.errorCode : code;
    // 如果没有code用接口返回msg提示
    this.errorTips(this.i18n.get(errorCode, data) || msg);
  }

  // service error
  serviceErrorException(errorResponse) {
    this.unknownException(errorResponse);
  }


  // 401
  noAuthErrorException(errorResponse) {
    if (this.timer) {
      return;

    }
    this.timer = window.setTimeout(() => {
      // this.storageErrorInfo(errorResponse);
      this.authService.redirectToLogout('401');
      window.clearTimeout(this.timer);
      this.timer = null;
    }, 2e3);
  }


  // 暂存错误消息
  storageErrorInfo(errorResponse) {
    const { body, error, url } = errorResponse;
    const resBody = errorResponse instanceof HttpErrorResponse ? error : body;
    _assign(resBody, { url });
    // this.authService.setErrorInfo(resBody);
  }

  // 403
  forbiddenErrorException(errorResponse) {
    this.unknownException(errorResponse);
  }

  // 4XX
  clientErrorException(errorResponse) {
    this.unknownException(errorResponse);
  }

  // error tips
  errorTips(content: string, titile?: string) {
    // this.messageService.error(content, { lvTitle: titile || null });
  }
}
