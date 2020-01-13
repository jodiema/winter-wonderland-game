//snowmen
var snowflake_x = [];
var snowflake_y = [];
var snowflake_sc = [];
var num_snowflakes;
//tree variables
var tree_loc = [];
var tree_green = [];
//snowmen variables
var snowX = []; //X location of each snowman
var snowY = []; //Y location of ecah snowman
var dx = []; //horizontal movement of the the snowmen
var dy = []; // verticle movemnent of the snowmen
var num_snowmen; //how many snowmen before the game ends
var scaleSnow; //size of the snowmen
var snowRM; //is the snowman moving right
var snowRM2;
var animate; //do the snowmen move 
var snowR;
var snowR2;
var snow_downCounter; //keeps track of which snowmen is moving down
var snowman_movementAllowed = [];
var counter; //keeps track of the time
//santa variable
//KIMS VAR
var xS, yS; //location of the snowman
var dir; //snowman movement
var scl; //size of the snowmen
var reg;
var movement_allowed;
var sArmR, sArmL;
var sArmRReach, sArmLReach;
var sLegRB, sLegRF, sLegLB, sLegLF;
var sLegRBReach, sLegRFReach, sLegLBReach, sLegLFReach;
var thro;
//candycane variables
var num_canes; 
var cane_loc = []; //tracks the location of the cane
var cane_dy; //speed of the candycane
var cane_count; //which cane is moving
var cane_img0;
var cane_img1;

var cane_color0;
var cane_color1;

var cane_up = []; //controls whether the cane is moving
var throw_allowed;

var seconds;  //tracks how many seconds pass
var points; //how much every snowmen is worth
var game_score; //how many points have been scored = displayed

var santa_lives; //how many lives left in  the game

var startup; //the image is displayed before the start of the game
var info;
var gameLost;
var gameWon;
var reset;

//firework variables

var systems = [];
var launch;
var fire_counter;
var cX,cY;
var fire_color = [];
var system_ok = [];

var losescreen1;
var losescreen2;
var winscreen1;
var winscreen2;
var fontBold;
var intermed;
var move_on;

var shift_image;
var leftarrow_image;
var rightarrow_image;

var frosty;
var poke1;
var poke2;
var wsong;
var lsong;

var pauseCheck;




function preload()
{
	cane_img0 = loadImage("images/candycane.png");
	cane_img1 = loadImage("images/candycane.png");  

	startpage_img = loadImage("images/startup.jpg");
	wonderland_title = loadImage("images/winterwonderland.png");
	losescreen1 = loadImage("images/fire-mountains.jpg")
	losescreen2 = loadImage("images/laughing-snowman-icon.png")
	winscreen1 = loadImage("images/christmas-village-wallpaper.jpg");
   winscreen2 = loadImage("images/cool-santa.png");
   intermed = loadImage("images/startup.jpg")
   shift_image = loadImage("images/computer-key-shift.png");
   leftarrow_image = loadImage("images/computer-key-arrow-left.png");
   rightarrow_image = loadImage("images/computer-key-arrow-right.png");

	wonderland_title.loadPixels();
	losescreen1.loadPixels();
	losescreen2.loadPixels();
	winscreen1.loadPixels();
   winscreen2.loadPixels();
  // cane_img0.loadPixels();
   //cane_img1.loadPixels();

   /*frosty = loadSound('frosty.mp3');
   poke1 = loadSound('BeginingPoke.mp3');
   poke2 = loadSound('EndPoke.mp3');
   wsong = loadSound('WinSong.mp3');
   lsong = loadSound('LoseSong.mp3');*/
}




