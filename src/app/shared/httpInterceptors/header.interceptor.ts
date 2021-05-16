import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { I18NService } from '../services/i18n.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    public i18n: I18NService,
    private authService: AuthService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  	const currentToken = this.authService.getToken();

    const newHeaders = req.headers
      .set('Accept-Language', this.i18n.getLanguage()) 
      .set('Pragma', 'no-cache')
      .set('Cache-Control', 'no-store')
      .set('Expires', '0');

    let newReq = req.clone({ headers: newHeaders });

    if (currentToken) {
      const tokenHeaders = newReq.headers.set('X-Auth-Token', currentToken);
      newReq = newReq.clone({ headers: tokenHeaders });
    }
    return next.handle(newReq);
    
  }
}
