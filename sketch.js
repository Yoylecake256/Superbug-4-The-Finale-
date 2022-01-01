// game states.

var PLAY = 1;
var END = 0;
var MADDNESS = 3;
var gameState = 1;

// objects/sprites in the game.
var bug, bugI, bugI2;
var scene, sceneI, scene2, sceneI2, scene3, sceneI3;
var arrow, arrow_2, arrowI;
var red, redAni, impGroup;
var coin, coinGroup, coinIy;
var ruby, rubyI, rubyGroup;
var diamond, diamondI, diamondGroup;
var battery, superBattery, superBatteryI, batterI, batteryGroup, superBatteryGroup;
var asteriod, asteriodI, asteriodGroup;
var debry, debry2, debry3, debryI, debryI_2, debryI_3, debryGroup, skeldGroup;
var edges;
var ender, dragon;

//scoring system.
var score;

//accleration
var batteries;

//protection.
var shields;

function preload(){
    bugI = loadImage("Bug.png");
    arrowI = loadImage("next.png");
    sceneI = loadImage("background.jpg");
    sceneI2 = loadImage("BackS_2.png")
    sceneI3 = loadImage("BackS_1.png");
    coinIy = loadImage("Gold.png");
    batterI = loadImage("battery.png");
    redAni = loadAnimation("Red_1.png", "Red_2.png", "Red_3.png", "Red_4.png", "Red_5.png", "Red_6.png", "Red_7.png", "Red_8.png", "Red_9.png", "Red_10.png", "Red_11.png", "Red_13.png");
    superBatteryI = loadAnimation("SuperCharged.png", "SuperCharged_2.png");
    diamondI = loadImage("Diamond.png");
    asteriodI = loadImage("Asteriod_1.png");
    debryI = loadAnimation("Asteriod_5.png", "Asteriod_6.png", "Asteriod_7.png", "Asteriod_8.png", "Asteriod_9.png");
    rubyI = loadImage("Ruby.png");
    debryI_2 = loadImage("Spaceship.png");
    debryI_3 = loadImage("debry_3.png");
    dragon = loadImage("End.png");
}

function setup(){
    createCanvas(2732, 1250);

    scene = createSprite(1285, 652, 2900, 1500);
    scene.addImage(sceneI);
    scene.scale = 7.5;
    scene.velocityX = -20;

    bug = createSprite(150, 625, 100, 50);
    bug.addImage(bugI);
    bug.scale = 0.7;

    scene2 = createSprite(1336, 625, 5732, 3000);
    scene2.addImage(sceneI2);
    scene2.scale = 3.0;

    arrow_2 = createSprite(250, 1100, 50, 50);
    arrow_2.addImage(arrowI);
    arrow_2.scale = 0.5;

    scene3 = createSprite(1370, 625, 5732, 3000);
    scene3.addImage(sceneI3);
    scene3.scale = 3.0;

    arrow = createSprite(2550, 1100, 50, 50);
    arrow.addImage(arrowI);
    arrow.scale = 0.5;

    ender = createSprite(1336, 625, 50, 50);
    ender.addImage(dragon);
    ender.visible = false;

    score = 0;
    batteries = 100;
    shields = 1;

asterGroup = new Group();
batteryGroup = new Group();
coinGroup = new Group();
diamondGroup = new Group();
rubyGroup = new Group();
debryGroup = new Group();
impGroup = new Group();
superBatteryGroup = new Group();
skeldGroup = new Group();
}

