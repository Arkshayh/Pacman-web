class PacmanView{
    constructor(_pacmanCtrl){
        this.pacmanCtrl = _pacmanCtrl;
    }   

    getPacCtrl(){
        return this.pacmanCtrl;
    }
}


    
let pac;

document.addEventListener("keydown", function (event) {
    let touche = event.key;
    if(PacmanView && pac instanceof PacmanView){
        switch(touche){
            case 'ArrowLeft':
                pac.pacmanCtrl.askToChangeDirection(Direction.WEST);
                break;
            case 'ArrowRight':
                pac.pacmanCtrl.askToChangeDirection(Direction.EAST);
                break;
            case 'ArrowUp':
                pac.pacmanCtrl.askToChangeDirection(Direction.NORTH);
                break;
            case 'ArrowDown':
                pac.pacmanCtrl.askToChangeDirection(Direction.SOUTH);
                break;
        }
    }
})