function setup()
{
	createCanvas(1000,1000);
	background(255);
	frameRate(60);
	colorMode(RGB, 255, 255, 255, 100);	

	fire_counter = 0;

	for (var i=0; i<num_snowmen; i++)
	{
 	  	snowX.push(0);
    	snowY.push(0);
    	dx.push(0);
    	dy.push(0);
    	snowman_movementAllowed.push(false);
   		//snow_downCounter.push(0);
  	}


	initialize();

	updatePixels();


	for(var x=0; x<cane_img0.width; x++)
	{
		for(var y=0; y<cane_img0.height; y++)
		{
			if(red(cane_img0.get(x,y)) > 100 && blue(cane_img0.get(x,y)) < 200)
			{
				cane_img0.set(x,y,[0,90,0,255]);
			}
		}
	}
	/*for(var x=0; x<cane_img1.width; x++)
	{
		for(var y=0; y<cane_img1.height; y++)
		{
			if(red(cane_img1.get(x,y)) > 200 && brightness(cane_img0.get(x,y)) <  98)
			{
				cane_img1.set(x,y,[145,0,0,100]);
			}
		}
	}*/


	losescreen1.updatePixels();
	losescreen2.updatePixels();
	winscreen1.updatePixels();
    winscreen2.updatePixels();
    cane_img0.updatePixels();
    //cane_img1.updatePixels();




	for (var i=0; i<num_snowflakes; i++)
  	 {
  	 	snowflake_x.push(random(100,900));
  	 	snowflake_y.push(random(100,700));
  	 	snowflake_sc.push(random(.3,1))

  	 }

	for (var i=0; i<num_canes; i++)
	{
		cane_loc.push(createVector(500,1500));
	}

	for (var i=0; i<num_snowmen; i++)
	{
 	  	snowX.push(random(111,890));
    	snowY.push(100);
    	dx.push(random(-7,7));
    	dy.push(1.2);
    	snowman_movementAllowed.push(false);
   		//snow_downCounter.push(0);
  	}

	for(var x=30; x<230; x+=25)
	{
		for(var y=25; y<400; y+=50)
		{
			tree_loc.push(createVector(x+random(-10, 10),y+random(-10,10)));
			tree_green.push(random(50, 200));
		}
	}

	for(var x=570; x<770; x+=25)
	{
		for(var y=25; y<400; y+=50)
		{
			tree_loc.push(createVector(x+random(-10, 10), y+random(-10,10)));
			tree_green.push(random(50, 200));
		}
	}

}
function draw()
{
	//var howmanysnwmn = 1;

	//game background
	noStroke();
	fill(255);
	rect(100,100,800,600);

	snowman_movementAllowed[snow_downCounter] = true;

   if (animate)
   {
      moveSnow();
   }

	push();
	translate(100,100);
	for(var i=0; i<tree_loc.length; i++)
	{
		drawTree(tree_loc[i].x,tree_loc[i].y,tree_green[i],2);
	}
	pop();

	if(startup == false && info == false)
	{

		for (var i=0; i<snow_downCounter; i++)
		{
			if(snowman_movementAllowed[i])
			{
   				drawSnowman(snowX[i],snowY[i],scaleSnow);

		   		snowX[i] += dx[i];
		   		snowY[i] += dy[i];

		   		/*if(seconds%20 == 0)
 		  		dx[i] += .001;
   				dy[i] += .001;*/
   			}	

    		if (snowX[i] >= 890 || snowX[i] < 110)
    		{
        		dx[i] = -dx[i];
        		//snow_downCounter[i]++

      		}
    	}
   


   		if(counter%100 == 0)
   		snow_downCounter+=1;


	   	//if(snow_downCounter%6 == 0)
   		//	howmanysnwmn+=3;

   		counter++;
	}

	  
   	image(cane_img0,cane_loc[0].x,cane_loc[0].y);
	image(cane_img1,cane_loc[1].x,cane_loc[1].y);


//KIMS CODE
	if (dir == true && reg == false && thro == false)
	{
		drawSantaL(xS, yS, scl);
	}
	else if (dir == false && reg == false && thro == false)
	{
		drawSantaR(xS, yS, scl);
	}
	else if (reg == true)
	{
		drawSantaB(xS, yS, scl);
	}
	else if (thro == true)
	{
		drawSantaT(xS,yS,scl);
		thro = false;
		movemnent_allowed = true;
	}


	//run the firework systems
	for(var i=0; i<fire_counter; i++)
   	{
      if(system_ok[i])
      systems[i].run();
    }	


	moveSanta();
	keyDown(); 
	//keyTyped();
	candyCane_Shooter();
	gameStatus();
	hitting_a_snowman(snow_downCounter);


	draw_arcadeMachine();


	seconds++;

	push();
		stroke(255);
		textSize(25);
		textSize(BOLD);
		fill(0);
		text("SCORE:  " + game_score,800,620);
	pop();

	if(startup == false && info == false && gameWon == false && gameLost == false)
	{
		if(pauseCheck == false)
			drawPause(850,150);
		else
			drawPlay(850,150);
	}

	for(x=100; x<900; x+=10)
	{
		fill(0);
		rect(x,685,5,2);
	}
	if(startup)
	{
		start_page();
	}

	if(info)
	{
		intermed_page();
	}

	if(gameWon)
	{
		winner();
	}

	if(gameLost)
	{
		loser();
	}


}


function mouseClicked()
{
	if(mouseX > 500 - textWidth("START") / 2 && mouseX < 500 + textWidth("START") / 2 && mouseY > 420 && mouseY < 480 && startup == true && info == false)
	{
		info = true;
		startup = false;
		redraw();
		move_on++;

	}

	if(gameLost || gameWon)
	{
		initialize();
		loop();
	}

	if(info && startup == false)
	{
		move_on++;

		if(move_on == 3)
		{
		info = false;
		redraw();
		
		}
	}

	 if (impl_circ(850, 150, 20, mouseX, mouseY) <= 0 && startup == false && info == false && gameWon == false && gameLost == false)
   {
      if (pauseCheck == false)
      {
         noLoop();
         //drawPlay(700, 100);
         pauseCheck = true;
      }
      else if (pauseCheck == true)
      {
         loop();
         //drawPause(700, 100);
         pauseCheck = false;
      }
   }

}

function impl_circ(cx, cy, radi, in_x, in_y)
{
	return ( (in_x-cx)*(in_x-cx) + (in_y-cy)*(in_y-cy) - radi*radi);
}

function drawTree(x, y, green, sc)
{
	noStroke();
	push();
		translate(x, y);
		scale(sc);
		fill(0, 0, 0);
		rect(-2, 2, 4, 25);
		fill(0, green, 0);
		triangle(0, 0, 10, 10, -10, 10);
		triangle(0, 5, 10, 15, -10, 15);
		triangle(0, 10, 10, 20, -10, 20);
	pop();
}

