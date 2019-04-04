import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {VideoRecord} from '../entity/VideoRecord';
import {Resource} from '../entity/Resource';

@Injectable()
export class ResourceService {

  constructor(private http: HttpClient) {
  }


  /**
   * 视频记录上传
   */
  record(videoRecord: VideoRecord): Observable<Result> {
    const heroesUrl = '/record/insert';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI' +
          'xNTE0MDEwMzExIiwidXNlcklkIjoxNTU2LCJpYXQiOjE1NDg5OTA0MzMsImV4cCI6MTU0OTU5NTIzM30.E1icoKYMs39g-TRRzTJvkm0JaW0kVbMywBWzUA9Eg0s'
      })
    };

    return this.http.post<Result>(heroesUrl, videoRecord, httpOptions);
  }

  resource(resource: Resource): Observable<Result> {
    const heroesUrl = '/resource/file?chapterId=' + resource.resourceDirctoryFile.chapterId + '&courseId='
      + resource.resourceDirctoryFile.courseId;
    const file = new FormData();
    file.append('file', resource.file);
    console.log('service file is ', resource.file);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data'
    //   })
    // };

    return this.http.post<Result>(heroesUrl, file);
  }

  getList(courseId: number): Observable<Result> {
    const url = '/resource/list?courseId=' + courseId;
    return this.http.get<Result>(url);
  }

  deleteOne(id: number): Observable<Result> {
    const url = '/resource/deleteOne?id=' + id;
    return this.http.delete<Result>(url);
  }

  download(id: number): Observable<any> {
    const url = '/resource/downloadFile?id=' + id;
    // @ts-ignore
    return this.http.get<any>(url, {responseType: 'blob'});

    // .pipe(
    //   tap( // Log the result or error
    //     data => console.log(id, data),
    //     error => console.log(id, error)
    //   )
    // );
    // return this.http.post<Result>(url, id);
  }

}
