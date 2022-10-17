let tileSize;
let playfield = [];
let imiges = [];
let tiles =[];
let field = [];
let stepsPF = [];
let stepsF = [];
const posTable = {
  up: {
    main: 0,
    dir: 2,
    modX: 0,
    modY: -1
  },
  down: {
    main: 2,
    dir: 0,
    modX: 0,
    modY: 1
  },
  left: {
    main: 3,
    dir: 1,
    modX: -1,
    modY: 0
  },
  right: {
    main: 1,
    dir: 3,
    modX: 1,
    modY: 0
  }
}

function preload() 
{
  for (let i = 0; i < 13; i++) 
  {
  imiges[i] = loadImage(`tiles/${i}.png`);
  }
}

function setup() {
  //frameRate(30);
  createCanvas(600, 600);
  tileSize = 20 ; 
  playfield = new Array(width / tileSize) ;
  for (let i = 0; i < playfield.length; i ++) 
    { 
        playfield[i] = new Array(height / tileSize) ; 
    } 
  tiles[0] = new tile(imiges[0],["sss", "sss" , "sss" , "sss"],0);
  tiles[1] = new tile(imiges[1],["ggg", "ggg" , "ggg" , "ggg"],0);
  tiles[2] = new tile(imiges[2],["ggg", "ghg" , "ggg" , "ggg"],0);
  tiles[3] = new tile(imiges[3],["ggg", "grg" , "ggg" , "grg"],0);
  tiles[4] = new tile(imiges[4],["sgg", "ghg" , "ggs" , "sss"],0);
  tiles[5] = new tile(imiges[5],["sgg", "ggg" , "ggg" , "ggs"],0);
  tiles[6] = new tile(imiges[6],["ggg", "ghg" , "ggg" , "ghg"],0);
  tiles[7] = new tile(imiges[7],["grg", "ghg" , "grg" , "ghg"],0);
  tiles[8] = new tile(imiges[8],["grg", "ggg" , "ghg" , "ggg"],0);
  tiles[9] = new tile(imiges[9],["ghg", "ghg" , "ggg" , "ghg"],0);
  tiles[10] = new tile(imiges[10],["ghg", "ghg" , "ghg" , "ghg"],0);
  tiles[11] = new tile(imiges[11],["ghg", "ghg" , "ggg" , "ggg"],0);
  tiles[12] = new tile(imiges[12],["ggg", "ghg" , "ggg" , "ghg"],0);
  let copyTiles = [...tiles]
  for( let i = 2; i < copyTiles.length ; i ++) 
  {
    for(let j = 1; j < 4; j++) 
    {
        colors = [...copyTiles[i].colors]
        newTile = new tile(copyTiles[i].getImg(),rotateTile(colors,j),j);
        tiles.push(newTile);
    }
  }
  console.log(tiles.length);
  tiles = removeDuplicates(tiles); 
  console.log(tiles.length);

  background(12);
  stroke(0);
  for(let i = 0; i < playfield.length; i++) 
  {
    for(let j = 0 ; j < playfield[i].length; j++) 
    {
      playfield[i][j] = new cell(i , j, [...tiles],false,0); 
      square(tileSize * i, tileSize * j, tileSize);
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
 
  if(field.length == 0) {noLoop();} 
  else 
  {
    if(field[0].getColl() == true) 
    {
    let temp = []
    while(field[0].getColl() == true) {
      temp.push(field[0]);
      field.shift();
    }    
    for(let i = 0; i < temp.length; i++) 
    {
      let posX = temp[i].getCoord()[0];
      let posY = temp[i].getCoord()[1];
      updateBoard(posX,posY);
      
    }

  } else 
    {
      let posX = field[0].getCoord()[0];
      let posY = field[0].getCoord()[1];
      field[0].collapse();
      updateBoard(posX,posY);
    }
  }
  for (let i = 0; i < width / tileSize; i ++) 
    {
      for (let j = 0; j < height / tileSize; j++) 
      {
        if(playfield[i][j].getColl() == true) 
        {
          rotate_and_draw_image(playfield[i][j].getImage(), i * tileSize, j * tileSize, tileSize, tileSize,playfield[i][j].getTile().getRotation())
        }
      }
    }

  stepsPF.push([...playfield]);
  stepsF.push([...field]);


}

function updateBoard(x,y) 
{
  setValiidTiles("up",x,y);
  setValiidTiles("down",x,y);
  setValiidTiles("left",x,y);
  setValiidTiles("right",x,y);
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



function rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate((PI/2) * img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(- ((PI/2) * img_angle));
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

function setValiidTiles(pos,x,y)
{
  const { main, dir, modX, modY } = posTable[pos]

  if(x + modX < 0 || x + modX > playfield.length -1|| y + modY < 0 || y + modY > playfield.length -1) 
  {
    return; 
  }
  if(playfield[x + modX][y + modY].getColl()) 
  {
    return;
  }
  let newTiles = calucaltePossibleTiles(playfield[x][y],main,x + modX, y + modY, dir);
  playfield[x + modX][y+ modY].setTiles(newTiles);
  if(newTiles.length == 1) 
  {
    playfield[x + modX][y + modY].collapse();
  }
}

function mousePressed() {
  noLoop();
}

function calucaltePossibleTiles(main,index,x,y,dir)  
{
  const temp = [];
  const color = reverseString(main.getTile().getColor()[index]); 
  const possibleTiles = playfield[x][y].possibleTiles; 
  for(let i = 0; i< possibleTiles.length; i++)
  {
    if(color === possibleTiles[i].getColor()[dir]) 
    {
      temp.push(possibleTiles[i]); 
    }
  }
  return temp; 
}

function rotateTile(tile, rotation) 
{
  let temp = [] ; 
  let colors = tile; 
  let start =  4 - rotation
  temp = colors.splice(start) ; 
  
  colors = temp.concat(colors)
  return colors; 

}
function reverseString(text) 
{
  const chars = text.split("");
  chars.reverse();
  const temp = chars.join("");
  return temp; 
}

function removeDuplicates(arr)
{
  let newArr = [];
  for ( let i = 0; i < arr.length; i++) 
  {
    if(!containsTile(newArr, arr[i]))
    {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function containsTile(arr, tile) 
{
  for( let i = 0; i< arr.length; i++) 
  {
    tile1 = arr[i]
    if(tile1.colors.toString() === tile.colors.toString() && tile1.pic === tile.pic) 
    {
      return true;
    }
  }
  return false; 
}