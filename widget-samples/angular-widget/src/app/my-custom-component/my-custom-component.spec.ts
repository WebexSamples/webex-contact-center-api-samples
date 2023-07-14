import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomComponent } from './my-custom-component.component';

describe('MyCustomComponent', () => {
  let component: MyCustomComponent;
  let fixture: ComponentFixture<MyCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
