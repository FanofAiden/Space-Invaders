function setup() {
	img = loadImage("background2.png"); //loads the first background (level 1)
	img2 = loadImage("background5.png"); //loads the second background (level 2)
	img5 = loadImage("background6.png");//loads the third background (level 3)
	img3 = loadImage("border.png"); //load the border image for the instructions
	img4 = loadImage("play.png"); //load the play button image
	x = 1400 / 2 //x value of the spaceship
	y = height - 140; //y value of the spaceship
	xW = 120; //value for width of the 2 alien images and the spaceship
	yW = 120; //value for the height of the 2 alien images and the spaceship
	W = 30;//width
	H = 35;//height
	score2 = 0;//for the last score system
	x4 = 1400 / 6.5; //float values for the x location of the "Welcome to Space Invaders"
	y4 = 700 / 2.5; //float values for the y location of the "Welcome to Space Invaders"
	xL = random(1400 - 460); //random location on x scale for purple alien
	yL = 0; //so the purple alien spawns at the top of the screen where y = 0
	xL2 = random(1400 - 460); //random location on x scale for blue alien
	yL2 = 0; //so the blue alien spawns at the top of the screen where y = 0
	createCanvas(1400, 700, P2D);//canvas size, intentional game design
	background(200);//background for outside the game canvas
	spaceShip = loadImage("ship3.png");//load the spaceship
	prplAlien = loadImage("prplalien.png")//load purple alien
	blueAlien = loadImage("bluealien2.png")//load blue alien
	xMove = x + 58;//set the missle on the tip of the ship
	laser = loadSound("2021-03-31 10-27-18.wav"); //audio file for the laser sound
	hitMarker = loadSound("2021-03-31 10-58-21.wav");//audio file for the hitmarker sound on the aliens
	slider = createSlider(0, 0.5, 0.2, 0.01); //allows user to set the volume for laser
	slider2 = createSlider(0, 1, 1, 0.01);//allows user to set the volume for hitmarker sound
}

