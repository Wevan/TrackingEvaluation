import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendDetailComponent } from './recommend-detail.component';

describe('RecommendDetailComponent', () => {
  let component: RecommendDetailComponent;
  let fixture: ComponentFixture<RecommendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
