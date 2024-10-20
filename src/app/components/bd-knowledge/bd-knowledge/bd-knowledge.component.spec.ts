import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdKnowledgeComponent } from './bd-knowledge.component';

xdescribe('BdKnowledgeComponent', () => {
  let component: BdKnowledgeComponent;
  let fixture: ComponentFixture<BdKnowledgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdKnowledgeComponent],
    });
    fixture = TestBed.createComponent(BdKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
