import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class HttpInter implements HttpInterceptor {
  private baseUrl: string;
  private token: string;

  constructor(private router: Router, private cookieService: CookieService) {
    if (environment.production) {
      this.baseUrl = 'http://106.12.195.114:8085';
    } else {
      this.baseUrl = 'http://localhost:8085';
    }
  }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let ok: string;
    let request: HttpRequest<any>;
    // 登录无需要token
    console.log('URL ', req.url);
    if (this.cookieService.get('token')) {
      this.token = this.cookieService.get('token');
    } else {
      this.token = sessionStorage.getItem('token');
    }
    console.log('Token is ', this.token);
    if (req.url === '/user/login' || req.url === '/report/down') {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    } else {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set(
          'Authorization',
          this.token,
        ),
      });
      console.log('Token ', localStorage.getItem('token'));
    }
    return next.handle(request).pipe(
      tap(
        event => (ok = event instanceof HttpErrorResponse ? 'success' : ''),
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            console.log('403了');
            localStorage.clear();
            sessionStorage.clear();
            this.cookieService.deleteAll();
            this.router.navigateByUrl('/login');
          }
          console.log('拦截器的error', error);
        },
      ),
    );

  }


}
