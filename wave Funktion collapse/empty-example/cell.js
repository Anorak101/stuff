let posX;
let posY; 
let possibleTiles = [];
let collapsed = false;

 function cell(posX,posY,possibleTiles,collapsed) {
 	this.posX = posX
 	this.posY = posY
    this.possibleTiles = possibleTiles;
    this.coollapsed = collapsed;
    this.collapse function () {
        collapsed = true; 
        possibleTiles[0] = possibleTiles[Math.random() * possibleTiles.length()] ; 
        }
    this.setTiles function (tiles){
           possibleTiles = tiles; 
        }
    this.getImage = function(argument) {
            if (collapsed == true) 
            {
            return possibleTiles[0].getImg();
            } 
        }
 }

