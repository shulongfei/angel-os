import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  prefix = '';

  constructor(
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _prefix = req.params.get('prefix');
    req = req.clone({
      params: req.params.delete('prefix')
    });
    if (_prefix !== 'none') {
      _prefix = _prefix || this.prefix;
      req = req.clone({
        url: _prefix + (req.url.startsWith('/') ? '' : '/') + req.url
      });
    }
    return next.handle(req);
  }
}
