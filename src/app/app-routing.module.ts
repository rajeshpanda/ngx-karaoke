import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateKaraokeComponent } from './create-karaoke/create-karaoke.component';
import { KaraokeComponent } from './karaoke-interface/karaoke-interface.component';
import { KaraokeListComponent } from './karaoke-list/karaoke-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateKaraokeComponent,
  },
  {
    path: 'karaoke',
    component: KaraokeComponent,
  },
  {
    path: 'home',
    component: KaraokeListComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