function draw(){
    background("black");
    edges = createEdgeSprites();
    //bug.collide(edges);

    if(scene.x < 150){
        console.log(scene.x);
        scene.x = 1285;
    }

    if(gameState === PLAY){
        spawnBattery();
        spawnCoins();
        spawnDiamonds();
        spawnDebry();
        spawnRubies();
        spawnImpostors();

        if(keyDown("r")){

            coinGroup.destroyEach();
            debryGroup.destroyEach();
            batteryGroup.destroyEach();
            impGroup.destroyEach();
            diamondGroup.destroyEach();
            rubyGroup.destroyEach();
            skeldGroup.destroyEach();
            superBatteryGroup.destroyEach();
            shields = 1;
            bug.visible = true;
            scene.velocityX = -20;
            score = 0;
            charge = 100;
            gameState = PLAY;
            bug.x = 150;
            bug.y = 625;
          }

          if(mousePressedOver(arrow)){
              arrow.destroy();
              scene3.visible = false;
          }

          if(mousePressedOver(arrow_2) && scene3.visible === false){
              arrow_2.destroy();
              scene2.visible = false;
          }

          if(bug.isTouching(diamondGroup)){
            diamondGroup.destroyEach();
            score = score + 10;
        }

        if(bug.isTouching(rubyGroup)){
            rubyGroup.destroyEach();
            score = score + 50
        }

        if(bug.isTouching(coinGroup)){
            coinGroup.destroyEach();
            score = score + 1;
        }

         if (keyDown("left") || keyDown("A") && batteries > 0) {
            bug.x = bug.x - 20;
        }

        if (keyDown("right") || keyDown("D") && batteries > 0) {
            bug.x = bug.x + 20;
        }

        if (keyDown("up") || keyDown("W") && batteries > 0) {
            bug.y = bug.y - 15;
        }

        if (keyDown("down") || keyDown("S") && batteries > 0) {
            bug.y = bug.y + 15;
        }

        if(keyDown("space") && shields === 1 || shields > 1){
            debryGroup.destroyEach();
            impGroup.destroyEach();
            skeldGroup.destroyEach();
            shields = shields - 1;
        }

//movement of the bug when there is no charge left in the thrusters.


        if (keyDown("left") || keyDown("A") && batteries === 0) {
            bug.x = bug.x - 10;
        }

        if (keyDown("right") || keyDown("D") && batteries === 0) {
            bug.x = bug.x + 10;
        }

        if (keyDown("up") || keyDown("W") && batteries === 0) {
            bug.y = bug.y - 10;
        }

        if (keyDown("down") || keyDown("S") && batteries === 0) {
            bug.y = bug.y + 10;
        }

        if(bug.isTouching(batteryGroup)){
            batteryGroup.destroyEach();
            batteries = batteries + 2;
        }

        if(bug.isTouching(superBatteryGroup)){
            superBatteryGroup.destroyEach();
            shields = shields + 1;
        }

        if(bug.isTouching(debryGroup)){
            bug.visible = false;
            bug.velocityX = 0;
            bug.velocityY = 0;
            textSize(50);
            fill("red");
            text("You died!", 1366, 625);
        }

        if(scene3.visible === true || scene2.visible === true){
            asterGroup.setVelocityXEach(0);
            batteryGroup.setVelocityXEach(0);
            coinGroup.setVelocityXEach(0);
            diamondGroup.setVelocityXEach(0);
            rubyGroup.setVelocityXEach(0);
            debryGroup.setVelocityXEach(0);
            impGroup.setVelocityXEach(0);
            superBatteryGroup.setVelocityXEach(0);
            skeldGroup.setVelocityXEach(0);
        }
        
        if(scene3.visible === false && scene2.visible === false){
            asterGroup.setVelocityXEach(-50);
            batteryGroup.setVelocityXEach(-30);
            coinGroup.setVelocityXEach(-30);
            diamondGroup.setVelocityXEach(-40);
            rubyGroup.setVelocityXEach(-50);
            debryGroup.setVelocityXEach(-50);
            impGroup.setVelocityXEach(-30);
            superBatteryGroup.setVelocityXEach(-50);
            skeldGroup.setVelocityXEach(-30);
        }

        if(bug.visible === false && bug.isTouching(diamondGroup) || bug.isTouching(debryGroup) || bug.isTouching(rubyGroup) || bug.isTouching(batteryGroup) || bug.isTouching(superBatteryGroup) || bug.isTouching(coinGroup) || bug.isTouching(skeldGroup) || bug.isTouching(asterGroup)){
            score = score;
            batteries = batteries;
            shields = shields;
        }

        if(frameCount % 200 === 0){
            batteries = batteries - 1;
        }

        if(batteries > 0){
            scene.velocityX = -20;
        }

        if(batteries === 0){
            scene.velocityX = -10
        }
    }

    if(score === 1000){
        scene.velocityX = 0;
        asterGroup.destroyEach();
        batteryGroup.destroyEach();
        coinGroup.destroyEach();
        diamondGroup.destroyEach();
        rubyGroup.destroyEach();
        debryGroup.destroyEach();
        impGroup.destroyEach();
        superBatteryGroup.destroyEach();
        skeldGroup.destroyEach();
        asterGroup.destroyEach();
        batteryGroup.destroyEach();
        coinGroup.destroyEach();
        diamondGroup.destroyEach();
        rubyGroup.destroyEach();
        debryGroup.destroyEach();
        impGroup.destroyEach();
        superBatteryGroup.destroyEach();
        skeldGroup.destroyEach();
        bug.velocityX = 15;
        ender.visible = true;
    }

    if(bug.x === 3000){
        bug.destroy();
    }

drawSprites();
stroke("red");
fill("blue");
textSize(45);
text("Score:"+  score, 0, 50);
text("Number of batteries you have: "+  batteries, 2040, 50);
text("Destroy-Inator charge (Press space to activate ", 255, 50);
text("uses purple batteries check for batteries with diamonds): "+ shields, 255, 100)
//End will be triggered at a score of 1000.
stroke("red");
fill("white");
textSize(45);
text("Tip: Press the 'R' key to reset (Note: The 'r' key reset might not be initiated on one tap of the r key)", 325, 1230)
}

