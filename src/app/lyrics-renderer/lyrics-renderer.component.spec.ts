import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsRendererComponent } from './lyrics-renderer.component';

describe('LyricsRendererComponent', () => {
  let component: LyricsRendererComponent;
  let fixture: ComponentFixture<LyricsRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricsRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
