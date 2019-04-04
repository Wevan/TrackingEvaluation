import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInter} from './http-inter.service';

export const httpInterceptorProviders = [{
  provide: HTTP_INTERCEPTORS, useClass: HttpInter,
  multi: true
}];
