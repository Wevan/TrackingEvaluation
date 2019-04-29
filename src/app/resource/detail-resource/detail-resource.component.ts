import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {VideoRecord} from '../../entity/VideoRecord';
import {ResourceService} from '../resource.service';
import {ActivatedRoute} from '@angular/router';
import {UserComment} from '../../entity/UserComment';
import {distanceInWords} from 'date-fns';
import {StudentResource} from '../../entity/StudentResource';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-resource',
  templateUrl: './detail-resource.component.html',
  styleUrls: ['./detail-resource.component.scss']
})
export class DetailResourceComponent implements OnInit, AfterViewInit {

  constructor(private resourceService: ResourceService, private routerInfo: ActivatedRoute,
              private cookieService: CookieService) {
  }

  api: VgAPI;
  @ViewChild('source')
  urlParam: string;

  /**
   * 评论数据
   */
  commentdata = [];

  /**
   * 输入数据
   */
  submitting = false;
  user = {
    author: sessionStorage.getItem('Name'),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
  resourceId = 0;
  resourceDetail;


  ngOnInit() {
    console.log('Get the id param is ', this.routerInfo.snapshot.params['id']);
    this.resourceId = this.routerInfo.snapshot.params['id'];
    this.urlParam = 'http://localhost:8085/resource/getVideo?id=' + this.routerInfo.snapshot.params['id'];
    this.getAllComment();
  }

  ngAfterViewInit(): void {
    const that = this;
    that.resourceService.getOne(this.resourceId).subscribe(
      next => {
        console.log('Get resource detail', next.data);
        that.resourceDetail = next.data;
      },
      err => {

      }
    );
  }

  /**
   * 评论展示
   */

  getAllComment(): void {
    this.resourceService.findComment(this.resourceId).subscribe(
      next => {
        console.log('Comment list', next);
        const clist = next.data;
        clist.map(e => {
          const comitem = {
            author: e.userName,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: e.content,
            datetime: e.commentTime,
            displayTime: e.commentTime
          };
          this.commentdata.push(comitem);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    const comment = new UserComment();
    comment.commentTime = this.getNowDate();
    comment.content = this.inputValue;
    comment.userId = <number><unknown>sessionStorage.getItem('uid');
    comment.userName = sessionStorage.getItem('Name');
    comment.videoId = this.resourceId;
    this.resourceService.addComment(comment).subscribe(
      next => {
        console.log('Comment data', next);
      },
      err => {
        console.log(err);
      }
    );
    // 重置评论框内容
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.commentdata = [...this.commentdata, {
        ...this.user,
        content,
        datetime: new Date(),
        displayTime: distanceInWords(new Date(), new Date())
      }].map(e => {
        return {
          ...e,
          displayTime: distanceInWords(new Date(), e.datetime)
        };
      });
    }, 800);
  }

  /**
   * 视频预览
   */
  onPlayerReady(api: VgAPI) {

    this.api = api;
    // this.api.getDefaultMedia().currentTime = 20;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        let studentId = localStorage.getItem('userName');
        if (studentId === null || studentId === '') {
          studentId = sessionStorage.getItem('userName');
        }
        this.resourceService.findByResource(this.resourceId, <number><unknown>studentId).subscribe(
          next => {
            if (!next.data) {
              this.videoEnd();
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }

  /**
   * 视频时间记录
   */
  timeRecord() {
    const that = this;
    const videoRecord = new VideoRecord();
    videoRecord.overtime = that.api.currentTime;
    console.log('time is ', that.api.currentTime);
    videoRecord.knowledgeId = '1';
    videoRecord.userId = 2;
    that.resourceService.record(videoRecord).subscribe(
      (event: {}) => {
      },
      err => {

      }
    );
  }

  /**
   * 暂停
   */
  pauseSend() {
    // const that = this;
    // if (that.api.state === 'playing') {
    //   this.timeRecord();
    // }
  }

  /**
   * 视频播放完成插入学生记录
   */
  videoEnd() {
    const that = this;
    const studentResource = new StudentResource();
    studentResource.resourceId = that.resourceId;
    let userName = localStorage.getItem('userName');
    if (userName === null || userName === '') {
      userName = sessionStorage.getItem('userName');
    }
    studentResource.percent = 1;
    studentResource.courseId = that.resourceDetail.courseId;
    studentResource.studentId = userName;
    studentResource.knowledgeId = that.resourceDetail.knowledgeId;
    that.resourceService.recordEnd(studentResource).subscribe(
      (event: {}) => {
      },
      err => {

      }
    );
  }

  /**
   * 获取格式化时间
   */
  getNowDate(): string {
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    let strHour: string | number = date.getHours();
    let strMin: string | number = date.getMinutes();
    let strSec: string | number = date.getSeconds();

    if (month <= 9) {
      month = '0' + month;
    }

    if (strDate <= 9) {
      strDate = '0' + strDate;
    }

    if (strHour <= 9) {
      strHour = '0' + strHour;
    }

    if (strMin <= 9) {
      strMin = '0' + strMin;
    }

    if (strSec <= 9) {
      strSec = '0' + strSec;
    }
    return date.getFullYear() + '-' + month + '-' + strDate + ' '
      + strHour + ':' + strMin + ':' + strSec;
  }

}
