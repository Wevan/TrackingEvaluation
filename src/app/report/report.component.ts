import {Component, OnInit} from '@angular/core';
import {Result} from '../entity/Result';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  size = 'large';
  userName = '';

  static downFile(result, fileName, fileType?) {
    const blob = new Blob([result], {type: fileType});
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', fileName);
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  ngOnInit() {
  }

  initReport() {
    this.userName = localStorage.getItem('userName');
    if (this.userName === null || this.userName === '') {
      this.userName = this.cookieService.get('userName');
    }
    // 对学生端courseId无需设置的
    const url = '/report/file?id=' + this.userName + '&type=2&courseId=1';
    this.http.get<Result>(url).subscribe(
      next => {
      },
      err => {
        console.log(err);
      }
    );
  }

  getReport() {
    this.userName = localStorage.getItem('userName');
    if (this.userName === null || this.userName === '') {
      this.userName = this.cookieService.get('userName');
    }
    const url = '/report/down?id=' + this.userName;
    // @ts-ignore
    this.http.get<any>(url, {responseType: 'blob'}).subscribe(
      next => {
        console.log(next);
        ReportComponent.downFile(next, this.userName, 'application/pdf');
      },
      err => {
        console.log(err);
      }
    );
  }

}
