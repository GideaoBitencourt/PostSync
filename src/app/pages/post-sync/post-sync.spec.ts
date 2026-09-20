import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSync } from './post-sync';

describe('PostSync', () => {
  let component: PostSync;
  let fixture: ComponentFixture<PostSync>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSync]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSync);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
