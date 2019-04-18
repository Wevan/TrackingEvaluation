import {Component, OnInit} from '@angular/core';
import {Result} from '../entity/Result';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  size = 'large';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  initReport() {
    const url = '/report/file?id=' + localStorage.getItem('userName') + '&type=2&courseId=1';
    this.http.get<Result>(url).subscribe(
      next => {
      },
      err => {
        console.log(err);
      }
    );
  }

  getReport() {
    const url = '/report/down?id=' + localStorage.getItem('userName');
    // @ts-ignore
    this.http.get<any>(url, {responseType: 'blob'}).subscribe(
      next => {
        console.log(next);
        this.downFile(next, localStorage.getItem('userName'), 'application/pdf');
      },
      err => {
        console.log(err);
      }
    );
  }

  downFile(result, fileName, fileType?) {
    const blob = new Blob([result], {type: fileType});
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', fileName);
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