function draw() { //draw function outputs all the code to create the game
	background(img); //outputting the first background image(level 1)
	startUp();//startup function for the box that holds the instructions
	level2();//level 2 function
	level3();//level 3 function
	if (start == true) { //game begins
	
		laser.setVolume(slider.value()); //slider
		hitMarker.setVolume(slider2.value());//slider 2
		textSize(20);
		y = height - 100;
		spaceship();//allows the spaceship to go off the screen and appear on the other side
		image(spaceShip, x, y, xW, yW); //output spaceship image
		if (start == true) {
			image(prplAlien, xL, yL, xW, yW); //output purple alien image
			image(blueAlien, xL2, yL2, xW, yW); //output blue alien image
		}

		fill(255, 0, 0) //makes the laser red
		moveBullet();//moves laser
		hitAlien(keyPressed); //hits purple alien when W is pressed
		hitAlien2(keyPressed);//hits blue alien when W is pressed
		destroyAlien();//destroys purple alien when the hitAlien function goes through
		destroyAlien2();//destroys blue alien when the hitAlien function goes through
		if (keyIsPressed) {
			keyPressed(); //allows you to use WAD
		}

		if(score<15){
			fill(255);
			text("LEVEL 1",200, 350); //prints the level 1 text when score is less than 15
		}
		yL += 2.5; //speed of purple alien
		yL2 += 2.5; //speed of blue alien
		if (yL > 700 && score > 0) {
			start = true;
			xL = random(1400 - 460); 
			yL = 0;
			lives = lives - 1; //if the purple alien passes the canvas height, -1 life
		}

		if (yL2 > 700 && score > 0) {
			start = true;
			xL2 = random(1400 - 460);
			yL2 = 0;
			lives = lives - 1; //if the blue alien passes the canvas height, -1 life
		}
	} else if (score == 0) {
		start = false //instructions start as false so user and hit enter to play
		image(prplAlien, xL, yL, xW, yW);
		image(blueAlien, xL2, yL2, xW, yW);
		image(img3, 150, 150, 850, 410);
		image(img4, 450, 400, 300, 200);
		textSize(16);
		fill(50, 205, 50);
		text("Welcome to Space Invaders", x4, y4);
		fill(220, 20, 60);
		text("\n HOLD THE AD KEYS TO MOVE side to side and PRESS THE W key to shoot \n Adjust the volume of the sound effects to the right \n The first slider is for the laser and the second is for killing the aliens \n Your last score was: " + score2 + "\n Your high score is: "  + highestScore, 220, 330)
		fill(255);
		text("\n PRESS ENTER TO BEGIN", 220, 480);
	}
	if (lives == 0) { //condition statement
		//textSize(25);
		//start=false;
		//text("Game over \n Try again", x4, y4);//float
		//text("Final Score: " + score,x4, y4+50);
		//noLoop();
		reset(); //resets the game when you lose all lives
	}
	highScore();
	if (score >= 0) {
		fill(255);
		text("score: " + score, 200, 200); //outputs the score
		text("lives: " + lives, 200, 220); //outputs the lives

	}
	function hitAlien(keycode) {
		if (x + W > xL && x < xL && y + H < yL && y < yL && keyCode == 87) { //collision between purple alien and laser
			// yL +=10;

		}
	}

	function hitAlien2(keycode) {
		if (x + W > xL2 && x < xL2 && y + H < yL2 && y < yL2 && keyCode == 87) { //collision between blue alien and laser
			// yL2 +=10;

		}
	}
	// if (((xB >= x2 && xB-x2<=10) || (xB<=x2 && x2-xB<=10))&& ((yB[i] >= y2 && yB[i]-y2<=10) || (yB[i]<=y2 && y2-yB[i]<=10))){
	// x2= -1000;
	// }

	function destroyAlien() { //function to destroy purple alien when the hitAlien function goes through
		for (var i = 0; i < yB.length; i++) {
			if (xMove > xL && yB[i] < yL + 100 && xMove < xL + 100) { 
				xL = random(1400 - 460); //resets the x coordinate of the alien
				yL = 0; //resets the y coordinate of the alien
				score += 1 //adds 1 score when alien is destroyed
				hitMarker.play(); //sound effect is played when the purple alien is destroyed 
			}
		}
	}

	function destroyAlien2() { //function to destroy blue alien when the hitAlien function goes through
		for (var i = 0; i < yB.length; i++) {
			if (xMove > xL2 && yB[i] < yL2 + 100 && xMove < xL2 + 100) {
				xL2 = random(1400 - 460); //resets the x coordinate of the alien
				yL2 = 0; //resets the y coordinate of the alien
				score += 1 //adds 1 score when alien is destroyed

				hitMarker.play(); //sound effect is played when the blue alien is destroyed 
			}
		}
	}

	function spaceship() { //allows the spaceship to move off the right or left side of the canvas and appear on the opposite side
		if (x > 1400) { //when the x value of the spaceship is greater than the canvas size, it sets back to 0
			x = 0
		}
		if (x < 0) { //when the x value of the spaceship is less than the canvas size, it sets to the canvas width max -50 
			x = 1400 - 50
		}

	}

	function level2() { //level 2 function- when the score hits 15; the background changes, the 2 alien speeds increase, the spaceship speed increases to accommodate, the LEVEL 1 text changes to LEVEL 2
		if (score >= 15) {
			background(img2);
			fill(255);
			textSize(25);
			text("LEVEL 2", 200, 350);
			yL += 1.5;
			yL2 += 1.5;
			x += 1
			x -= 1
		}
	}
function level3(){ //level 3 function- when the score hits 30; the background changes, the 2 alien speeds increase
	if (score >= 30){
		background(img5);
		fill(255);
		textSize(25);
		text("LEVEL 3",200,350);
		yL += 0.5;
		yL2 +=0.5;
	}
}
function highScore(){
	if (score > highestScore){//If true/when score is larger than highscore, allows the update
        highestScore = score;//updates the highest score everytime it runs through here
       // print(highestScore); 
	}
}
}