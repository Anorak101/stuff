let tileSize;
let playfield = [];
let imiges = [];
let tiles =[];

function preload() 
{
    for (let i = 0; i < 13; i++) {
    imiges[i] = loadImage(`tiles/${i}.png`);
  }
}

function setup() {
  createCanvas(800, 800);
  tileSize = 40 ; 
  playfield = new Array(width / tileSize) ;
  for (let i = 0; i < playfield.length; i ++) 
    { 
        playfield[i] = new Array(height / tileSize) ; 
    } 
  tiles[0] = new tile(imiges[0],["aaa", "aaa" , "aaa" , "aaa"]);
  tiles[1] = new tile(imiges[1],["bbb", "bbb" , "bbb" , "bbb"]);
  tiles[2] = new tile(imiges[2],["bbb", "bcb" , "bbb" , "bbb"]);
  tiles[3] = new tile(imiges[3],["bbb", "bdb" , "bbb" , "bdb"])
  tiles[4] = new tile(imiges[4],["abb", "bcb" , "bba" , "aaa"])
  tiles[5] = new tile(imiges[5],["abb", "bbb" , "bbb" , "bba"])
  tiles[6] = new tile(imiges[6],["bbb", "bcb" , "bbb" , "bcb"])
  tiles[7] = new tile(imiges[7],["bdb", "bcb" , "bdb" , "bcb"])
  tiles[8] = new tile(imiges[8],["bdb", "bbb" , "bcb" , "bbb"])
  tiles[9] = new tile(imiges[9],["bcb", "bcb" , "bbb" , "bcb"])
  tiles[10] = new tile(imiges[10],["bcb", "bcb" , "bcb" , "bcb"])
  tiles[11] = new tile(imiges[11],["bcb", "bcb" , "bbb" , "bbb"])
  tiles[12] = new tile(imiges[12],["bbb", "bcb" , "bbb" , "bcb"])


  background(12);
  stroke(0);
  for(let i = 0; i < playfield.length; i++) 
  {
    for(let j = 0 ; j < playfield[i].length; j++) 
    {
      playfield[i][j] = new cell(i , j, tiles.slice(),false); 
      square(tileSize * i, tileSize * j, tileSize);
      //image(imiges[Math.floor(Math.random() * 12)], i * tileSize, j * tileSize, tileSize, tileSize); 
    }
  }
  let x = Math.floor(Math.random() * (width / tileSize));
  let y = Math.floor(Math.random() * (height / tileSize));
  playfield[x][y].collapse();
  console.log(playfield[x][y]);
  image(playfield[x][y].getImage, x * tileSize, y + tileSize, tileSize)

}

function draw() {


}