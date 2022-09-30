let tileSize;
let playfield = [];
let imiges = [];
let tiles =[];
let field = [];
let done = false; 

function preload() 
{
    for (let i = 0; i < 13; i++) {
    imiges[i] = loadImage(`tiles/${i}.png`);
  }
}

function setup() {
  frameRate(10);
  createCanvas(400, 400);
  tileSize = 20 ; 
  playfield = new Array(width / tileSize) ;
  for (let i = 0; i < playfield.length; i ++) 
    { 
        playfield[i] = new Array(height / tileSize) ; 
    } 
  tiles[0] = new tile(imiges[0],["aaa", "aaa" , "aaa" , "aaa"],0);
  tiles[1] = new tile(imiges[1],["bbb", "bbb" , "bbb" , "bbb"],0);
  tiles[2] = new tile(imiges[2],["bbb", "bcb" , "bbb" , "bbb"],0);
  tiles[3] = new tile(imiges[3],["bbb", "bdb" , "bbb" , "bdb"],0)
  tiles[4] = new tile(imiges[4],["abb", "bcb" , "abb" , "aaa"],0)
  tiles[5] = new tile(imiges[5],["abb", "bbb" , "bbb" , "bba"],0)
  tiles[6] = new tile(imiges[6],["bbb", "bcb" , "bbb" , "bcb"],0)
  tiles[7] = new tile(imiges[7],["bdb", "bcb" , "bdb" , "bcb"],0)
  tiles[8] = new tile(imiges[8],["bdb", "bbb" , "bcb" , "bbb"],0)
  tiles[9] = new tile(imiges[9],["bcb", "bcb" , "bbb" , "bcb"],0)
  tiles[10] = new tile(imiges[10],["bcb", "bcb" , "bcb" , "bcb"],0)
  tiles[11] = new tile(imiges[11],["bcb", "bcb" , "bbb" , "bbb"],0)
  tiles[12] = new tile(imiges[12],["bbb", "bcb" , "bbb" , "bcb"],0)



  background(12);
  stroke(0);
  for(let i = 0; i < playfield.length; i++) 
  {
    for(let j = 0 ; j < playfield[i].length; j++) 
    {
      playfield[i][j] = new cell(i , j, tiles.slice(),false,0); 
      square(tileSize * i, tileSize * j, tileSize);
      //image(imiges[Math.floor(Math.random() * 12)], i * tileSize, j * tileSize, tileSize, tileSize); 
      field.push(playfield[i][j]);
    }
  }
  let temp = field[Math.floor(Math.random() * (field.length))].getCoord();
  let x = temp[0];
  let y = temp[1]
  playfield[x][y].collapse();
  sortFiled();
}

function draw() {

if( field.length >=1){  
  let posX = field[0].getCoord()[0];
  let posY = field[0].getCoord()[1];
  field[0].collapse();
  updateBoard(posX,posY);
}
  for (let i = 0; i < width / tileSize; i ++) 
    {
      for (let j = 0; j < height / tileSize; j++) 
      {
        if(playfield[i][j].getColl() == true) 
        {
          //rotate(playfield[i][j].getTile().getRotation());
          rotate_and_draw_image(playfield[i][j].getImage(), i * tileSize, j * tileSize, tileSize, tileSize,playfield[i][j].getTile().getRotation())
        }
      }
    }

}

function updateBoard(x,y) 
{
  filterField(); 
  let tile = playfield[x][y].getTile();
  let col = tile.getColor();
  let newTiles = [];
  //über Tile
  if(x != 0) 
  {
    setValiidTiles("up",x,y)
  }
  // links vom Tile
  if(y != 0) 
  {
    setValiidTiles("left",x,y)
  }
  //rechts vom Tile 
  if(y < (width / tileSize) - 1) 
  {
    setValiidTiles("right",x,y)
  }
  // unterm TIle
    if(x < (height / tileSize) -1 ) 
  {
    setValiidTiles("down",x,y)
  }

  sortFiled();

}

function sortFiled() 
{
    field.sort(function(a, b) {
    if(a.getEntropy() < b.getEntropy()) { return -1; }
    if(a.getEntropy() > b.getEntropy()) { return 1; }
    return 0;
  });
}

function filterField()
{
  for ( let i = 0; i < field.length ; i++) 
  {
    if(field[i].getColl() == true) 
    {
      field.splice(i,1);
    }
  }
}

function rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

function setValiidTiles(pos,x,y)
{
  let main
  let dir
  let modX
  let modY 
  switch(pos) {
    case "up":
       main = 2
       dir = 0
       modX = -1
       modY = 0
       break;
  
    case "down":
      main = 0
      dir = 2
      modX = 1
      modY = 0
      break;
    case "left":
      main = 1
      dir = 3
      modX = 0
      modY = -1
      break;
      case "right":
      main = 3
      dir = 1
      modX = 0
      modY = 1
    }
  let newTiles = [];
  const col = playfield[x][y].getTile().getColor()
  for(let i = 0; i < tiles.length; i ++) 
    {
      if(tiles[i].getColor()[main] == col[dir]) 
      {
        newTiles.push(tiles[i]);
      }
    }

    if(playfield[x + modX][y + modY].getColl() == false) {playfield[x + modX][y+ modY].setTiles(newTiles);}
    if(newTiles.length == 1) 
    {
      playfield[x + modX][y + modY].collapse();
    }


}