import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Result} from '../entity/Result';
import {User} from '../entity/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  heroesUrl = '/user/login';
  onLogin(user: User): Observable<Result> {

    return this.http.post<Result>(this.heroesUrl, user);
  }
}
