import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ExceptionService } from '../services/exception.service';
import { I18NService } from '../services/i18n.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    public i18n: I18NService,
    private exceptionService: ExceptionService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const doException = req.params.get('lvfDoException') !== 'false';

    req = req.clone({ params: req.params.delete('lvfDoException')});
      return next.handle(req).pipe( tap(data => {
        if (data instanceof HttpResponse) {
          if (doException && this.exceptionService.isException(data)) {
            throw data; } }}),
      catchError(error => {
        if (doException) {
          this.exceptionService.doException(error);
        } return throwError(error); }) );
  }
}
