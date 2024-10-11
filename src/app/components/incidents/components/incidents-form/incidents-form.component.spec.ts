import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsFormComponent } from './incidents-form.component';

describe('IncidentsFormComponent', () => {
  let component: IncidentsFormComponent;
  let fixture: ComponentFixture<IncidentsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentsFormComponent]
    });
    fixture = TestBed.createComponent(IncidentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
