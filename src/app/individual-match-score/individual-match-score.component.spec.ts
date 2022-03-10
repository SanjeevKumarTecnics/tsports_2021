import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMatchScoreComponent } from './individual-match-score.component';

describe('IndividualMatchScoreComponent', () => {
  let component: IndividualMatchScoreComponent;
  let fixture: ComponentFixture<IndividualMatchScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualMatchScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMatchScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