function draw_arcadeMachine()
{
	noStroke();
	fill(60,70,255);
	//rect(60,60,880,680);
	fill(255);
	//rect(100,100,800,600);

	// square screen boarder
	fill(60,70,255);
	//top
	beginShape();
		vertex(60,60);
		vertex(940,60);
		vertex(940,100);
		vertex(60,100);
	endShape();
	//right
	beginShape();
		vertex(900,60);
		vertex(940,60);
		vertex(940,740);
		vertex(900,740);
	endShape();
	//bottom
	beginShape();
		vertex(940,700);
		vertex(940,740);
		vertex(60,740);
		vertex(60,700);
	endShape();
	//left
	beginShape();
		vertex(100,740);
		vertex(60,740);
		vertex(60,60);
		vertex(100,60);
	endShape();

	noStroke();
	fill(255);
	rect(0,0,1000,60);

	stroke(0);
	strokeWeight(0.5);

	line(60,60,100,100);
	line(940,60,900,100);
	line(940,740,900,700);
	line(60,740,100,700);

	fill(60,70,255);

	beginShape();
		vertex(60,740);
		vertex(940,740);
		vertex(1000,850);
		vertex(0,850);
	endShape();

	beginShape();
		vertex(0,850);
		vertex(1000,850);
		vertex(1000,1000);
		vertex(0,1000);
	endShape();

	stroke(0);
	strokeWeight(2);
	//joystickL
	fill(0);
	ellipse(150,795,50,20);
	fill(150);
	rect(147,730,6,65);
	fill(255,0,0);
	ellipse(150, 730,60);

	//buttonsL
	fill(255,0,0);
	ellipse(260,820,50,20);
	ellipse(260,807.5,40,10);
	line(260-20,820,260-20,807.5);
	line(260+20,820,260+20,807.5);

	ellipse(330,820,50,20);
	ellipse(330,807.5,40,10);
	line(330-20,820,330-20,807.5);
	line(330+20,820,330+20,807.5);

	ellipse(400,820,50,20);
	ellipse(400,807.5,40,10);
	line(400-20,820,400-20,807.5);
	line(400+20,820,400+20,807.5);

	ellipse(260-30,770,50,20);
	ellipse(260-30,757.5,40,10);
	line(260-50,770,260-50,757.5);
	line(260-10,770,260-10,757.5);

	ellipse(330-30,770,50,20);
	ellipse(330-30,757.5,40,10);
	line(330-50,770,330-50,757.5);
	line(330-10,770,330-10,757.5);

	ellipse(400-30,770,50,20);
	ellipse(400-30,757.5,40,10);
	line(400-50,770,400-50,757.5);
	line(400-10,770,400-10,757.5);

	push();
		translate(440,0)
		//joystickR
		stroke(0);
		strokeWeight(2);
		fill(0);
		ellipse(150,795,50,20);
		fill(150);
		rect(147,730,6,65);
		fill(255,0,0);
		ellipse(150,730,60);

		//buttonsR
		fill(255,0,0);
		ellipse(260,820,50,20);
		ellipse(260,807.5,40,10);
		line(260-20,820,260-20,807.5);
		line(260+20,820,260+20,807.5);	

		ellipse(330,820,50,20);
		ellipse(330,807.5,40,10);
		line(330-20,820,330-20,807.5);
		line(330+20,820,330+20,807.5);	

		ellipse(400,820,50,20);
		ellipse(400,807.5,40,10);
		line(400-20,820,400-20,807.5);
		line(400+20,820,400+20,807.5);

		ellipse(260-30,770,50,20);
		ellipse(260-30,757.5,40,10);
		line(260-50,770,260-50,757.5);
		line(260-10,770,260-10,757.5);

		ellipse(330-30,770,50,20);
		ellipse(330-30,757.5,40,10);
		line(330-50,770,330-50,757.5);
		line(330-10,770,330-10,757.5);

		ellipse(400-30,770,50,20);
		ellipse(400-30,757.5,40,10);
		line(400-50,770,400-50,757.5);
		line(400-10,770,400-10,757.5);
	pop();

}

