

let w = 600; 
let h = 600; 
let square = 20; 
let field = [];  
let running = true ; 
function setup() {
  // put setup code here
  createCanvas(w, h);
  button = createButton('Stop'); 
  button.mousePressed(buttonKlick); 
  frameRate(5);
  // noLoop();
    

  stroke(100);
  fill(0);
  background(255);
    for(let x = 0; x < w / square; x ++ ) {
    let temp = []; 
    for ( let y = 0 ; y < h / square;y ++){
      rect(x * square, y * square, square);
      temp[y]=false ; 
    }
   field[x]= temp ; 
 }

 field[2][4] = true;
 field[3][4] = true;
 field[4][4] = true;
 field[4][3] = true;
 field[3][2] = true; 

}

function draw() {
  if(frameCount != 1 && running == true ){field = updateField(); }

  for(let x = 0; x < w / square; x ++ ) {
     
    for ( let y = 0 ; y < h / square;y ++){
     
       fill(255);  
      if(field[x][y]== false) {fill(0);}
      rect(x * square, y * square, square);
    
    }
  
 }
 // console.log(frameCount);
}

function getNeighborCount(x ,y )
{let count = 0; 
  for( let i = -1; i < 2 ; i ++ )
  {
    for( let j = -1 ;j < 2; j ++) {
      if (x + i < 0|| y + j < 0 || x + i > field.length -1  || y + j > field.length -1 ){continue; }
      if (field[x + i ][y + j ] ) {count ++ ; }
    }
  }
  if(field[x ][y ] ){count --}

  return count; 
}  
function updateField()
{
  let temp = []; 
  temp = field; 
  for(let x = 0; x < w / square; x ++ ) {
     
    for ( let y = 0 ; y < h / square;y ++){
      let count  = getNeighborCount(x,y); 
      switch(count) {
        case 0 : temp[x][y]= false ; 
        break; 
        case 1 : temp[x][y]= false ; 
        break; 
        case 2 : temp[x][y]= field[x][y]; 
        break; 
        case 3 : temp[x][y]= true; 
        break; 
        case 4 : temp[x][y]=false;
        break;
        case 5 : temp[x][y]=false;
        break;
        case 6 : temp[x][y]=false;
        break;
        case 7 : temp[x][y]=false;
        break;
        case 8 : temp[x][y]=false;
        break;
        default : temp[x][y]=false;
      }
    
    }
  
 }
 return temp; 

}

function mouseClicked()
{

  let x = Math.floor(mouseX / square); 
  let y = Math.floor(mouseY / square); 
  console.log(x,y); 
 // if (x < field.length || y < field.length){   }
  field[x][y] =  true;

  //console.log(field); 
}

function buttonKlick(){if(running){ running = false; } else { running = true;  }}