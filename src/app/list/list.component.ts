import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListService} from './list.service';
import {Course} from '../entity/Course';
import {Router} from '@angular/router';
import {ResourceMsg} from '../entity/ResourceMsg';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  courseNum = 0;
  testNum = 10;
  // 基本信息
  sname = '';
  clazz = '';
  graduatePercent = 0;
  // 课程信息
  listOfCourses: Array<Course> = [];
  listOfRecommend: Array<ResourceMsg> = [];
  loadCourse = false;
  load = false;

  constructor(private http: HttpClient, private listService: ListService, private router: Router) {
  }

  ngOnInit() {
    this.clazz = localStorage.getItem('userName').substring(0, 8);
    this.sname = sessionStorage.getItem('Name');
    this.getGraduate();
    this.getCourses();
    this.getRecommendVideos();
  }

  getGraduate() {
    const studentNumber = localStorage.getItem('userName').toString();
    this.listService.getGraduate(studentNumber).subscribe(
      next => {
        this.graduatePercent = next.data.percent * 100;
        console.log('graduate', next);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCourses() {
    this.listService.getCourses(<number><unknown>sessionStorage.getItem('collegeId'), sessionStorage.getItem('directionId')).subscribe(
      next => {
        this.listOfCourses = next.data;
        this.loadCourse = false;
        this.courseNum = this.listOfCourses.length;
        console.log('getCourses', next.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  videoPlay(id: number) {
    this.router.navigate(['/recommend', id]);
  }

  getRecommendVideos() {
    this.listService.getRecommends(<number><unknown>sessionStorage.getItem('identity')).subscribe(
      next => {
        this.listOfRecommend = next.data;
        this.load = false;
        console.log('getRecommends', next.data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
