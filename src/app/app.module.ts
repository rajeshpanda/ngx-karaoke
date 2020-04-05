import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongPlayerComponent } from './song-player/song-player.component';
import { LyricsRendererComponent } from './lyrics-renderer/lyrics-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KaraokeComponent } from './karaoke-interface/karaoke-interface.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateKaraokeComponent } from './create-karaoke/create-karaoke.component';
import { KaraokeListComponent } from './karaoke-list/karaoke-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SongPlayerComponent,
    LyricsRendererComponent,
    KaraokeComponent,
    CreateKaraokeComponent,
    KaraokeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
