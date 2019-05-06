import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {VideoRecord} from '../entity/VideoRecord';
import {Resource} from '../entity/Resource';
import {StudentResource} from '../entity/StudentResource';
import {UserComment} from '../entity/UserComment';
import {Collection} from '../entity/Collection';

@Injectable()
export class ResourceService {

  constructor(private http: HttpClient) {
  }


  /**
   * 视频记录上传
   */
  record(videoRecord: VideoRecord): Observable<Result> {
    const heroesUrl = '/record/insert';
    return this.http.post<Result>(heroesUrl, videoRecord);
  }

  recordEnd(studentResource: StudentResource): Observable<Result> {
    const Url = '/sturesource/insert';
    console.log('Stu Service ', studentResource.knowledgeId);
    return this.http.post<Result>(Url, studentResource);
  }

  /**
   * 添加文件
   * @param resource 添加的文件
   */
  resource(resource: Resource): Observable<Result> {
    const heroesUrl = '/resource/file?chapterId=' + resource.resourceDirctoryFile.chapterId + '&courseId='
      + resource.resourceDirctoryFile.courseId;
    const file = new FormData();
    file.append('file', resource.file);
    console.log('service file is ', resource.file);

    return this.http.post<Result>(heroesUrl, file);
  }

  getList(courseId: number, classId: number): Observable<Result> {
    const url = '/resource/list?courseId=' + courseId + '&classId=' + classId;
    return this.http.get<Result>(url);
  }

  /**
   * 播放量
   * @param id 资源id
   */
  playTimes(id: number): Observable<Result> {
    const url = `/resource/playTimes?id=` + id;
    return this.http.get<Result>(url);
  }

  download(id: number): Observable<any> {
    const url = '/resource/downloadFile?id=' + id;
    // @ts-ignore
    return this.http.get<any>(url, {responseType: 'blob'});
  }

  getOne(id: number) {
    const url = '/resource/detail?id=' + id;
    return this.http.get<Result>(url);
  }

  /**
   * 查找学生是否有资源学习记录
   */
  findByResource(resourceId: number, studentId: number) {
    const url = '/sturesource/findByResource?resourceId=' + resourceId + '&studentId=' + studentId;
    return this.http.get<Result>(url);
  }

  /**
   * 添加评论
   */
  addComment(comment: UserComment) {
    const Url = '/comment/insert';
    return this.http.post<Result>(Url, comment);
  }

  /**
   * 查找一个视频下的评论
   */
  findComment(videoId: number) {
    const url = '/comment/findAll?videoId=' + videoId;
    return this.http.get<Result>(url);
  }

  /**
   * 添加收藏资源
   */
  addCollection(collection: Collection) {
    const url = '/collection/insert';
    return this.http.post<Result>(url, collection);
  }

}
