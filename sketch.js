
var trex;
var trexrunning;
var rect;
var ground;
var groundimage;
var cloud;
var cloudimage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle;
var jumpsound;
var cloudGroup,obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var trexend;
var gameover,gameoverimage;
var restart,restartimage;
var diesound;



    

function preload(){
    trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
    groundimage=loadImage("ground2.png")
    cloudimage=loadImage("cloud.png")
    obstacle1=loadImage("obstacle1.png")
    obstacle2=loadImage("obstacle2.png")
    obstacle3=loadImage("obstacle3.png")
    obstacle4=loadImage("obstacle4.png")
    obstacle5=loadImage("obstacle5.png")
    obstacle6=loadImage("obstacle6.png")
    jumpsound=loadSound("jump.mp3")
    trexend=loadAnimation("trex_collided.png")
    gameoverimage=loadImage("gameOver.png")
    restartimage=loadImage("restart.png")
    diesound=loadSound("die.mp3")

    
                                                             //  1 time execution
}
function setup(){
    createCanvas(windowWidth,windowHeight)
    trex=createSprite(100,250,70,70)
    trex.addAnimation("running",trexrunning)
    trex.scale=0.7
    rect=createSprite(100,410,300,20)
    ground=createSprite(100,400,windowWidth,20)
    ground.addImage(groundimage)
    rect.visible=false
    cloudGroup=new Group()
    obstaclesGroup=new Group()
    trex.addAnimation("collided",trexend)
    gameover=createSprite(windowWidth-800,220,250,50)
    restart=createSprite(windowWidth-800,320,150,50)
    gameover.addImage(gameoverimage)
    restart.addImage(restartimage)
    ground.velocityX=-(6+3*score/100)
    

                                                               //1 time execution
}
function draw(){
    background("black")
    if(gameState===PLAY){ 

        if(ground.x<350){
            ground.x=ground.width/2
        }

        
    if(keyDown("space") && trex.y>=350){
        trex.velocityY=-20
        jumpsound.play()
    }
    trex.velocityY+=1    //<-----------
    clouds()
    obstacles()
    score=score+Math.round(getFrameRate()/60)


    if(obstaclesGroup.isTouching(trex)){
        gameState=END
        diesound.play()
    }
    text("score:"+score,windowWidth-100,100)
    gameover.visible=false
    restart.visible=false
  

    }
    else if(gameState===END){
        ground.velocityX=0
        trex.velocityY=0
        trex.changeAnimation("collided",trexend)
        obstaclesGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
        obstaclesGroup.setLifetimeEach(-1)
        cloudGroup.setLifetimeEach(-1)
        gameover.visible=true
        restart.visible=true


        if(mousePressedOver(restart)){

               reset()
        }

    }
  
    


   
    trex.collide(rect)
    
    
    drawSprites()

    

                                                       //multiple time execution
}

function clouds(){
   if(frameCount%60===0){
    cloud=createSprite(windowWidth-50,40,100,100)
    cloud.velocityX=-5
    cloud.addImage(cloudimage)
    cloud.scale=1
    cloud.y=Math.round(random(15,80))
    cloud.lifetime=350
    cloudGroup.add(cloud)
   }
}

function obstacles(){
       if(frameCount%60===0){
        obstacle=createSprite(windowWidth-50,360,100,100)
        obstacle.velocityX=-(6+3*score/100)
        var rand=Math.round(random(1,6))
        switch (rand) {
            case 1:   obstacle.addImage(obstacle1)
                
                break;
            case 2:   obstacle.addImage(obstacle2)
                
                break;
            case 3:   obstacle.addImage(obstacle3)
                
                break;   
            case 4:   obstacle.addImage(obstacle4)
                
                break;
            case 5:   obstacle.addImage(obstacle5)
                
                break; 
            case 6:   obstacle.addImage(obstacle6)
                
                break;
        
           
        }
     obstacle.scale=0.9

    
        obstacle.lifetime=350
        obstaclesGroup.add(obstacle)
        restart.depth=obstacle.depth
        restart.depth+=1
       
       }
       

}


function reset(){

   gameState=PLAY
   obstaclesGroup.destroyEach();
   cloudGroup.destroyEach();
   trex.changeAnimation("running",trexrunning)
   score=0


}