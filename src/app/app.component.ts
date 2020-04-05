import { Component, ViewChild } from '@angular/core';
import { LyricsRendererComponent } from './lyrics-renderer/lyrics-renderer.component';
@Component({
  selector: 'nk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-karaoke';
  @ViewChild(LyricsRendererComponent, {static: false }) child: LyricsRendererComponent;
  songPath =
    '../assets/Eminem ft Rihanna - Love the way you lie.mp3';
  constructor() {}

  currentTime(time: number) {
    this.child.renderLyrics(time);
  }
}
