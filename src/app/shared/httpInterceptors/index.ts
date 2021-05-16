import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {  HeaderInterceptor } from './header.interceptor';
import {  ExceptionInterceptor } from './exception.interceptor';
import {  TimeoutInterceptor } from './timeout.interceptor';
import {  UrlInterceptor } from './url.interceptor';

export const HttpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ExceptionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }
]
