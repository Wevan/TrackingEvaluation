import {Component, OnInit} from '@angular/core';
import {Result} from '../entity/Result';
import {HttpClient} from '@angular/common/http';
import {Course} from '../entity/Course';
import {ListService} from '../list/list.service';

@Component({
  selector: 'app-nz-demo-layout-top-side',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  text = 'Nuc';

  getStudent() {
    let userName = localStorage.getItem('userName');
    if (userName === null || userName === '') {
      userName = sessionStorage.getItem('userName');
    }
    const url = '/student/detail?studentNumber=' + userName;
    // @ts-ignore
    this.http.get<Result>(url).subscribe(
      next => {
        console.log('User Info is ', next.data);
        sessionStorage.setItem('uid', next.data.userId);
        sessionStorage.setItem('Name', next.data.name);
        sessionStorage.setItem('collegeId', next.data.collegeId);
        sessionStorage.setItem('directionId', next.data.directionId);
        sessionStorage.setItem('identity', next.data.id);
        sessionStorage.setItem('classId', next.data.classId);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getStudent();
  }

}
