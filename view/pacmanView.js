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
                console.log("gauche");
                pac.pacmanCtrl.askToChangeDirection(Direction.WEST);
                break;
            case 'ArrowRight':
                console.log("droite");
                pac.pacmanCtrl.askToChangeDirection(Direction.EAST);
                break;
            case 'ArrowUp':
                console.log("haut");
                pac.pacmanCtrl.askToChangeDirection(Direction.NORTH);
                break;
            case 'ArrowDown':
                console.log("bas");
                pac.pacmanCtrl.askToChangeDirection(Direction.SOUTH);
                break;
        }
    }
})