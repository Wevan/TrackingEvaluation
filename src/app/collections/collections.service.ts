import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private http: HttpClient) {
  }

  getList(userId: number): Observable<Result> {
    const url = '/collection/findAll?userId=' + userId;
    return this.http.get<Result>(url);
  }

  deleteOne(id: number): Observable<Result> {
    const url = '/collection/delete?id=' + id;
    return this.http.delete<Result>(url);
  }
}