function drawSnowman(x, y, sc){
   
    push();
 	
 	translate(x,y);
 	scale(sc);

 	// arms 
 	 stroke(158,95,0);
 	 strokeWeight(4);
    push();
      translate(66,-35);
      rotate(snowR2);
 	    line(0, 0, 79, -45);
 	    line(79,-45,74,-73);
 	    line(79,-45,104,-65);
 	    line(79,-45,106,-40);
    pop();
 	 
   push();
    translate(-70,-30); 
    rotate(snowR);
    line(0,0,-75,-50);
 	  line(-75,-50,-70,-75);
 	  line(-75,-50,-90,-75);
 	  line(-75,-50,-100,-50);
   pop();
 	strokeWeight(1);
 	stroke(0);

 	fill(255);
 	// body
 	ellipse(0,160,220,210);
 	ellipse(0,15,180,170);
 	
 	// scarf/head
 	//ellipse(300,270,150,38);
 	ellipse(0,-130,150);
 	noStroke();

 	//rect(249,255,102,30);
 	fill(200,20,44);
 	arc(-51,-60,30,30,HALF_PI,3*HALF_PI);
 	arc(51,-60,30,30,-HALF_PI,-3*HALF_PI);
 	fill(58,180,36);
 	rect(-51,-75,20,30);
 	fill(200,20,44);
 	rect(-31,-75,20,30);
 	fill(58,180,36);
 	rect(-11,-75,20,30);
 	fill(200,20,44);
 	rect(9,-75,20,30);
 	fill(58,180,36);
	rect(29,-75,22,30);
 	
 	 	
 	fill(58,180,36);
 	rect(18,-45,30,90);
 	fill(200,20,44);
 	rect(18,-45,30,20);
 	fill(58,180,36);
 	rect(18,-25,30,20);
 	fill(200,20,44);
 	rect(18,-5,30,20);
 	fill(58,180,36);
 	rect(18,15,30,20);
 	fill(200,20,44);
 	rect(18,35,30,10);
 	
 	fill(200,20,44);
 	rect(10,-75,30,100);
 	fill(58,180,36);
 	rect(10,-45,30,20);
 	fill(200,20,44);
 	rect(10,-25,30,20);
 	fill(58,180,36);
 	rect(10,-5,30,20);
 	fill(200,20,44);
 	rect(10,15,30,20);
 	fill(58,180,36);
 	rect(10,35,30,20);
 	
 	// eyes
 	fill(255,0,0);
 	ellipse(-22,-145,15,22);
 	ellipse(22,-145,15,22);
 	/*fill(255);
 	ellipse(-22,-149,5,8);
 	ellipse(22,-149,5,8);*/

 	triangle(-29,-147,-23,-147,-27,-162);
 	triangle(-27,-147,-18,-147,-22,-167);
 	triangle(-22,-147,-15,-147,-17,-162);

 	triangle(15,-147,21,-147,17,-162);
 	triangle(17,-147,26,-147,22,-167);
 	triangle(22,-147,29,-147,27,-162);

 	 //eyebrow
   stroke(0);
   strokeWeight(10);
   line(-40,-180,-12,-164);
   line(10,-164,38,-180);
   noStroke();
 	
 	// nose
 	fill(255,134,68);
 	ellipse(0,-120,10,20);
 	triangle(0,-130,0,-110,50,-125);
 	
 	// mouth
 	fill(0);
 	ellipse(-35,-100,5);
 	ellipse(-30,-95,5);
 	ellipse(-24,-90,5);
 	ellipse(-18,-87,5);
 	ellipse(-12,-86,5);
 	ellipse(-6,-85,5);
 	ellipse(0,-85,5);
 	ellipse(6,-85,5);
 	ellipse(12,-86,5);
 	ellipse(18,-88,5);
 	ellipse(24,-90,5);
 	ellipse(30,-94,5);
 	ellipse(35,-100,5);
 	
 	// hat 
 	fill(38,43,46);
 	ellipse(0,-190,160,30);
 	rect(-50,-290,100,100);
 	fill(255,0,0);
 	rect(-51,-215,102,25);
 	
 	// buttons
 	fill(0);
 	ellipse(0,-30,10);
 	ellipse(0,0,10);
 	ellipse(0,30,10);
 	noFill();

   pop();

 }

 function moveSnow()
 {
    
   if (snowRM == true) 
   {
      snowR -= .07;
   } 
   else 
   {
      snowR += .07;
   }

   if (snowR < -1) 
   {
      snowRM = false;
   } 
   if (snowR > 0.2) 
   {
      snowRM = true;
   }

   if (snowRM2 == true) 
   {
      snowR2 -= .08
   } 
   else 
   {
      snowR2 += .08
   }

   if (snowR2 < -.3) 
   {
      snowRM2 = false;
   } 
   if (snowR2 > 1) 
   {
      snowRM2 = true;
   }
}


//KIMS CODE
function drawSantaL(x, y, scl)
{
   push();
      stroke(0);
      translate(x, y);
      scale(scl);

      /*//leg behind body
      fill(255, 0, 0);
      ellipse(-5, 115, 25, 60);*/

      //leg behind body
      push();
         fill(255, 0, 0);
         translate(-5, 115);
         rotate(sLegLB);
         translate(0, 7);
         ellipse(0, 0, 25, 60);
         fill(0);
         ellipse(-7, 30, 20, 9);
      pop();

      //body
      fill(255, 0, 0);
      ellipse(0, 60, 60, 100);

      //belt
      fill(0);
      rect(-30, 70, 58, 11);

      //face
      fill(248, 224, 203);
      ellipse(0, 0, 60); 

      //hat
      fill(255, 0, 0);
      triangle(-30, -25, 0, -80, 30, -25); 
      triangle(0, -80, 12, -85, 3, -73);
      fill(255);
      rect(-30, -35, 60, 15);
      ellipse(12, -85, 10);

      /*//legs
      fill(255, 0, 0);
      ellipse(5, 115, 25, 60);*/

      //legs
      push();
         fill(255, 0, 0);
         translate(5, 115);
         rotate(sLegLF);
         translate(0, 7);
         ellipse(0, 0, 25, 60);
         fill(0);
         ellipse(-7, 30, 20, 9);
      pop();

      //arms
      push();
         fill(255, 0, 0);
         translate(15, 60);
         rotate(sArmL);
         translate(0, 7);
         ellipse(0, 0, 20, 55);
         fill(0);
         ellipse(0, 30, 15);
         fill(255);
         rect(-10, 20, 19, 7);
      pop();

      //eyes
      fill(0);
      ellipse(-20, 0, 10);
      fill(255);
      ellipse(-22, 0, 7);

      //eyebrows
      fill(255);
      push();
         translate(-20, -7);
         rotate(PI/6);
         ellipse(0, 0, 20, 7);
      pop();

      //beard
      fill(255);
      beginShape();
         vertex(20, -10);
         vertex(5, 10);
         vertex(-30, 10);
         vertex(-39, 37);
         vertex(15, 20);
      endShape(CLOSE);

      //nose
      fill(248, 224, 203);
      ellipse(-30, 7, 8);
   pop();
}

