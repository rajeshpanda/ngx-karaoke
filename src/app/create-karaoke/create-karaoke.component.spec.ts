import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKaraokeComponent } from './create-karaoke.component';

describe('CreateKaraokeComponent', () => {
  let component: CreateKaraokeComponent;
  let fixture: ComponentFixture<CreateKaraokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKaraokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKaraokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
