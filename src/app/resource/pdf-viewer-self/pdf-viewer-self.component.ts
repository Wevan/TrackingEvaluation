import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer-self.component.html',
  styleUrls: ['./pdf-viewer-self.component.scss']
})
export class PdfViewerSelfComponent implements OnInit {

  constructor(private routerInfo: ActivatedRoute) {
  }

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  searchContent = '';
  pdfObject = {
    url: 'some url to PDF',
    httpHeaders: {Authorization: 'Bearer XYZ'},
    withCredentials: true,
  };
  page = 1;
  totalPages: number;
  isLoaded = false;

  ngOnInit() {
    console.log('Get the id param is ', this.routerInfo.snapshot.params['id']);
    this.pdfObject.url = 'http://localhost:8085/resource/getPdf?id=' + this.routerInfo.snapshot.params['id'];
    this.pdfObject.httpHeaders = {Authorization: localStorage.getItem('token')};
    this.pdfObject.withCredentials = true;
  }

  search(stringToSearch: string) {
    console.log('search', stringToSearch);
    this.pdfComponent.pdfFindController.executeCommand('find', {
      caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
    });
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

}
