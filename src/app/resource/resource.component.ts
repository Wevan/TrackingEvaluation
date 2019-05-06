import {Component, OnInit} from '@angular/core';
import {ResourceService} from './resource.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Collection} from '../entity/Collection';
import {ResourceShow} from '../entity/ResourceShow';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor(private msg: NzMessageService, private resourceService: ResourceService, private fb: FormBuilder, private router: Router,
              private cookieService: CookieService) {
  }

  /**
   * 资源list列表数据
   */
  data: any[] = [];
  data1: any[] = [];
  data2: any[] = [];

  list: ResourceShow[] = [];

  listLength: number;
  videoLength: number;
  pdfLength: number;
  otherLength: number;
  /**
   * 资源分类展示
   */
  videoList: any[] = [];
  pdfList: any[] = [];
  otherList: any[] = [];
  classId: number;

  /**
   * 资源列表
   */

  ngOnInit(): void {
    this.classId = <number><unknown>sessionStorage.getItem('classId');
    this.getList();
  }

  /**
   * 装载数据 1为video 2为pdf 3为others
   * @param pi 初始页码
   */
  loadData(pi: number): void {
    if (10 * pi <= this.videoLength) {
      this.data = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.type,
          url: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.url,
          id: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.id,
          visible: this.videoList[index + 10 * (pi - 1)].resourceClass != null,
          startTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.startTime : '',
          endTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.endTime : ''

        };
      });
    } else {
      this.data = new Array(this.videoLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.type,
          url: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.url,
          id: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.id,
          visible: this.videoList[index + 10 * (pi - 1)].resourceClass != null,
          startTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.startTime : '',
          endTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.endTime : ''
        };
      });
    }

  }

  loadData2(pi: number): void {
    if (10 * pi <= this.pdfLength) {
      this.data1 = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.pdfList[index + 10 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.pdfList[index + 10 * (pi - 1)].type,
          url: this.pdfList[index + 10 * (pi - 1)].url,
          id: this.pdfList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data1 = new Array(this.pdfLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.pdfList[index + 10 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.pdfList[index + 10 * (pi - 1)].type,
          url: this.pdfList[index + 10 * (pi - 1)].url,
          id: this.pdfList[index + 10 * (pi - 1)].id
        };
      });
    }

  }

  loadData3(pi: number): void {
    if (10 * pi <= this.otherLength) {
      this.data2 = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.otherList[index + 10 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.otherList[index + 10 * (pi - 1)].type,
          url: this.otherList[index + 10 * (pi - 1)].url,
          id: this.otherList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data2 = new Array(this.otherLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.otherList[index + 10 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.otherList[index + 10 * (pi - 1)].type,
          url: this.otherList[index + 10 * (pi - 1)].url,
          id: this.otherList[index + 10 * (pi - 1)].id
        };
      });
    }

  }

  /**
   * 下载
   */
  download(id: number, name: string) {
    const arr = name.split('.');
    if (arr[1] === 'mp4') {
      this.router.navigate(['/resource/video', id]);
    } else if (arr[1] === 'pdf') {
      this.router.navigate(['/resource/viewer', id]);
    } else {
      this.resourceService.download(id).subscribe(
        next => {
          const fileType = this.typeReverse(arr[1]);
          this.downFile(next, arr[0], fileType);
        },
        err => {
          console.log('err', err);
        }
      );
    }

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


  typeReverse(type: string): string {
    let result = '';
    switch (type) {
      case 'doc':
        result = 'application/msword';
        break;
      case 'docx':
        result = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'ppt':
        result = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        result = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'pps':
        result = 'application/vnd.ms-powerpoint';
        break;
      case 'ppsx':
        result = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
        break;
      case 'xls':
        result = 'application/vnd.ms-excel';
        break;
      case 'xlsx':
        result = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'pdf':
        result = 'application/pdf';
        break;
      case 'tar':
        result = 'application/x-tar';
        break;
      case 'tgz':
        result = 'application/x-compressed';
        break;
      case 'zip':
        result = 'application/x-zip-compressed';
        break;
      case 'rar':
        result = 'application/octet-stream';
        break;
      case 'txt':
        result = 'text/plain';
        break;
      default:
        result = 'application/octet-stream';
        break;
    }
    return result;
  }

  /**
   * 请求列表
   */
  getList() {
    this.resourceService.getList(9, this.classId).subscribe(
      next => {
        this.list = next.data;
        this.listLength = this.list.length;
        const that = this;
        this.list.map((item: ResourceShow) => {
            // 0视频；1pdf；2其他文件
            // @ts-ignore
            if (item.resourceDirctoryFile.type === 0) {
              that.videoList.push(item);
            } else {
              // @ts-ignore
              if (item.resourceDirctoryFile.type === 1) {
                that.pdfList.push(item.resourceDirctoryFile);
              } else {
                that.otherList.push(item.resourceDirctoryFile);
              }
            }
          }
        );
        this.videoLength = this.videoList.length;
        this.pdfLength = this.pdfList.length;
        this.otherLength = this.otherList.length;
        console.log(this.videoList);
        this.loadData(1);
        this.loadData2(1);
        this.loadData3(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 收藏
   */
  collection(id: number, url: string, type: string, title: string) {
    console.log('URl is ', url);
    const collection = new Collection();
    collection.addTime = this.getNowDate();
    collection.resouceId = id;
    collection.userId = <number><unknown>sessionStorage.getItem('uid');
    collection.userName = sessionStorage.getItem('Name');
    collection.url = url;
    collection.type = type;
    collection.title = title;
    this.resourceService.addCollection(collection).subscribe(
      next => {
        console.log(next);
      },
      err => {
        console.log(err);
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
