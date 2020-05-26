import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutoComponent } from './prodcuto.component';

describe('ProdcutoComponent', () => {
  let component: ProdcutoComponent;
  let fixture: ComponentFixture<ProdcutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdcutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdcutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
