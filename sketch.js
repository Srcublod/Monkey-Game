var PLAY=1
var END=0
var gameState = PLAY;

var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var score;

var ground;

var survivalTime=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(100,270,20,20);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.15;
  
  ground = createSprite(200, 350, 400, 20);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {

background(200);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    banana();
    obstacle();
    
    if(keyDown("space") && monkey.y>=270){
      monkey.velocityY = -12;
    }
    
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 50,50)
  
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivalTime, 200,50)
    
    score = frameCount;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    gameState = END;
  }
  
  drawSprites();
}

function banana() {
  if(frameCount % 80 === 0){
    var banana = createSprite(400,270,20,20);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    var rand = Math.round(random(140,200));
    banana.y = rand;
    banana.scale = 0.16;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}

function obstacle() {
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.lifetime = 200;
    obstacle.scale = 0.16;
    
    obstacleGroup.add(obstacle);
  }
}