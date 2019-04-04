import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerSelfComponent } from './pdf-viewer-self.component';

describe('PdfViewerSelfComponent', () => {
  let component: PdfViewerSelfComponent;
  let fixture: ComponentFixture<PdfViewerSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfViewerSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
