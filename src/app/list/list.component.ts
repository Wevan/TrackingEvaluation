import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sname = '';
  clazz = '';
  graduatePercent = 0;
  courseNum = 0;
  testNum = 10;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.clazz = localStorage.getItem('userName').substring(0, 8);
    const studentNumber = localStorage.getItem('userName').toString();
    const url = '/student/detail?studentNumber=' + studentNumber;
    // @ts-ignore
    this.http.get<Result>(url).subscribe(
      next => {
        this.sname = next.data.name;
      },
      err => {
        console.log(err);
      }
    );
    const urlGraduate = '/student/graduate?studentNumber=' + studentNumber;
    // @ts-ignore
    this.http.get<Result>(urlGraduate).subscribe(
      next => {
        this.graduatePercent = next.data.percent * 100;
        console.log(next);
      },
      err => {
        console.log(err);
      }
    );
  }

}
