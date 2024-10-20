import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormComponent } from './users-form.component';

xdescribe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersFormComponent]
    });
    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
