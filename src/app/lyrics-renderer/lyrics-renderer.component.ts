import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Lyrics } from '../model/lyrics.model';
import { LyricsService } from '../shared/lyrics.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Karaoke } from '../model/karaoke.model';

@Component({
  selector: 'nk-lyrics-renderer',
  templateUrl: './lyrics-renderer.component.html',
  styleUrls: ['./lyrics-renderer.component.scss'],
})
export class LyricsRendererComponent implements OnInit {
  currentLine = -1;
  totalLines = 0;
  lyricsArr: Lyrics[] = [];
  offset = 0;
  lyrics: string;
  rx = /\[[0-9][0-9]:[0-9][0-9].[0-9][0-9]\]/g;
  isFullScreen = false;
  id: number;
  @ViewChild('fullScreen', { static: true }) divRef;
  constructor(private lyricsService: LyricsService, private http: HttpClient) {
    this.exitHandler = this.exitHandler.bind(this);
    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener('webkitfullscreenchange', this.exitHandler);
    document.addEventListener('mozfullscreenchange', this.exitHandler);
    document.addEventListener('MSFullscreenChange', this.exitHandler);
  }

  ngOnInit() {
  }

  renderLyrics(currentTime: number) {
    if (currentTime === 0) {
      this.currentLine = -1;
      return;
    }

    if (
      this.lyricsArr[this.currentLine + 1].time <=
      currentTime + +this.offset
    ) {
      this.currentLine++;
    }
    // console.log(this.lyricsArr[this.currentLine].time);
  }

  getLines(data: string): string[] {
    return data.split('\n');
  }

  parseLyrics() {
    console.log(this.lyrics)
    const lines = this.getLines(this.lyrics);
    lines.forEach((line) => {
      const duration = this.rx.exec(line);
      if (duration == null) {
        return;
      }
      const lrctime = duration[0].replace('[', '').replace(']', '');
      const a = lrctime.split(':'); // split it at the colons

      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      const time = +(+a[0] * 60 + +a[1]);

      const lyric = line.replace(this.rx, '');
      this.lyricsArr.push({ time, lyric });
    });
    this.totalLines = this.lyricsArr.length;
    return this.lyricsArr;
  }

  minus() {
    this.offset = Math.round((this.offset - 0.1) * 10) / 10;
    this.change();
  }

  plus() {
    this.offset = Math.round((this.offset + 0.1) * 10) / 10;
    this.change();
  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      elem.style.zoom = '300%';
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
      elem.style.zoom = '300%';
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
      elem.style.zoom = '300%';
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
      elem.style.zoom = '300%';
    }
  }

  exitHandler(event) {
    if (this.isFullScreen) {
      this.divRef.nativeElement.style.zoom = '100%';
    }
    this.isFullScreen = !this.isFullScreen;
  }

  change() {
    this.saveOffset().subscribe(res => {
      console.log('saved offset');
    });
  }

  saveOffset(): Observable<Karaoke> {
    // let params = new HttpParams();
    // params = params.append('offset', this.offset.toString());
    return this.http.put<Karaoke>(`${environment.API_URL}/karaokes/offset/${this.id}/${this.offset}`, {});
  }
}