function drawSantaR(x, y, scl)
{
   push();
      stroke(0);
      translate(x, y);
      scale(scl);

      //leg behind body
      push();
         fill(255, 0, 0);
         translate(5, 115);
         rotate(sLegRB);
         translate(0, 7);
         ellipse(0, 0, 25, 60);
         fill(0);
         ellipse(7, 30, 20, 9);
      pop();

      //body
      fill(255, 0, 0);
      ellipse(0, 60, 60, 100);

      //belt
      fill(0);
      rect(-30, 70, 58, 11);

      //face
      fill(248, 224, 203);
      ellipse(0, 0, 60); 

      //hat
      fill(255, 0, 0);
      triangle(-30, -25, 0, -80, 30, -25); 
      triangle(0, -80, -12, -85, -3, -73);
      fill(255);
      rect(-30, -35, 60, 15);
      ellipse(-12, -85, 10);

      //legs
      push();
         fill(255, 0, 0);
         translate(-5, 115);
         rotate(sLegRF);
         translate(0, 7);
         ellipse(0, 0, 25, 60);
         fill(0);
         ellipse(7, 30, 20, 9);
      pop();

      //arms
      push();
         fill(255, 0, 0);
         translate(-15, 60);
         rotate(sArmR);
         translate(0, 7);
         ellipse(0, 0, 20, 55);
         fill(0);
         ellipse(0, 30, 15);
         fill(255);
         rect(-10, 20, 19, 7);
      pop();

      //eyes
      fill(0);
      ellipse(20, 0, 10);
      fill(255);
      ellipse(22, 0, 7);

      //eyebrows
      fill(255);
      push();
         translate(20, -7);
         rotate(-PI/6);
         ellipse(0, 0, 20, 7);
      pop();

      //beard
      fill(255);
      beginShape();
         vertex(-20, -10);
         vertex(-5, 10);
         vertex(30, 10);
         vertex(39, 37);
         vertex(-15, 20);
      endShape(CLOSE);

      //nose
      fill(248, 224, 203);
      ellipse(30, 7, 8);


   pop();
}
   

function drawSantaB(x, y, scl)
{
   push();  
      stroke(0);
      translate(x, y);
      scale(scl);

      //leg behind body
      fill(255, 0, 0);
      ellipse(10, 115, 15, 60);
      ellipse(-10, 115, 15, 60);

      //shoes
      fill(0);
      ellipse(10, 147, 10, 7);
      ellipse(-10, 147, 10, 7);

      //arms
      fill(255, 0, 0);
      ellipse(-25, 60, 20, 55);
      ellipse(25, 60, 20, 55);
      fill(0);
      ellipse(-25, 90, 15);
      ellipse(25, 90, 15);
      //arm sleeve
      fill(255);
      rect(-35, 80, 19, 7);
      rect(15, 80, 19, 7);

      //body
      fill(255, 0, 0);
      ellipse(0, 60, 55, 100);

      //belt
      fill(0);
      rect(-27, 70, 53, 11);

      //face
      fill(248, 224, 203);
      ellipse(0, 0, 60); 

      /*//beard
      fill(255);
      triangle(-30, 5, -25, 0, -28, 10);
      triangle(30, 5, 25, 0, 28, 10);*/

      //hat
      fill(255, 0, 0);
      triangle(-30, -25, 0, -80, 30, -25); 
      triangle(0, -80, 12, -85, 3, -73);

      fill(255);
      //rect(-30, -35, 60, 15);
      ellipse(0, -15, 65, 25);
      ellipse(12, -85, 10);
      fill(255, 0, 0);
      noStroke();
      ellipse(0, -23, 61, 25);
      stroke(0);
   pop();
   
}

function drawSantaT(x, y, scl)
{
   push();  
      stroke(0);
      translate(x, y);
      scale(scl);

      //leg behind body
      fill(255, 0, 0);
      ellipse(10, 115, 15, 60);
      ellipse(-10, 115, 15, 60);

      //shoes
      fill(0);
      ellipse(10, 147, 10, 7);
      ellipse(-10, 147, 10, 7);

      //arms
      fill(255, 0, 0);
      ellipse(-25, 60, 20, 55);
      fill(0);
      ellipse(-25, 90, 15);
      push();
         rotate(-2*PI/5);
         fill(255, 0, 0);
         ellipse(0, 35, 55, 20);
         fill(0);
         ellipse(30, 35, 15);
         fill(255);
         rect(15, 25, 7, 19);
      pop();
      //arm sleeve
      fill(255);
      rect(-35, 80, 19, 7);

      //body
      fill(255, 0, 0);
      ellipse(0, 60, 55, 100);

      //belt
      fill(0);
      rect(-27, 70, 53, 11);

      //face
      fill(248, 224, 203);
      ellipse(0, 0, 60); 

      //hat
      fill(255, 0, 0);
      triangle(-30, -25, 0, -80, 30, -25); 
      triangle(0, -80, 12, -85, 3, -73);

      fill(255);
      //rect(-30, -35, 60, 15);
      ellipse(0, -15, 65, 25);
      ellipse(12, -85, 10);
      fill(255, 0, 0);
      noStroke();
      ellipse(0, -23, 61, 25);
      stroke(0);
   pop();
}


