class PacmanCtrl{
    constructor(_Pacman){
        this.Pacman = _Pacman;
    }

    askToChangeDirection(direction){
        this.Pacman.askToChangeDirection(direction);
    }
}