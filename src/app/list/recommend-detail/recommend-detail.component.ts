import {Component, OnInit} from '@angular/core';
import {ListService} from '../list.service';
import {VgAPI} from 'videogular2/core';
import {ActivatedRoute} from '@angular/router';
import {UserComment} from '../../entity/UserComment';
import {distanceInWords} from 'date-fns';

@Component({
  selector: 'app-recommend-detail',
  templateUrl: './recommend-detail.component.html',
  styleUrls: ['./recommend-detail.component.scss']
})
export class RecommendDetailComponent implements OnInit {

  constructor(private listService: ListService, private routerInfo: ActivatedRoute) {
  }

  api: VgAPI;
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

  ngOnInit() {
    this.resourceId = this.routerInfo.snapshot.params['id'];
    this.urlParam = 'http://localhost:8085/resource/getVideo?id=' + this.routerInfo.snapshot.params['id'];
    this.getAllComment();
  }

  /**
   * 评论展示
   */

  getAllComment(): void {
    this.listService.findComment(this.resourceId).subscribe(
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
    this.listService.addComment(comment).subscribe(
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