function moveSanta()
{
   //Santa's Moving Right hand
   if (sArmR > .7)
   {
      sArmRReach = true;
   }
   if (sArmR < -.7)
   {
      sArmRReach = false;
   }

   if (sArmRReach == false)
   {
      sArmR += .09;
   }
   else
   {
      sArmR -= .09;
   }

   //Santa's Moving Right behind leg
   if (sLegRB > .6)
   {
      sLegRBReach = true;
   }
   if (sLegRB < -.6)
   {
      sLegRBReach = false;
   }

   if (sLegRBReach == false)
   {
      sLegRB += .09;
   }
   else
   {
      sLegRB -= .09;
   }

   //Santa's Moving Right front leg
   if (sLegRF > .6)
   {
      sLegRFReach = true;
   }
   if (sLegRF < -.6)
   {
      sLegRFReach = false;
   }

   if (sLegRFReach == false)
   {
      sLegRF += .09;
   }
   else
   {
      sLegRF -= .09;
   }

   //Santa's Moving Left hand
   if (sArmL > .7)
   {
      sArmLReach = true;
   }
   if (sArmL < -.7)
   {
      sArmLReach = false;
   }

   if (sArmLReach == false)
   {
      sArmL += .09;
   }
   else
   {
      sArmL -= .09;
   }

   //Santa's Moving Left behind leg
   if (sLegLB > .6)
   {
      sLegLBReach = true;
   }
   if (sLegLB < -.6)
   {
      sLegLBReach = false;
   }

   if (sLegLBReach == false)
   {
      sLegLB += .09;
   }
   else
   {
      sLegLB -= .09;
   }

   //Santa's Moving Left front leg
   if (sLegLF > .6)
   {
      sLegLFReach = true;
   }
   if (sLegLF < -.6)
   {
      sLegLFReach = false;
   }

   if (sLegLFReach == false)
   {
      sLegLF += .09;
   }
   else
   {
      sLegLF -= .09;
   }
}

function keyDown()
{
	if(movement_allowed)
	{
		if (keyIsDown(LEFT_ARROW) && xS > 120 && xS < 880)
		{
			xS -= 5;
			dir = true;
			reg = false;
		}
		else if (keyIsDown(RIGHT_ARROW) && xS > 120 && xS < 880)
		{
			xS += 5;
			dir = false;
			reg = false;
		}
		else if (xS == 880)
		{
			xS = 880-5;
			dir = false;
			reg = false;
		}
		else if (xS == 120)
		{
			xS = 125;
			dir = true;
			reg = false;
		}
		else
		{
			reg = true;	
		}
	}

	if(keyIsDown(SHIFT) && throw_allowed && cane_count < 2 && cane_up[cane_count] == false)
	{
		thro = true;
		reg = false;
		

		cane_loc[cane_count].x = xS;
		cane_loc[cane_count].y = yS-45;

		cane_up[cane_count] = true;
	}
}

function keyReleased() 
{
	if(keyCode === UP_ARROW && throw_allowed == false)
	{
		throw_allowed = true;
		
		if(second%2 == 0)
		{
			throw_allowed = false;
			movement_allowed = true;
		}
	}
}


function candyCane_Shooter()
{
	if(cane_up[0])
	{
		cane_loc[0].y += cane_dy;
	}

	else if(cane_up[1])
	{
		cane_loc[1].y += cane_dy;
	}

	else if(cane_up[2])
	{
		cane_loc[2].y += cane_dy;
	}

	if(cane_loc[0].y < 40)
	{
		cane_loc[0].y = 1500;
		cane_up[0] = false;
		if(cane_count == 0)
			cane_count = 1;
		else
			cane_count = 0;
	}

	if(cane_loc[1].y < 40)
	{
		cane_loc[1].y = 1500;
		cane_up[1] = false;
		if(cane_count == 0)
			cane_count = 1;
		else
			cane_count = 0;
	}

	
/*	if(cane_count > 1)
	{
		cane_count = 0;
	}*/
}

