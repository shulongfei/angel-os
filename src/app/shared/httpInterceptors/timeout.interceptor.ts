import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  TIMEOUT = 100000;

  constructor(
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  	const _timeout = parseInt(req.params.get('Timeout'), 10) || this.TIMEOUT;
    req = req.clone({
      params: req.params.delete('lvfTimeout')
    });
    return next.handle(req).pipe(timeout(_timeout));
  }
}
