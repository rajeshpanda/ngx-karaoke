import { Component, OnInit } from '@angular/core';
import { Karaoke } from '../model/karaoke.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nk-karaoke-list',
  templateUrl: './karaoke-list.component.html',
  styleUrls: ['./karaoke-list.component.scss'],
})
export class KaraokeListComponent implements OnInit {
  songs: Karaoke[] = [];
  searchTerm: string;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getKaraokeList().subscribe((res) => {
      this.songs = res;
    });
  }

  getKaraokeList(search = null): Observable<Karaoke[]> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<Karaoke[]>(`${environment.API_URL}/karaokes`, {
      params,
    });
  }

  getThumbnail(picLink: string) {
    return picLink ? picLink : '../../assets/images/pngwave.png';
  }

  addKaraoke() {
    this.router.navigate(['/create']);
  }

  change(event) {
    console.log(event)
    this.getKaraokeList(event.target.value).subscribe((res) => {
      this.songs = res;
    });
  }

  play(id: number) {
    this.router.navigate([`/karaoke`], {
      queryParams: { id }
    });
  }
}
