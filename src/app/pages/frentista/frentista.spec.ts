import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frentista } from './frentista';

describe('Frentista', () => {
  let component: Frentista;
  let fixture: ComponentFixture<Frentista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frentista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frentista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
