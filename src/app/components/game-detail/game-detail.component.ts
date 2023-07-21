import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Global } from 'src/app/enviroments/enviroments';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  public url: string;
  public game: Game;
  public confirm: boolean;
  constructor(
    private _gameService: GameService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.game = new Game(0,'','','','','','','','','','');
    this.confirm = false;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params['id'];

      this.getProject(id);
    });
  }

  getProject(id: any) {
    this._gameService.getGameDetails(id).subscribe({
      next: (response) => {
        this.game = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
