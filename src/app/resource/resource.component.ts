import { Component, OnInit } from '@angular/core';
import {ResourceService} from './resource.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {Resource} from '../entity/Resource';
import {ResourceMsg} from '../entity/ResourceMsg';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor(private msg: NzMessageService, private resourceService: ResourceService, private fb: FormBuilder, private router: Router) {
  }

  uploading = false;
  fileList: UploadFile[] = [];

  isVisible = false;
  isOkLoading = false;

  data: any[] = [];

  list: ResourceMsg[] = [];

  listLength: number;
  /**
   * 添加资源
   */

  selectedChapter = '第一章';
  selectedTips = '基础概论';
  chapterData = ['第一章', '第二章'];
  tipsData = {
    第一章: ['基础概论', '树', '图'],
    第二章: ['哈希算法', '查找', '排序']
  };

  provinceChange(value: string): void {
    this.selectedTips = this.tipsData[value][0];
  }

  // pop modal
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.addResource();
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  addResource() {
    const resource = new Resource();
    const resourceMsg = new ResourceMsg();
    if (this.selectedChapter === '第一章') {
      resourceMsg.chapterId = 1;
    } else {
      resourceMsg.chapterId = 2;
    }
    resourceMsg.courseId = 1;
    resourceMsg.name = '';
    resourceMsg.type = '1';
    resource.resourceDirctoryFile = resourceMsg;
    // const formData = new FormData();
    this.fileList.forEach((file: any) => {
      // formData.append('file', file);
      resource.file = file;
    });

    this.uploading = true;
    this.resourceService.resource(resource).subscribe(
      (event: {}) => {
      },
      err => {
        console.log(err);
      }
    );
  }


  /**
   * 上传文件
   *
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    console.log('add file ', file);
    return false;
  }


  /**
   * 资源列表
   */

  ngOnInit(): void {
    this.getList();
  }

  loadData(pi: number): void {
    if (5 * pi <= this.listLength) {
      this.data = new Array(5).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.list[index + 5 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.list[index + 5 * (pi - 1)].type,
          url: this.list[index + 5 * (pi - 1)].url,
          id: this.list[index + 5 * (pi - 1)].id
        };
      });
    } else {
      this.data = new Array(this.listLength - 5 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.list[index + 5 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.list[index + 5 * (pi - 1)].type,
          url: this.list[index + 5 * (pi - 1)].url,
          id: this.list[index + 5 * (pi - 1)].id
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
        this.loadData(1);
        console.log(this.list);
      },
      err => {
        console.log(err);
      }
    );
  }
}
