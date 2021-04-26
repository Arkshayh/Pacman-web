class PacmanCtrl{
    constructor(_Pacman){
        this.Pacman = _Pacman;
    }

    askToChangeDirection(direction){
        //console.log(direction)
        this.Pacman.askToChangeDirection(direction);
    }
}