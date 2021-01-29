const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var ground;
var backImage;

var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var turn = 0;
var gameState = "start";

function preload(){
  backImage = loadImage("back.jpg")
}

function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world;

  ground=new Ground(400,790,800,20);

  for (var k = 0; k <= width; k = k + 80){
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 40; j <=width; j = j + 50)
  {
    plinkos.push(new Plinko(j,75));
  }

  
  for (var j = 15; j <=width-10; j = j + 50)
  {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 40; j <=width; j = j + 50)
  {
    plinkos.push(new Plinko(j,275));
  }

  
  for (var j = 15; j <=width-10; j = j + 50)
  {
    plinkos.push(new Plinko(j, 375));
  }

}

function draw() {
  background(backImage);
  
  Engine.update(engine);  
  ground.display();

  textSize(30);
  strokeWeight(10);
  stroke("yellow")
  fill("green");
  text("PLINKO", 350, 40)
  noStroke();
  fill("yellow")
  text("Score : "+score,600,40);

  if ( turn>= 5) {
    gameState ="end";
    textSize(100);
    fill("lightblue")
    text("GameOver", 150, 250);
  }

  textSize(30);
  fill("lightgreen")
  strokeWeight(5);
  stroke("blue");
  text("1000", 5, 550)
  text("1000", 85, 550)
  text("500", 175, 550)
  text("500", 255, 550)
  text("300", 335, 550)
  text("300", 415, 550)
  text("200", 495, 550)
  text("200", 575, 550)
  text("100", 655, 550)
  text("100", 735, 550)

  
 
  
  for(var i= 0; i<plinkos.length; i++){
    plinkos[i].display();
  }

  for(var j= 0; j<particles.length; j++){
    particles[j].display();

    if (particles[j].body.position.x < 150 && particles[j].body.position.y>760) {
      score=score+1000;
      particles.pop();
     }
    else if (particles[j].body.position.x < 300 && particles[j].body.position.x > 151 && particles[j].body.position.y > 760) {
      score = score + 500;
      particles.pop();
    }
    else if (particles[j].body.position.x < 450 && particles[j].body.position.x > 301 && particles[j].body.position.y > 760) {
      score = score + 300;
      particles.pop();
    }
    else if (particles[j].body.position.x < 600 && particles[j].body.position.x > 451 && particles[j].body.position.y > 760) {
      score = score + 200;
      particles.pop();
    }
    else if (particles[j].body.position.x < 750 && particles[j].body.position.y > 760) {
      score = score + 100;
      particles.pop();
    }

  }

  for(var k= 0; k<divisions.length; k++){
    divisions[k].display();

  }

  
}


function mousePressed(){
  if(gameState!=="end"){
      turn++;
     particles.push(new Particles(mouseX, 10, 10, 10)); 
  }   
}

