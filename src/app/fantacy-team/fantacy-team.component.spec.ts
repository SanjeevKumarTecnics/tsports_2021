import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantacyTeamComponent } from './fantacy-team.component';

describe('FantacyTeamComponent', () => {
  let component: FantacyTeamComponent;
  let fixture: ComponentFixture<FantacyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FantacyTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FantacyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