function hitting_a_snowman(identity_of_snowman)
{
	for(var i=0; i<identity_of_snowman; i++)
	{
		if(cane_loc[cane_count].y <= snowY[i] + 35.25 && cane_loc[cane_count].y >= snowY[i] - 35.25)
		{
			if(cane_loc[cane_count].x <= snowX[i] + 16.5 && cane_loc[cane_count].x >= snowX[i] - 16.5)
			{
				cane_up[cane_count] = false;
				cane_loc[cane_count].y = 1500;
				game_score += points;

				//set off firework
				systems.push(new PSys(snowX[i], snowY[i], 20));
				system_ok.push(true);
				fire_counter++;

				snowY[i] = 0;
				snowX[i] = random(150,850);
				snowman_movementAllowed[i] = false;

				if(cane_count == 0)
					cane_count = 1;
				else
					cane_count = 0;
			}
		}

		if(cane_loc[cane_count].y + 50 <= snowY[i] + 35.25 && cane_loc[cane_count].y + 50 >= snowY[i] - 35.25)
		{
			if(cane_loc[cane_count].x <= snowX[i] + 16.5 && cane_loc[cane_count].x >= snowX[i] - 16.5)
			{
				
				cane_up[cane_count] = false;
				cane_loc[cane_count].y = 1500;
				game_score += points;

				//set off firework
				systems.push(new PSys(snowX[i], snowY[i], 20));
				system_ok.push(true);
				fire_counter++;

				snowY[i] = 2000;
				snowman_movementAllowed[i] = false;

				if(cane_count == 0)
					cane_count = 1;
				else
					cane_count = 0;
			}
		}

		if(cane_loc[cane_count].y <= snowY[i] + 35.25 && cane_loc[cane_count].y >= snowY[i] - 35.25)
		{
			if(cane_loc[cane_count].x + 10 <= snowX[i] + 16.5 && cane_loc[cane_count].x + 10 >= snowX[i] - 16.5)
			{
				
				cane_up[cane_count] = false;
				cane_loc[cane_count].y = 1500;
				game_score += points;

				//set off firework
				systems.push(new PSys(snowX[i], snowY[i], 20));
				system_ok.push(true);
				fire_counter++;

				snowY[i] = 2000;
				snowman_movementAllowed[i] = false;

				if(cane_count == 0)
					cane_count = 1;
				else
					cane_count = 0;
			}
		} 

		if(cane_loc[cane_count].y + 40 <= snowY[i] + 35.25 && cane_loc[cane_count].y + 40 >= snowY[i] - 35.25)
		{
			if(cane_loc[cane_count].x + 27 <= snowX[i] + 16.5 && cane_loc[cane_count].x + 27 >= snowX[i] - 16.5)
			{
				
				cane_up[cane_count] = false;
				cane_loc[cane_count].y = 1500;
				game_score += points;

				//set off firework
				systems.push(new PSys(snowX[i], snowY[i], 20));
				system_ok.push(true);
				fire_counter++;

				snowY[i] = 2000;
				snowman_movementAllowed[i] = false;

				if(cane_count == 0)
					cane_count = 1;
				else
					cane_count = 0;
			}
		}


	}
}

function gameStatus()
{
	stroke(0);

	for(var i=0; i<snow_downCounter; i++)
	{
		if(snowY[i] + 35.25 > 685 && snowY[i] < 1000)
		{
			santa_lives--;
			snowY[i] = 1500;
		}
	}

	//1st hat
	if(santa_lives >= 1)
	{
	push();
	translate(840,680);
	scale(.50);
	fill(255, 0, 0);
	triangle(-30, -25, 0, -80, 30, -25); 
	triangle(0, -80, 12, -85, 3, -73);
	fill(255);
	rect(-30, -35, 60, 15);
	ellipse(12, -85, 10);
	pop();
	}	

	if(santa_lives >= 2)
	//2nd hat
	{
	push();
	translate(800,680);
	scale(.50);
	fill(255, 0, 0);
	triangle(-30, -25, 0, -80, 30, -25); 
	triangle(0, -80, 12, -85, 3, -73);
	fill(255);
	rect(-30, -35, 60, 15);
	ellipse(12, -85, 10);
	pop();
	}

	//3rd hat
	if(santa_lives == 3)
	{
	push();
	translate(760,680);
	scale(.50);
	fill(255, 0, 0);
	triangle(-30, -25, 0, -80, 30, -25); 
	triangle(0, -80, 12, -85, 3, -73);
	fill(255);
	rect(-30, -35, 60, 15);
	ellipse(12, -85, 10);
	pop();
	}

	if(santa_lives < 1)
	{
		gameLost = true;
	}

	if (game_score >= 2000)
	{
		gameWon = true;
	}
}

function Particle(x , y) 
{
   this.accelY = 0.1; //gravity
   this.velX = random(-1, 1);
   this.velY = random(-1, -3);
   this.pcolor = color(255, random(255), 0);
   this.locX = x;
   this.locY = y;
   this.r = 2.0;
   this.rx = -0.05;
   this.life = 30;
  
   this.updateP = function()
   {
      if(this.r >= 0)
      {
      this.velY += this.accelY;
      this.locX += this.velX;
      this.locY += this.velY;
      if(this.r>0 && this.life<1)
      this.r += this.rx;

      this.life -= 2.0;
  	  }
   };
  
   this.renderP = function() 
   {
      if(this.r >= 0)
      {
      noStroke();
      push();         
         fill(this.pcolor);
         translate(this.locX, this.locY);
         drawSnowFlake(0,0,this.r,random(255));
      pop();
  	  }
   };
}

function PSys(sX, sY, num)
{
   this.particles = [];
   for (var i=0; i < num; i++) 
   {
      this.particles.push(new Particle(sX, sY));
   }
  
   this.run = function() 
   {
      for (var i=0; i < this.particles.length; i++) 
      {
         this.particles[i].updateP();
         this.particles[i].renderP();
      }
   }
	
}


function drawSnowFlake( x , y , s_sc , tp)
{
	push();
     	stroke(255,255,255,tp);
     	strokeWeight(3);
     	translate(x,y);
     	scale(s_sc);
     	rotate(0);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	rotate(PI/3);
     	line(-8,0,8,0);
     	
     	stroke(0,0,0,tp);
     	strokeWeight(.5);
     	rotate(PI/3);
     	line(-7,0,7,0);
     	line(4,0,6,-2);
     	line(4,0,6,2);
     	line(-4,0,-6,-2);
     	line(-4,0,-6,2);
     	rotate(PI/3);
     	line(-7,0,7,0);
     	line(4,0,6,-2);
     	line(4,0,6,2);
     	line(-4,0,-6,-2);
     	line(-4,0,-6,2);
     	rotate(PI/3);
     	line(-7,0,7,0);
     	line(4,0,6,-2);
     	line(4,0,6,2);
     	line(-4,0,-6,-2);
     	line(-4,0,-6,2);
	 pop();
}

