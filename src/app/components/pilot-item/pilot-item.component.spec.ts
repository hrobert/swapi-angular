import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotItemComponent } from './pilot-item.component';

describe('PilotItemComponent', () => {
  let component: PilotItemComponent;
  let fixture: ComponentFixture<PilotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilotItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
