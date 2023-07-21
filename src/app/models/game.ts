export class Game {

    constructor(
        public id: number,
        public title: string,
        public thumbnail: string,
        public short_description: string,
        public game_url: string,
        public genre: string,
        public platform: string,
        public publisher: string,
        public developer: string,
        public release_date: string,
        public freetogame_profile_url: string
    ) {
        
    }

}