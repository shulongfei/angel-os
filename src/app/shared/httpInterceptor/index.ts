import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {  HeaderInterceptor } from './header.interceptor';

export const HttpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
]
