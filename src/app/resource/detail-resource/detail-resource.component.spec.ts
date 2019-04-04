import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResourceComponent } from './detail-resource.component';

describe('DetailResourceComponent', () => {
  let component: DetailResourceComponent;
  let fixture: ComponentFixture<DetailResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
