//Create variables here
var dog, dogimage;
var happyDog, happyDogImage;
var database;
var foodS=20;
foodStock;


function preload()
{
  //load images here
  dogimage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(600, 600);
  dog = createSprite(300, 300, 20, 20);
  dog.addImage(dogimage);
  dog.scale=0.1;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  
}


function draw() {  
  background("black");

  fill("white");
  text("Food given:"+foodS, 280, 250);

  if(keyWentDown(UP_ARROW)){
    foodS-=1;
    writeStock(foodStock);
    dog.addImage(happyDogImage);
  }
  if(foodS<=0){
    fill("green");
    textSize(15);
    text("Enough food is given", 250, 200)
    foodS=0;
    dog.addImage(dogimage);
    }
    


  drawSprites();
  //add styles here

}

function readStock(){
  foodStock = data.val();
}

function writeStock(x){
    x=foodS;


  database.ref("/").update({
    Food : x
  })
}



