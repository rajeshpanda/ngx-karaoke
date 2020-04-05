import { Component, OnInit, ViewChild } from '@angular/core';
import { LyricsRendererComponent } from '../lyrics-renderer/lyrics-renderer.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Karaoke } from '../model/karaoke.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SongPlayerComponent } from '../song-player/song-player.component';

@Component({
  selector: 'nk-karaoke-interface',
  templateUrl: './karaoke-interface.component.html',
  styleUrls: ['./karaoke-interface.component.scss'],
})
export class KaraokeComponent implements OnInit {
  @ViewChild(LyricsRendererComponent, { static: true })
  lyrics: LyricsRendererComponent;
  @ViewChild(SongPlayerComponent, { static: true })
  player: SongPlayerComponent;
  karaoke = new Karaoke();
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.getKaraoke(params.id).subscribe((res) => {
          this.karaoke = res;
          console.log(this.karaoke);
          this.player.songPath = this.karaoke.songLink;
          this.player.title = this.karaoke.songName;
          this.player.thumbnail = this.karaoke.thumbnailLink;
          this.player.load();
          this.lyrics.lyrics = this.karaoke.lyricsText;
          this.lyrics.id = this.karaoke.id;
          this.lyrics.offset = +this.karaoke.offset;
          this.lyrics.parseLyrics();
        });
      }
    });
  }

  currentTime(time: number) {
    this.lyrics.renderLyrics(time);
  }

  getKaraoke(id: number): Observable<Karaoke> {
    return this.http.get<Karaoke>(`${environment.API_URL}/karaokes/${id}`);
  }

  goBack() {
    this.player.goBack();
    this.location.back();
  }
}
