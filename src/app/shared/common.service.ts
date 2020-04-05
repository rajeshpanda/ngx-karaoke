import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000,
    });
  }
}