function spawnBattery(){
    if(frameCount % 150 === 0){
        battery = createSprite(3000, 150, 50, 50);
        battery.lifetime = 200
        battery.velocityX = -30;
        battery.y = Math.round(random(10, 1220));
        battery.addImage(batterI);
        battery.scale = 0.3;
        batteryGroup.add(battery);
    }

    if(frameCount % 2000 === 0){
        superBattery = createSprite(3000, 150, 50, 50);
        superBattery.lifetime = 200;
        superBattery.velocityX = -50;
        superBattery.y = Math.round(random(10, 1220));
        superBattery.addAnimation("superBattery", superBatteryI)
        superBattery.scale = 0.3;
        superBatteryGroup.add(superBattery);
    }
}

function spawnCoins(){
    if(frameCount % 90 === 0){
        coin = createSprite(3000, 150, 50, 50);
        coin.addImage(coinIy);
        coin.scale = 0.6;
        coin.velocityX = -40;
        coin.lifetime = 200;
        coin.y = Math.round(random(50, 1230));
        coinGroup.add(coin);
    }
}

function spawnDebry(){
    if(frameCount % 100 === 0){
        debry2 = createSprite(3000, 150, 450, 150);
        debry2.addAnimation("debry", debryI);
        debry2.scale = 0.6;
        debry2.velocityX = -80;
        debry2.lifetime = 200;
        debry2.y = Math.round(random(50, 1230));
        debryGroup.add(debry2);
    }

    if(frameCount % 100 === 0 && score === 200 || score > 200 && bug.visible === true){
        debry3 = createSprite(4000, 150, 450, 150);
        debry3.addImage(debryI_2);
        debry3.scale = 0.6;
        debry3.velocityX = -80;
        debry3.lifetime = 200;
        debry3.y = Math.round(random(50, 1230));
        skeldGroup.add(debry3);
    }

    if(frameCount % 100 === 0 ){
        asteriod = createSprite(3000, 150, 50, 50);
        asteriod.addImage(asteriodI);
        asteriod.scale = random(0.9, 0.5);
        asteriod.velocityX = -20;
        asteriod.lifetime = 200;
        asteriod.y = Math.round(random(50, 1230));
        debryGroup.add(asteriod);
    }
}

function spawnDiamonds(){
    if(frameCount % 2000 === 0){
        diamond = createSprite(3000, 150, 50 , 50);
        diamond.addImage(diamondI);
        diamond.velocityX = -50;
        diamond.lifetime = 200;
        diamond.y = Math.round(random(50, 1230));
        diamondGroup.add(diamond);
    }
}

function spawnRubies(){
    if(frameCount % 4000 === 0){
        ruby = createSprite(3000, 150, 50, 50);
        ruby.addImage(rubyI);
        ruby.velocityX = -100;
        ruby.lifetime = 200;
        ruby.y = Math.round(random(50, 1230));
        rubyGroup.add(ruby);
    }
}

function spawnImpostors(){
    if(frameCount % 1000 === 0){
        red = createSprite(3000, 150, 50, 50);
        red.addAnimation("red", redAni);
        red.scale = 1.9;
        red.velocityX = -30;
        red.lifetime = 200;
        red.y = Math.round(random(50, 1230));
        impGroup.add(red);
    }
}