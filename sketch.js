var bg, movingBg;
var dementor, dementorImg;
var harry;
var edges;
var gameState = "play";
var spell, spellGrp, dementorGrp, spellImage;
var candy, candyImg, candyGrp;

function preload(){
  
  bg = loadImage("bg.jpg");
  dementorImg = loadImage("dementor.png");
  //spellImage = loadAnimation("Ahhf.gif");
  candyImg = loadImage("candyFrog.png");

} 


function setup() { 
  createCanvas(displayWidth,displayHeight); 
  movingBg = createSprite(width/2,height/2);
  movingBg.addImage(bg);
  movingBg.scale = 3;
  harry = createSprite(width/2,height-100, 50,50);
  harry.shapeColor = ("red");
  edges = createEdgeSprites();

  spellGrp=new Group();
  dementorGrp = new Group();
  candyGrp = new Group();
} 

function draw() { 
  background("White"); 
  if(gameState==="play"){
    //making of the moving background
    movingBg.scale+=0.01;
    if(movingBg.scale>4){
      movingBg.scale = 3;
    }

    spawnDementors();
    spawnCandy();

    harry.bounceOff(edges);

    //for making arry go left
    if(keyDown("left_arrow")){
      harry.x-=5;
    }


    //for making arry go right
    if(keyDown("right_arrow")){
      harry.x+=5;
    }

    //for shooting the spell
    if(keyDown("space")){
      shoot();
    }
   
    //for destroying the dementors
    if(dementorGrp.isTouching(spellGrp)){
      dementorGrp.destroyEach();
    }

    drawSprites(); 
  }
  
}
function spawnDementors(){
  if(frameCount%60===0){
    var y=-50;
    var x=Math.round(random(0,width));
    dementor = createSprite(x,y);
    dementor.addImage(dementorImg);
    dementor.scale = 0.2;
    dementor.velocityX = 3;
    var direction = (180*Math.atan2(200,200))/Math.PI;
    dementor.setSpeedAndDirection(10,direction); 
    dementorGrp.add(dementor);
  }
}

function shoot(){
  spell = createSprite(harry.x, harry.y, 5,5);
  spell.shapeColor= "blue";
  spell.velocityY = -4;
  //spell.addAnimation("spell",spellImage);
  spellGrp.add(spell);
}

function spawnCandy(){
  if(frameCount%100===0){
    var y=-50;
    var x=Math.round(random(0,width));
    candy = createSprite(x,y);
    candy.addImage(candyImg);
    candy.scale = 0.1;
    candy.velocityY = 3;
    candyGrp.add(candy);
  }
}

