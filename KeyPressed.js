//Using WAD keys to move and shoot
function keyPressed(){
	if (keyCode == 13){	//when the enter button is hit the game begins; 13 = enter
		start = true //game begins
	}
	if (start==true){
   if(keyCode == 68){ //js keycode for D key
	   x+=14; //when it's pressed it moves the spaceship at a speed of 14
		if(fire == false){
			xMove = x+58;//set the missle on the tip of the ship
		}
	 }
	if(keyCode == 65){ //js keycode for A key 
	   x-=14; //when it's pressed it moves the spaceship at a speed of 14
		if(fire == false){
			xMove = x+58;
		}
	 }
	 
	 if(keyCode == 87){ //you don't need to hold the W key to shoot, just press
		  fire = false;
		  for(var i=0;i<numBullets;i++){
		    yB[i] = -10;// and places back on the ship
		  }
	   makeBullet(xMove,height -100); 
		 fire = true;
		 laser.play(); //plays the laser sound effect 
	 }
	}

}