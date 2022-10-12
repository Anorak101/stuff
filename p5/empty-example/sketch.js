

let w = 1700; 
let h = 880; 
let square = 10; 
let field = [];  
let running = false ; 
function setup() {
  // put setup code here
  createCanvas(w, h);
  button = createButton("start"); 
  button.mousePressed(buttonKlick); 
  frameRate(30);

    

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
{
  let count = 0; 
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

  for(let x = 0; x < w / square; x ++ ) {
     temp[x] = [];
    for ( let y = 0 ; y < h / square;y ++){
      let count  = getNeighborCount(x,y); 
      let status = field[x][y]
      switch(count) {
        case 2 : temp[x][y]= status; 
        break; 
        case 3 : temp[x][y]= true; 
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
  if (x < field.length && y < field.length){  field[x][y] =  !field[x][y]; }
  
}

function buttonKlick(){if(running)
  {
  running = false; 
  frameRate(60); 
  button.html("Start");
} else 
{
 running = true; 
 frameRate(30);  
 button.html("Stop");
}}