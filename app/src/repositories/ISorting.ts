interface ISorting {
    parameter: 'title' | 'gameId'
    direction: 'ASC' | 'DESC'
}

export class GameSorting implements ISorting {
    parameter: 'title' | 'gameId'
    direction: 'ASC' | 'DESC'

    constructor(parameter: any, direction: any) {
        this.parameter = parameter
        this.direction = direction
    }
}
