import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';
import {Observable} from 'rxjs';
import {UserComment} from '../entity/UserComment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  getGraduate(studentNumber: string): Observable<Result> {
    return this.http.get<Result>('/student/graduate?studentNumber=' + studentNumber);
  }

  getCourses(collegeId: number, direction: string): Observable<Result> {
    console.log('getCollegeId', collegeId, 'directionId', direction);
    return this.http.get<Result>('/course/findAllByCollegeId?collegeId=' + collegeId + '&direction=' + direction);
  }

  getRecommends(studentId: number) {
    return this.http.get<Result>('/recommend/' + studentId);
  }

  /**
   * 查找一个视频下的评论
   */
  findComment(videoId: number) {
    const url = '/comment/findAll?videoId=' + videoId;
    return this.http.get<Result>(url);
  }

  /**
   * 添加评论
   */
  addComment(comment: UserComment) {
    const Url = '/comment/insert';
    return this.http.post<Result>(Url, comment);
  }

}
