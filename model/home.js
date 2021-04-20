function buildBoard() {
    let left = 0;
    let top = 0;
    let typeTile;

    for(let ligne = 0; ligne < RAW_MAZE.table.length; ligne++){
        for(let colonne = 0; colonne < RAW_MAZE.table[0].length; colonne++){
            typeTile = RAW_MAZE.table[ligne][colonne];
            switch(typeTile) {
                case 0:
                    typeTile = "empty";
                    break;
                case 1:
                    typeTile = "wall";
                    break;
                case 2:
                    typeTile = "pacdot";
                    break;
                case 3:
                    typeTile = "energizer";
                    break;
                case 4:
                    typeTile = "pacRespawn";
                    break; 
                case 5:
                    typeTile = "ghostRespawn";
                    break;
                default:
                    console.log("erreur" + typeTile);
            }
            
            $('#gameboard').append('<div class = "'+typeTile+'" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
            left = left + 15;
        }
        left = 0;
        top = top + 15;
    }
}

