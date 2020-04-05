import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeInterfaceComponent } from './karaoke-interface.component';

describe('KaraokeInterfaceComponent', () => {
  let component: KaraokeInterfaceComponent;
  let fixture: ComponentFixture<KaraokeInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaraokeInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
