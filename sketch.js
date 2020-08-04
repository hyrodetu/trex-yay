  var play, gameState, end
  var vGround
  var trexRun,trex
  var groundImage,ground
  var cloudImage,cloudGroup
  var score 
  var trexC, goI, rI, gameOver, restart
  var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obGroup
  function preload(){
  trexRun=loadAnimation("trex0.png","trex1.png","trex2.png" );
    trexC=loadAnimation("trex_collided.png");
    groundImage=loadImage("grnd.png");
    cloudImage=loadImage("Cloud.png");
    obstacle1=loadImage("obstacle1.png");
    obstacle2=loadImage("obstacle2.png");
    obstacle3=loadImage("obstacle3.png");
    obstacle4=loadImage("obstacle4.png");
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");
    goI=loadImage("gameover.png");
    rI=loadImage("resetBt.png");
    
  }

  function setup(){
  createCanvas(600,200);
  trex=createSprite(25,155);
  trex.addAnimation("running",trexRun);
    trex.addAnimation("collided",trexC);
  trex.scale=0.5;
  ground=createSprite(300,180,600,5);
  ground.addImage("ground",groundImage);
       vGround = createSprite(200,190,400,20);
    vGround.visible=false;
    cloudGroup=new Group()
    score=0
    obGroup=new Group();
    play=1
    end=0
    gameState=play
    gameOver= createSprite(200,80);
     gameOver.addImage("gameOver.png_1",goI);
     restart= createSprite(200,130);
     restart.addImage("restart.png_1",rI);
     restart.scale=.6;
    restart.visible=false;
    gameOver.visible=false;
  }

  function draw(){
  background(28)
    text(mouseX+","+mouseY,mouseX,mouseY);
    console.log(trex.y)
    if(gameState==play){
       if (ground.x < 0){
    ground.x = ground.width/2;
    }
      score=Math.round(getFrameRate()/55)+score;
    if(keyDown("space")&&trex.y>=158){
    trex.velocityY = -8;
    }
     trex.velocityY = trex.velocityY + .8;
      ground.velocityX = -3
      spawnClouds()
    spawnObstacle()
      if (trex.isTouching(obGroup)){
          gameState= end 
          }
      
       }
    else if(gameState==end){
            ground.velocityX = 0;
     cloudGroup.setVelocityXEach(0);
     obGroup.setVelocityXEach(0);
     //teraGroup.setVelocityXEach(0);
     trex.changeAnimation("collided",trexC);
     trex.setVelocity(0,0);
     obGroup.setLifetimeEach(-1);
     //teraGroup.setLifetimeEach(-1);
     cloudGroup.setLifetimeEach(-1);
     //teraGroup.setAnimationEach("taro_dead");
     gameOver.visible=true;
     restart.visible=true;
      
            }
          
    if(mousePressedOver(restart)){
       gameState=play
      cloudGroup.destroyEach()
      //teraGroup.destroyEach()
      obGroup.destroyEach()
      trex.changeAnimation("running",trexRun)
      score=0
      restart.visible=false;
    gameOver.visible=false;
     }  
    
    text("score "+score,180,25);
    
    
    trex.collide(vGround)
    drawSprites()
  
  }

function spawnClouds(){
    if(frameCount%60==0){
      var clouds=createSprite(600,random(20,130));
      clouds.addImage("clouds",cloudImage)
      clouds.velocityX=-(5+(score/100)*2);
      console.log(clouds.depth);
       trex.depth=clouds.depth+1;
       clouds.lifetime=120;
       cloudGroup.add(clouds);
      
    }
    
  }
function spawnObstacle(){
    if(frameCount%45==0){
      var obstacle =createSprite(600,160);
      var rand=Math.round(random(1,6));
      switch (rand){
        case 1: obstacle.addImage("ob1",obstacle1);
          break
        case 2: obstacle.addImage("ob2",obstacle2) 
          break
        case 3: obstacle.addImage("ob3",obstacle3);
          break
        case 4: obstacle.addImage("ob4",obstacle4);
          break
        case 5: obstacle.addImage("ob5",obstacle5);
          break
        case 6: obstacle.addImage("ob6",obstacle6);
          break
        default:break
      }
      obstacle.scale=0.5;
      obstacle.velocityX=-(4+(score/100)*2);
      obstacle.lifetime=150;
      obGroup.add(obstacle);
      
    }
  }
