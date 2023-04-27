interface ISorting {
    parameter: 'title' | 'releaseDate' | 'reviews'
    direction: 'ASC' | 'DESC'
}

export class GameSorting implements ISorting {
    parameter: 'title' | 'releaseDate' | 'reviews'
    direction: 'ASC' | 'DESC'

    constructor(parameter: any, direction: any) {
        this.parameter = parameter
        this.direction = direction
    }
}
