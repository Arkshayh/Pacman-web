/**
 * GameView will centralize the display of each component of our game; the tiles, Pacman and the ghosts
 */
class GameView{
    constructor(game){
    
    let labyrinthe = game.getLabyrinthe();
    let left = 0;
    let top = 0;
    let idDiv = 1;
    for(let ligne = 0; ligne < labyrinthe.getLayerRowSize(); ligne++){
        for(let colonne = 0; colonne < labyrinthe.getLayerColumnSize(); colonne++){
            if(labyrinthe.getWallLayerTile(new Position(ligne, colonne)) != undefined){
                $('#gameboard').append('<div class = "wall" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
            }
            else if(labyrinthe.getDotLayerTile(new Position(ligne, colonne)) != undefined ){
                switch(labyrinthe.getDotLayerTile(new Position(ligne, colonne)).id) {
                    case 2:
                        $('#gameboard').append('<div class = "pacdot" id ="case-'+ ligne + '-' + colonne + '" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;
                    case 3: 
                        $('#gameboard').append('<div class = "energizer" id ="case-'+ ligne + '-' + colonne + '" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;
                    default:
                        $('#gameboard').append('<div class = "empty" id ="case-'+ ligne + '-' + colonne + '" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;

                }
            }
            else{
                $('#gameboard').append('<div class = "empty" id ="case-'+ ligne + '-' + colonne + '" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
            }
            left = left + 15; 
            idDiv++;  
        }
        left = 0;
        top = top + 15;
    }
    let hscore = localStorage.getItem('HighScore');
    $("#hscore").text(hscore);

    this.gameview = game;
    this.pacman = game.getPacman();
    this.oldClass = [];
    }

    setOldClass(i, classe){
        this.oldClass[i] = classe;
    }

    getOldClasse(i){
        return this.oldClass[i];
    }

    displayGameOver(){
        console.log("GG, ton score vaut " + this.gameview.getScore());
    }

    //Call movesSprites()
    test(){
        this.gameview.moveSprites();
    }

    //refresh the game
    updateFrame(){
        if(this.gameview.game.isEmpty() == true || this.gameview.isGameOver() == true){
            this.displayGameOver();
            //I do not call saveScore here. I call it in game.move(), when pac eat a dot, the current score is compared to the highscore 
            //and if the score > highscore -> saveScore() is called 
            //In my opinion it's better to do that UmU
            
        }

        let pac = this.gameview.getPacman();
        let pacPos = pac.getPosition();

        let anciennepos = pac.getAnciennePosition();

        let top = (15*(pacPos.getRow()));
        let left = (15*(pacPos.getColumn()));

        let oldTop = (15*(anciennepos.getRow()));
        let oldLeft = (15*(anciennepos.getColumn()));

        $('#case-'+top/15+'-'+left/15+'').attr("class","pacou");
        $('#case-'+oldTop/15+'-'+oldLeft/15+'').attr("class","empty");
        
        $('#currentScore').text("Score actuel : " + this.gameview.getScore());

        let ghostPos;
        let OldghostPos;

        let oldclasss;
        let currentClass;

        for(let i = 0; i < this.gameview.ghosts.length; i++){
            ghostPos = this.gameview.ghosts[i].getPosition();
            OldghostPos = this.gameview.ghosts[i].getAnciennePosition();

            top = (15*(ghostPos.getRow()));
            left = (15*(ghostPos.getColumn()));

            oldTop = (15*(OldghostPos.getRow()));
            oldLeft = (15*(OldghostPos.getColumn()));

            oldclasss = this.getOldClasse(i);
            currentClass = $('#case-'+top/15+'-'+left/15+'').attr("class");

            $('#case-'+top/15+'-'+left/15+'').attr("class","ghost");

            this.setOldClass(i, currentClass);

            $('#case-'+oldTop/15+'-'+oldLeft/15+'').attr("class", oldclasss);
        }


    }

    updateLives(){
        $('#gamefooter').text("Vies restantes : " + this.pacman.getLives());
    }
}