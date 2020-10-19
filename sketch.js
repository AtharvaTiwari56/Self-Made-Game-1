const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;
var engine, world;


var player, playerimg, monster, monsterimg, sword, swordimg, swordimg1, backgroundimg, door, doorimg;
var ground, woosh, hit, hit1, life, gameState, monster1, restart, restartimg, playerimg1;

function preload() {
  // preloading everything
  playerimg = loadImage("Images/download(1)(1).png");
  playerimg1 = loadImage("Images/download (17).png");
  monsterimg = loadAnimation("Images/download (2).png", "Images/download (3).png");
  //doorimg = loadImage("Images/Door.png");
  
 // swordimg1 = loadImage("Images/images(1).png");
  backgroundimg = loadImage("Images/download.jpg");
  woosh = loadSound("Images/WooshSound.mp3");
  restartimg = loadImage("Images/restart.png");
}

function setup() {
  
  createCanvas(1200,700);

  engine = Engine.create();
  world = engine.world;

  //initializing gameState and hitcount
  hit = 0;
  hit1 = 0;
  gameState = "Play";

  //door
  //door = createSprite(1100, 560, 50, 50);
  //door.addImage(doorimg);

  // player
  player = createSprite(150, 560, 50, 50);
  player.addImage(playerimg1);
  
  // initializing sword variable
  sword = null;

  //ground
  ground = createSprite(600, 675, 1200, 50);
  ground.shapeColor = "#526677"

  //monsters
  monster = createSprite(400, 590, 50, 50);
  monster.addAnimation("label", monsterimg);
  monster.velocityX = 3;

  monster1 = createSprite(800, 590, 50, 50);
  monster1.addAnimation("label", monsterimg);
  monster1.velocityX = 3;
  

  //player life creation
  life = new Life();
}

function draw() {
  background(backgroundimg);  
  Engine.update(engine);

  
  //displaying lives
  life.display();
 
  //show text for sword
  if (sword == null) {
    textSize(20);
    fill("black");
    noStroke();
    text("Press 'space' to get a weapon and become a warrior!", player.x - 90, player.y - 100);
  }

  //becoming sword
  if (keyWentDown("space")) {
    player.scale = 0.75;
    player.addImage(playerimg);
    sword = 1;
  }

  // monster functionality
  if(monster.x >= 600){
    monster.mirrorX(-1);
    monster.velocityX = -3;
  } else if(monster.x <= 400){
    monster.mirrorX(1);
    monster.velocityX = 3;
  }

  if(monster1.x >= 1000){
    monster1.mirrorX(-1);
    monster1.velocityX = -3;
  } else if(monster1.x <= 800){
    monster1.mirrorX(1);
    monster1.velocityX = 3;
  }

  // movement
  if (keyDown(RIGHT_ARROW)) {
    player.x= player.x + 12;
  }
  if (keyDown(LEFT_ARROW)) {
    player.x= player.x - 12;
  }

  //life deduction
  if( player.isTouching(monster) || player.isTouching(monster1)){
    life.life = life.life - 0.1;
  }

  //game over
  if(life.life <= 0){
    gameState = "GameOver";
  }

  // hitting monsters
  if (monster.x - player.x <= 200 && mousePressedOver(monster)) {
    if (sword === 1) {
      woosh.play();
      hit+= 0.3;
    }
  }
  if (monster1.x - player.x <= 200 && mousePressedOver(monster1)) {
    if (sword === 1) {
      woosh.play();
      hit1+= 0.3;
    }
  }
  console.log(hit1);
  console.log(hit);
  //destroying monsters
  if(hit >= 5){
    monster.destroy();
   }
   if(hit1 >= 5){
    monster1.destroy();
   }


  // game over stuff....
  if(gameState === "GameOver"){
    restart = createSprite(630, 385);
    restart.addImage(restartimg);
    background("Red");
    textSize(35);
    fill("black");
    text("You Died!", 565, 350);
    monster.destroy();
    monster1.destroy();
    player.visible = false;
    ground.visible = false;
  }

  drawSprites();
}