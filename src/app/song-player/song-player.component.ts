import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'nk-song-player',
  templateUrl: './song-player.component.html',
  styleUrls: ['./song-player.component.scss'],
})
export class SongPlayerComponent implements OnInit {
  @Input() songPath;

  @Output() currentTime: EventEmitter<number> = new EventEmitter();
  @Output() duration: EventEmitter<number> = new EventEmitter();
  currentTimeInt = 0;
  durationInt = 0;
  audio = new Audio();
  isPlaying = false;
  thumbnail = '../../assets/images/pngwave.png';
  title: string;

  constructor() {
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.ended = this.ended.bind(this);
  }
  ngOnInit(): void {
    this.audio.ontimeupdate = this.getCurrentTime;
    this.audio.onloadeddata = this.getDuration;
    this.audio.onended = this.ended;
  }

  load() {
    if (this.songPath) {
      this.audio.currentTime = 0;
      this.audio.src = this.songPath;
      this.audio.load();
    }
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  stop() {
    this.pause();
    this.audio.currentTime = 0;
  }

  ended(ev: Event) {
    this.stop();
  }

  getCurrentTime(ev: Event) {
    this.currentTimeInt = Math.floor(this.audio.currentTime);
    this.currentTime.next(this.audio.currentTime);
  }

  getDuration(ev: Event) {
    this.durationInt = Math.floor(this.audio.duration);
    this.duration.next(this.durationInt);
  }

  goBack() {
    this.stop();
    this.audio = new Audio();
  }

  convertHMS(value) {
    let minutesStr: string;
    let secondsStr: string;
    const sec = parseInt(value, 10); // convert value to number if it's string
    const hours = Math.floor(sec / 3600); // get hours
    const minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    const seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (minutes < 10) {
      minutesStr = '0' + minutes;
    } else {
      minutesStr = minutes.toString();
    }
    if (seconds < 10) {
      secondsStr = '0' + seconds;
    } else {
      secondsStr = seconds.toString();
    }
    return minutesStr + ':' + secondsStr; // Return is HH : MM : SS
  }

  getThumbnail() {
    return this.thumbnail ? this.thumbnail : '../../assets/images/pngwave.png';
  }
}
