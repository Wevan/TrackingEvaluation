import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {observable, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class CanLoginProvide implements CanActivate, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  check(): Observable<boolean> {
    return new Observable<boolean>(o => {
      const token = localStorage.getItem('token');
      if (token === null) {
        o.next(false);
        o.complete();
        this.router.navigateByUrl('/login');
        console.log('if exe');
        return;
      } else {
        o.next(true);
        o.complete();
        console.log('else exe');
        return;
      }
    });
  }

  constructor(private router: Router) {
  }


}
