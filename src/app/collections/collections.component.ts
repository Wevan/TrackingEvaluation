import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CollectionsService} from './collections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  constructor(private cookieService: CookieService, private collectionsService: CollectionsService,
              private router: Router) {
  }

  resourceList: any[] = [];
  data: any[] = [];
  resourceLength = 0;

  ngOnInit(): void {
    this.getList();
  }

  loadData(pi: number): void {
    if (10 * pi <= this.resourceLength) {
      this.data = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.resourceList[index + 10 * (pi - 1)].title,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.resourceList[index + 10 * (pi - 1)].type,
          url: this.resourceList[index + 10 * (pi - 1)].url,
          id: this.resourceList[index + 10 * (pi - 1)].resouceId,
          itemId: this.resourceList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data = new Array(this.resourceLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.resourceList[index + 10 * (pi - 1)].title,
          description: 'beautifully',
          content: ' beautifully and efficiently.',
          type: this.resourceList[index + 10 * (pi - 1)].type,
          url: this.resourceList[index + 10 * (pi - 1)].url,
          id: this.resourceList[index + 10 * (pi - 1)].resouceId,
          itemId: this.resourceList[index + 10 * (pi - 1)].id
        };
      });
    }
  }

  /**
   * 拉取收藏列表
   */
  getList() {
    this.collectionsService.getList(<number><unknown>sessionStorage.getItem('uid')).subscribe(
      next => {
        console.log(next);
        this.resourceList = next.data;
        this.resourceLength = this.resourceList.length;
        this.loadData(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 资源详情
   * @param id 资源id
   * @param name 资源名称
   */

  detail(id: number, name: string) {
    const arr = name.split('.');
    if (arr[1] === 'mp4') {
      this.router.navigate(['/resource/video', id]);
    } else if (arr[1] === 'pdf') {
      this.router.navigate(['/resource/viewer', id]);
    }
  }

  /**
   * 取消收藏
   */

  removeAdd(id: number) {
    console.log('Id is ', id);
    this.collectionsService.deleteOne(id).subscribe(
      next => {
        console.log(next);
        this.getList();
      },
      err => {
        console.log(err);
      }
    );
  }
}
