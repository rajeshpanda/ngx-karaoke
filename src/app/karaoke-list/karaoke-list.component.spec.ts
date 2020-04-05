import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeListComponent } from './karaoke-list.component';

describe('KaraokeListComponent', () => {
  let component: KaraokeListComponent;
  let fixture: ComponentFixture<KaraokeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaraokeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
