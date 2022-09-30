class cell {

    constructor(posX,posY,possibleTiles,coll, dir)
    {
    this.posX = posX
    this.posY = posY
    this.possibleTiles = possibleTiles;
    this.coll = coll;   
    this.dir = dir; 
    }
    collapse(){
        this.coll = true; 
        const random = Math.floor(Math.random() * (this.possibleTiles.length ));
        let temp = [];
        temp[0] = this.possibleTiles[random];
        this.possibleTiles = temp; 
    }
    setTiles(tiles){
           this.possibleTiles = tiles; 
        }
    getImage() {
            if (this.coll == true) 
            {
                let pic = this.possibleTiles[0].getImg();
                return pic; 
            } 
        }
    getCoord()
    {
        return [this.posX,this.posY];
    }
    getEntropy() 
    {
        return this.possibleTiles.length;
    }
    getColl() 
    {
        return this.coll; 
    }
    getTile() 
    {
         if (this.coll == true) 
            {
                let tile = this.possibleTiles[0];
                return tile; 
            } 
    }
    setDir(dir)
    {
        this.dir = dir;
    }
    getDir()
    {
        return this.dir;
    }

 }