function ran_color()
	{
		return color(random(255),random(255),random(255));
	}

function drawPause(x, y)
{
   push();
      strokeWeight(5);
      stroke(70);
      fill(255);
      ellipse(x, y, 35); //600, 150
      strokeWeight(1);
      fill(70);
      rect(x-7.5, y-8, 4, 15);
      rect(x+2.5, y-8, 4, 15);
   pop();
}

function drawPlay(x, y)
{
   push();
      strokeWeight(5);
      stroke(70);
      fill(255);
      ellipse(x, y, 35); //600, 150
      strokeWeight(1);
      fill(70);
      triangle(x-5, y+7, x-5, y-7, x+7, y);
   pop();
}
function loser()
{
	image(losescreen1, 100, 100);
	image(losescreen2, width/2-losescreen2.width/2, 100 + 600/2-(losescreen2.height/2));

	fill(255, 108, 41);
	strokeWeight(4);
	stroke(0);
	textAlign(CENTER);
	textSize(70);
	textFont("Times New Roman");
	text("The village was destroyed!", 500, 400);
	textSize(30);

	strokeWeight(2);
	text("Click anywhere to restart", 500, 675);
	noLoop();
}

function winner()
{
	image(winscreen1, 100, 100); //width/2-(winscreen1.width/2)
	image(winscreen2, 575, 170); //height/2-(winscreen2.width/2) //

    fill(100, 225, 50);
    strokeWeight(5);
    textSize(70);
    textAlign(CENTER);
    textFont("Times New Roman");
    text("The village was saved!", 150, 180, 500);
    textSize(30);
    text("Click anywhere to restart", 500, 675);
    noLoop();
}

function start_page()
{
	image(startpage_img,100,100);

	for (var i = 0; i < num_snowflakes; i++)
	{
		drawSnowFlake(snowflake_x[i], snowflake_y[i], snowflake_sc[i], random(0,255));
		
		snowflake_y[i] += random(.1,1);
		snowflake_x[i] += random(.5,2);
		
		if (snowflake_y[i] + 8 >= 700 || snowflake_x[i] + 8 >= 900 )
		{
			snowflake_x[i] = random(100,900);
			snowflake_y[i] = random(100,700);
		}

	}

	image(wonderland_title,250,200);
	fill(255);
	textFont("Times New Roman");
	textSize(60);
	textAlign(CENTER);
	text("START",500,480);

}

function intermed_page()
{	
	push();
	imageMode(CENTER);
	image(intermed, 500, 400);

	for (var i = 0; i < num_snowflakes; i++)
		{
  			drawSnowFlake(snowflake_x[i], snowflake_y[i], snowflake_sc[i], random(0,255));
		
			snowflake_y[i] += random(.1,1);
			snowflake_x[i] += random(.5,2);
		
				if (snowflake_y[i] + 8 >= 700 || snowflake_x[i] + 8 >= 900 )
				{
					snowflake_x[i] = random(100,900);
					snowflake_y[i] = random(100,700);
				}
		}
	
	
	textAlign(CENTER);
	textSize(30);
	textFont("Times New Roman");
	fill(0);
	text("CLICK ANYWHERE TO BEGIN SAVING THE TOWN", 500, 150);
	fill(255, 0, 0);
	line(500-textWidth("Frantic for help, the villagers called for Santa Claus!")/2,360,500+textWidth("Frantic for help, the villagers called for Santa Claus!")/2,360)
	text("On one snowy morning in Wonderland Village,", 500, 220);
	text("the villagers were living peacefully.", 500, 250);
	text("SUDDENLY, the evil snowmen came to attack!", 500, 280);
	text("Frantic for help, the villagers called for Santa Claus!", 500, 310);
	text("Now, Santa Claus must go save the village!", 500, 340);

	textSize(25);
	fill(0,100,0);
	image(shift_image,500,420);
	text("Shoot Candy Cane",500,480);

	image(rightarrow_image,260,420);
	text("Move Santa Right",260,480);

	image(leftarrow_image,740,420);
	text("Move Santa Left",740,480);
	pop();
}

function initialize()
{
num_snowflakes = 200;
num_snowmen = 1000;
scaleSnow = 0.15;
snowRM = false;
snowRM2 = false;
animate = true;
snowR = 0;
snowR2 = 0;
snow_downCounter = 0;
counter = 600;
movement_allowed = true;
num_canes = 2;
cane_dy = -9;
cane_count = 0;
cane_count2 = 0;
cane_up = [false,false];
throw_allowed = true;
seconds = 0;
points = 100;
game_score = 0;
santa_lives = 3;
startup = true;
info = false;
gameLost = false;
gameWon = false;
xS = 500;  //sets the initial location for santa
yS = 614;
dir = true; //which side of santa to draw
scl = .40; //size of santa
reg = true;
sArmR = 0;
sArmL = 0;
sLegRB = 0;
sLegRF = 0;
sLegLB = 0;
sLegLF = 0;
sArmRReach = false;
sArmLReach = false;
sLegRBReach = false;
sLegRFReach = true;
sLegLBReach = true;
sLegLFReach  = false;
thro = false;
	 //firework initialized
launch = false;
move_on = 0;

pauseCheck = false;

for(var i=0; i<num_snowmen; i++)
{
	snowman_movementAllowed[i] = false;
	snowY[i] = 0;
	snowX[i] = random(150,850);
}


reset = false;
}


