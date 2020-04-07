import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Lyrics } from './model/lyrics.model';
import { LyricsService } from '../shared/lyrics.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Karaoke } from './model/karaoke.model';

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
  recognition;
  sangUntilText: string;
  sangUntilLine: number;
  score = 0;
  @ViewChild('fullScreen', { static: true }) divRef;
  constructor(private lyricsService: LyricsService, private http: HttpClient) {
    this.exitHandler = this.exitHandler.bind(this);
    this.getSinging = this.getSinging.bind(this);
    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener('webkitfullscreenchange', this.exitHandler);
    document.addEventListener('mozfullscreenchange', this.exitHandler);
    document.addEventListener('MSFullscreenChange', this.exitHandler);
  }

  ngOnInit() {
    const { webkitSpeechRecognition } = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.onresult = this.getSinging;
    this.recognition.start();
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

  getSinging(event) {
    this.sangUntilText = '';
    this.sangUntilLine = this.currentLine;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.results.length; i++) {
      this.sangUntilText =
        this.sangUntilText + ' ' + event.results[i][0].transcript;
    }
    let lyric = '';
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentLine; i++) {
      lyric = lyric + ' ' + this.lyricsArr[i].lyric;
    }

    this.score = this.similarity(lyric, this.sangUntilText);
    // console.log(this.score);
  }

  getLines(data: string): string[] {
    return data.split('\n');
  }

  parseLyrics() {
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
    this.saveOffset().subscribe((res) => {
      console.log('saved offset');
    });
  }

  saveOffset(): Observable<Karaoke> {
    return this.http.put<Karaoke>(
      `${environment.API_URL}/karaokes/offset/${this.id}/${this.offset}`,
      {}
    );
  }

  similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (
      (longerLength - this.editDistance(longer, shorter)) /
      parseFloat(longerLength)
    );
  }

  editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }

  getEmoji() {
    if (this.score === 0) {
      return 'mood';
    }
    if (this.score >= 0.60) {
      return 'sentiment_very_satisfied';
    } else if (this.score >= 0.45) {
      return 'sentiment_satisfied_alt';
    } else if (this.score >= 0.35) {
      return 'sentiment_dissatisfied';
    } else {
      return 'mood_bad';
    }
  }
}
