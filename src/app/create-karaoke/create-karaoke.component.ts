import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Karaoke } from '../lyrics-renderer/model/karaoke.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'nk-create-karaoke',
  templateUrl: './create-karaoke.component.html',
  styleUrls: ['./create-karaoke.component.scss'],
})
export class CreateKaraokeComponent implements OnInit {
  karaokeForm: FormGroup;
  picUrl: string;
  songUrl: string;
  isSubmitted = false;
  @ViewChild('thumbnailInput', { static: false }) thumbnailInput: ElementRef;
  @ViewChild('songInput', { static: false }) songInput: ElementRef;
  songTitle: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public location: Location,
    private commonService: CommonService
  ) {
    this.karaokeForm = this.formBuilder.group({
      id: [0],
      songName: ['', Validators.required],
      artistName: [''],
      lyricsText: ['', Validators.required],
    });
  }

  ngOnInit() {}

  getThumbnail() {
    return this.picUrl ? this.picUrl : '../../assets/images/pngwave.png';
  }

  get f() {
    return this.karaokeForm.controls;
  }

  thumbnailUpload() {
    this.thumbnailInput.nativeElement.click();
  }

  songUpload() {
    this.songInput.nativeElement.click();
  }

  onThumbnailChanged(event: any) {
    const file: File = event.target.files[0];
    this.fileUpload(file).subscribe(
      (res) => {
        this.picUrl = res.url;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSongChanged(event: any) {
    const file: File = event.target.files[0];
    this.fileUpload(file).subscribe(
      (res) => {
        this.songUrl = res.url;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fileUpload(file: File): any {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(environment.API_URL + '/files', uploadData);
  }

  create() {
    this.isSubmitted = true;
    console.log(this.karaokeForm.errors);
    if (this.karaokeForm.valid && this.songUrl) {
      const karaoke: Karaoke = this.karaokeForm.value;
      karaoke.songLink = this.songUrl;
      karaoke.thumbnailLink = this.picUrl;
      this.save(karaoke).subscribe(
        (res) => {
          this.commonService.showSnackBar('Song added.');
          this.location.back();
        },
        (err) => {
          this.commonService.showSnackBar('Operation failed. Please retry.');
        }
      );
    }
  }

  save(karaoke: Karaoke): Observable<Karaoke> {
    return this.http.post<Karaoke>(environment.API_URL + '/karaokes', karaoke);
  }

  openLRCSource() {
    window.open(
      `https://syair.info/search?q=${this.songTitle}`,
      '_blank',
      'width=600,height=750'
    );
  }
}
