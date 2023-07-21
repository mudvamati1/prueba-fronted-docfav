import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { GameService } from 'src/app/services/game.service';
import { of } from 'rxjs';
import { Game } from 'src/app/models/game';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [GameService]
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct platform value when calling getPlatformValue()', () => {
    expect(component.getPlatformValue('PC (Windows)')).toBe('pc');
    expect(component.getPlatformValue('Web Browser')).toBe('browser');
    expect(component.getPlatformValue('PC (Windows), Web Browser')).toBe('all');
    expect(component.getPlatformValue('Xbox One')).toBe('Xbox One');
  });

  it('should increment the page by 5 when calling nextPage()', () => {
    component.page = 0;
    component.nextPage();
    expect(component.page).toBe(5);
  });

  it('should decrement the page by 5 when calling prevPage()', () => {
    component.page = 10;
    component.prevPage();
    expect(component.page).toBe(5);
  });

  it('should not decrement the page below 0 when calling prevPage()', () => {
    component.page = 0;
    component.prevPage();
    expect(component.page).toBe(0);
  });

  it('should call getGames() when calling onChangePlatform()', () => {
    spyOn(component, 'getGames');
    component.onChangePlatform();
    expect(component.getGames).toHaveBeenCalled();
  });

  it('should call getGames() when calling onChangeGenre()', () => {
    spyOn(component, 'getGames');
    component.onChangeGenre();
    expect(component.getGames).toHaveBeenCalled();
  });

  it('should extract genres on component initialization', () => {
    const fakeGames: Game[] = [
      new Game(1, 'Game 1', 'thumbnail1.jpg', 'Description 1', 'gameurl1', 'Genre 1', 'Platform 1', 'Publisher 1', 'Developer 1', '2023-07-20', 'freetogame1'),
      new Game(2, 'Game 2', 'thumbnail2.jpg', 'Description 2', 'gameurl2', 'Genre 2', 'Platform 2', 'Publisher 2', 'Developer 2', '2023-07-21', 'freetogame2'),
    ];

    spyOn(gameService, 'getGames').and.returnValue(of(fakeGames));

    fixture.detectChanges();
    expect(component.genres).toEqual(['Genre 1', 'Genre 2']);
  });

  it('should extract platforms on component initialization', () => {
    const fakeGames: Game[] = [
      new Game(1, 'Game 1', 'thumbnail1.jpg', 'Description 1', 'gameurl1', 'Genre 1', 'Platform 1', 'Publisher 1', 'Developer 1', '2023-07-20', 'freetogame1'),
      new Game(2, 'Game 2', 'thumbnail2.jpg', 'Description 2', 'gameurl2', 'Genre 2', 'Platform 2', 'Publisher 2', 'Developer 2', '2023-07-21', 'freetogame2'),
    ];

    spyOn(gameService, 'getGames').and.returnValue(of(fakeGames));

    fixture.detectChanges();
    expect(component.platforms).toEqual(['Platform 1', 'Platform 2']);
  });

  // Otras pruebas...

});
