import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  transform(value: Game[], page: number = 0, search: string = ''): Game[] {
    if (search.length === 0) {
      return value.slice(page, page + 8);
    }

    const searchTerm = search.toLowerCase(); // Convertir el término de búsqueda a minúsculas

    const filteredGames = value.filter(gamer => gamer.title.toLowerCase().includes(searchTerm));

    return filteredGames.slice(page, page + 8);
  }
}

