import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { GameDetailComponent } from './game-detail.component';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
    
    TestBed.configureTestingModule({
      declarations: [GameDetailComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    });
    
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;

    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.url).toEqual('');
    expect(component.game).toEqual(new Game(0, '', '', '', '', '', '', '', '', '', ''));
    expect(component.confirm).toBeFalse();
  });

  it('should call getProject() and update game property when initialized with valid ID', () => {
    const mockGame: Game = {
      id: 1,
      title: 'Ejemplo de juego',
      thumbnail: 'url-de-la-miniatura',
      short_description: 'Breve descripción del juego',
      game_url: 'url-del-juego',
      genre: 'Aventura',
      platform: 'PC',
      publisher: 'Editor del juego',
      developer: 'Desarrollador del juego',
      release_date: '2023-07-20',
      freetogame_profile_url: 'url-del-perfil-del-juego'
    };
    const routeParams = { id: 123 };
    gameService.getGameDetails.and.returnValue(of(mockGame));
    route.params = of(routeParams);

    component.ngOnInit();

    expect(gameService.getGameDetails).toHaveBeenCalledWith(routeParams.id);
    expect(component.game).toEqual(mockGame);
  });

  it('should handle error when calling getProject()', () => {
    const routeParams = { id: 123 };
    const errorMessage = 'Error retrieving game details';
    gameService.getGameDetails.and.throwError(errorMessage);
    route.params = of(routeParams);

    component.ngOnInit();

    expect(gameService.getGameDetails).toHaveBeenCalledWith(routeParams.id);
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  it('should navigate to another page when confirm is true', () => {
    const mockGame: Game = {
      id: 1,
      title: 'Ejemplo de juego',
      thumbnail: 'url-de-la-miniatura',
      short_description: 'Breve descripción del juego',
      game_url: 'url-del-juego',
      genre: 'Aventura',
      platform: 'PC',
      publisher: 'Editor del juego',
      developer: 'Desarrollador del juego',
      release_date: '2023-07-20',
      freetogame_profile_url: 'url-del-perfil-del-juego'
    };
    
    component.confirm = true;

    expect(router.navigate).toHaveBeenCalled();
  });

});
