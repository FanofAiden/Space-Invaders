let numBullets =1; //number of lasers	
function makeBullet(xB,yStart){
	xMove = xB;
	for(var i=0;i<numBullets;i++){
   ellipse(xB,yB[i],10,40); //laser shape is basically a streched ellipse
	}
}
function moveBullet(){ //function to move the laser
	for(var i=0;i<numBullets;i++){
    ellipse(xMove,yB[i],4,50);
	  if (fire ==true){
		  yB[i]-=i+20;//speed of laser
	  }
	  if((yB[i]<0 && keyCode==87)||(spaceShip==xMove)){ //makes the laser follow the spaceship to shoot the laser wherever the spaceship is 
	    //fire =false;
		  xMove = x+58;
		  yB[i]=height-100;
	 }
	}
}