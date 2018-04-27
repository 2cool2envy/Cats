import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBucketComponent } from './choose-bucket.component';

describe('ChooseBucketComponent', () => {
  let component: ChooseBucketComponent;
  let fixture: ComponentFixture<ChooseBucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
