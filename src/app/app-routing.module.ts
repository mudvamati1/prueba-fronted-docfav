import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

const routes: Routes = [
  {path: 'videojuegos', component: GameComponent},
  {path:'detalle-videojuego/:id', component: GameDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
