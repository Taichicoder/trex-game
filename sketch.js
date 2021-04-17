var PLAY=1;
var END=0;
var gameState=PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverimg, restartimg;
var jumpSound;
var dieSound;
var checkPoint;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
trex_collided=loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 =loadImage("obstacle1.png");
  obstacle2 =loadImage("obstacle2.png");
  obstacle3 =loadImage("obstacle3.png");
  obstacle4 =loadImage("obstacle4.png");
  obstacle5 =loadImage("obstacle5.png");
  obstacle6 =loadImage("obstacle6.png");
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  dieSound = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  //trex.debug=true;
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverimg);
  gameOver.scale=1.8
  
  restart = createSprite(300,150);
  restart.scale=0.8;
  restart.addImage(restartimg);
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
 score=0;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  var m="Taichi"
  console.log(m)//local variable (m)
}

function draw() {
  //set background color
  background(230, 195, 83);
  fill("white");
  text("score: "+score,500,20);
  if(gameState===PLAY){
    score=score+Math.round(frameRate()/60);
    ground.velocityX=-(6+3*score/100);
    if(score>0 && score%100===0){
      checkPoint.play();
    }
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 165) {
    trex.velocityY = -16;
    jumpSound.play();
    }
    console.log(trex.y);
    trex.velocityY = trex.velocityY + 1.5;
  spawnClouds()
  spawnObstacles()
   if(obstaclesGroup.isTouching(trex)){
    dieSound.play();
    gameState=END;
    jumpSound.play();
    }
    gameOver.visible=false;
    restart.visible=false;
    trex.changeAnimation("running", trex_running);
  }
  
  else if(gameState===END){
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    if(mousePressedOver(restart)){
    reset();
  }     trex.changeAnimation("collided",trex_collided);
trex.veloctityY=0;
ground.velocityX=0;
}
  var a = "hello "
  var b = "taichi"
  var c = a.concat(b);
  console.log(c)

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
  if(frameCount%100===0){
    cloud = createSprite(400,300,40,10);
    cloud.addImage(cloudImage);
    cloud.y=Math.round(random(10,60));
    cloud.scale= 0.8;
    cloud.velocityX=-5;
    //lifetime=X x=frames
    cloud.lifetime=80;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount%100===0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX=-(6+3*score/100);
    var r=Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default: break;  
    }
    obstacle.lifetime=200;
    obstacle.scale=0.5;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0
}

