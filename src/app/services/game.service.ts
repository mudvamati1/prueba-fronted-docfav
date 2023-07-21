// game.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Global } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public url: string;

  constructor(private _http: HttpClient) {
    // Configura la URL base desde el archivo enviroments
    this.url = Global.url;
  }

  getGames(): Observable<Game[]> {
    const url = `${this.url}/games`;
    return this._http.get<Game[]>(url);
  }

  getGameDetails(id: number): Observable<Game> {
    const url = `${this.url}/game?id=${id}`;
    return this._http.get<Game>(url);
  }

  // Función para obtener juegos desde una URL personalizada (con filtro, en este caso)
  getGamesFromUrl(url: string): Observable<Game[]> {
    return this._http.get<Game[]>(url);
  }
}
