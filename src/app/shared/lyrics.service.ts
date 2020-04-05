import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lyrics } from '../model/lyrics.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  constructor(private httpClient: HttpClient) {}
}
