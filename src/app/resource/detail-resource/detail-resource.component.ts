import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {VideoRecord} from '../../entity/VideoRecord';
import {ResourceService} from '../resource.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {distanceInWords} from 'date-fns';

@Component({
  selector: 'app-detail-resource',
  templateUrl: './detail-resource.component.html',
  styleUrls: ['./detail-resource.component.scss']
})
export class DetailResourceComponent implements OnInit, AfterViewInit {

  api: VgAPI;
  videoObject = {
    url: '',
    httpHeaders: {Authorization: 'Bearer XYZ'},
    withCredentials: true,
  };
  safeUrl: any;
  @ViewChild('source')
  urlParam: string;

  /**
   * 评论数据
   */
  data = {
    author: '曹华珠',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '视频内容清晰，对树讲解有几个问题想和大家探讨',
    children: [
      {
        author: '张慬',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '树的内容我还是不太明白',
        children: [
          {
            author: '李向阳',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '一起探讨'
          },
          {
            author: '求学',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '欢迎探讨.'
          }
        ]
      }
    ]
  };

  likes = 0;
  dislikes = 0;
  time = distanceInWords(new Date(), new Date());

  /**
   * 输入数据
   */
  commentdata = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';


  constructor(private resourceService: ResourceService, private routerInfo: ActivatedRoute,
              private sanitizer: DomSanitizer, private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log('Get the id param is ', this.routerInfo.snapshot.params['id']);
    // this.safeUrl = this.sanitizer
    this.urlParam = 'http://localhost:8085/resource/getVideo?id=' + this.routerInfo.snapshot.params['id'];
    //   .bypassSecurityTrustUrl('http://localhost:8085/resource/getVideo?id=' + this.routerInfo.snapshot.params['id']);
    // this.videoObject.url = this.safeUrl;
    // this.videoObject.httpHeaders = {Authorization: localStorage.getItem('token')};
    // this.videoObject.withCredentials = true;
  }

  ngAfterViewInit(): void {
//     const xhr = new XMLHttpRequest();
//     const that = this;
//     xhr.onreadystatechange = function () {
//       if (this.readyState === 4) {
//         if (this.status === 200) {
//           const res = this.response || this.responseText;
//           // type 里的类型瞎猜的。。
//           const blob = new Blob([res], {type: 'video/mpeg4'});
//           const blobUrl = URL.createObjectURL(blob);
//           that.safeUrl = that.sanitizer.bypassSecurityTrustUrl(blobUrl);
//           // document.querySelector('.source').src = that.safeUrl;
//           that.urlParam.nativeElement.src = blobUrl;
//         }
//       }
//     };
//     xhr.open('get', 'http://localhost:8085/resource/getVideo?id=' + this.routerInfo.snapshot.params['id'], true);
// // 可以设置多个，例如
//     xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
// // 发射
//     xhr.send();
//     console.log('src ', this.urlParam.nativeElement.src);
//     console.log('url ', this.safeUrl);
  }

  /**
   * 评论展示
   */

  /**
   * 评论
   */
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
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
  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
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
        this.api.getDefaultMedia().currentTime = 20;
      }
    );
    const that = this;
    document.getElementById('singleVideo').addEventListener('onbeforeunload', function () {
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
    });
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
    const that = this;
    if (that.api.state === 'playing') {
      this.timeRecord();
    }
  }


}
