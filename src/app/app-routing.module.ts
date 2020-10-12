import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { FinishComponent } from './finish/finish.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'finish', component: FinishComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
