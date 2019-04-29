import {Component, OnInit} from '@angular/core';
import {ResourceService} from './resource.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {Resource} from '../entity/Resource';
import {ResourceMsg} from '../entity/ResourceMsg';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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

  list: ResourceMsg[] = [];

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


  /**
   * 资源列表
   */

  ngOnInit(): void {
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
          title: this.videoList[index + 10 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].type,
          url: this.videoList[index + 10 * (pi - 1)].url,
          id: this.videoList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data = new Array(this.videoLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.videoList[index + 10 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].type,
          url: this.videoList[index + 10 * (pi - 1)].url,
          id: this.videoList[index + 10 * (pi - 1)].id
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
   * 删除
   */
  deleteOne(id: number) {
    this.resourceService.deleteOne(id).subscribe(
      next => {
        console.log(next);
        this.list = next.data;
        this.listLength = this.list.length;
        this.loadData(1);
      },
      err => {
        console.log(err);
      }
    );
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
    this.resourceService.getList(1).subscribe(
      next => {
        this.list = next.data;
        this.listLength = this.list.length;
        const that = this;
        this.list.map((item: ResourceMsg) => {
            // 0视频；1pdf；2其他文件
            // @ts-ignore
            if (item.type === 0) {
              that.videoList.push(item);
            } else {
              // @ts-ignore
              if (item.type === 1) {
                that.pdfList.push(item);
              } else {
                that.otherList.push(item);
              }
            }
          }
        );
        this.videoLength = this.videoList.length;
        this.pdfLength = this.pdfList.length;
        this.otherLength = this.otherList.length;
        this.loadData(1);
        this.loadData2(1);
        this.loadData3(1);
      },
      err => {
        console.log(err);
      }
    );
  }

}
