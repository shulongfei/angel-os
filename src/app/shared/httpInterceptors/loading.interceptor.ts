import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  maskCount: number = 0;

  constructor(
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const showLoading = req.params.get('lvfLoading') !== 'false';
    if (showLoading) {
      this.maskCount++;
        // this.loadingService.show();
    }
    req = req.clone({
        params: req.params.delete('lvfLoading')
    });

    return next.handle(req).pipe(
      finalize(() => {
        if (showLoading) {
          if (--this.maskCount === 0) {
            // this.loadingService.hide();
          }
        }
      })
    )
  }
}
