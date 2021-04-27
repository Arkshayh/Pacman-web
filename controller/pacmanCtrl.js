/**
 * Has only one parameter, the Pacman object.
 */
class PacmanCtrl{
    constructor(_Pacman){
        this.Pacman = _Pacman;
    }

    /**
     * call the homonymous method of the Pacman object. It will be used by the view when the user presses an arrow on the keyboard.
     * @param {*} direction 
     */
    askToChangeDirection(direction){
        //console.log(direction)
        this.Pacman.askToChangeDirection(direction);
    }
}