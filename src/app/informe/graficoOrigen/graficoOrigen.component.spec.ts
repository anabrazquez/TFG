import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOrigenComponent } from './graficoOrigen.component';

describe('GraficoOrigenComponent', () => {
  let component: GraficoOrigenComponent;
  let fixture: ComponentFixture<GraficoOrigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoOrigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
