import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Global } from 'src/app/enviroments/enviroments';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public games: Game[];
  public platforms: string[];
  public genres: string[];
  public url: string;
  public loading: boolean = false;
  public page: number = 0;
  public search: string = '';
  public selectedPlatform: string = 'all';
  public selectedGenre: string = '';

  constructor(private _gameService: GameService) {
    this.games = [];
    this.platforms = [];
    this.genres = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getGames();
    this.extractGenre(); // Agregar esta línea para extraer los géneros al inicializar el componente
  }

  getGames(): void {
    let apiUrl = '';
  
    // Combinar los filtros de género (tag) y plataforma (platform) en la URL
    const tagFilter = this.selectedGenre !== '' ? `tag=${this.selectedGenre.toLowerCase()}` : '';
    const platformFilter = this.selectedPlatform !== 'all' ? `platform=${this.selectedPlatform}` : '';
  
    if (platformFilter && !tagFilter) {
      apiUrl = `${this.url}/games?${platformFilter}`;
    } else if (!platformFilter && tagFilter) {
      apiUrl = `${this.url}/games?${tagFilter}`;
    } else if (platformFilter && tagFilter) {
      apiUrl = `${this.url}/filter?${tagFilter}&${platformFilter}`;
    } else {
      apiUrl = `${this.url}/games`;
    }
  
    this._gameService.getGamesFromUrl(apiUrl).subscribe((games) => {
      this.games = games;
      this.extractPlatforms();
    });
  }
  
  

  extractPlatforms(): void {
    const allPlatforms: string[] = [];
    this._gameService.getGames().subscribe((games) => {
      games.forEach((game) => {
        if (game.platform && !allPlatforms.includes(game.platform)) {
          allPlatforms.push(game.platform);
        }
      });
      this.platforms = allPlatforms;
    });
  }

  extractGenre(): void {
    const allGenres: string[] = [];
    this._gameService.getGames().subscribe((games) => {
      games.forEach((game) => {
        if (game.genre && !allGenres.includes(game.genre)) {
          allGenres.push(game.genre);
        }
      });
      this.genres = allGenres;
    });
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  onSearchGame(search: string) {
    this.page = 0;
    this.search = search;
  }

  // Función para obtener el valor correcto para selectedPlatform
  getPlatformValue(platform: string): string {
    if (platform === 'PC (Windows)') {
      return 'pc';
    } else if (platform === 'Web Browser') {
      return 'browser';
    } else if (platform === 'PC (Windows), Web Browser') {
      return 'all';
    } else {
      return platform;
    }
  }

  // Función para cambiar la plataforma seleccionada
  onChangePlatform(): void {
    this.getGames();
  }

  onChangeGenre(): void {
    this.getGames();
  }
}
