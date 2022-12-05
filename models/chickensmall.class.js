class ChickenSmall extends MovableObject {
  height=50;
  width=50;
  y=378;
  currentImage=0; //Needed for playAnimation()
  energy=5;
  intervalIDmovingtotheLeft; //Needed to clear Intervals
  intervalIDanimate; //Needed to clear Intervals
  
//Reduces the frame around the object according to the offset-values
  offset={
    top: -11,
    bottom:-11,
    left:-11,
    right:-11
  };
//Array that stores the Image-paths of the Images for the ChickenSmall-Object when walking
CHICKENSMALL_WALKING=[
  'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
  'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
  'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
];
//Array that stores the Image-paths of the Images for the ChickenSmall-Object when dead
CHICKENSMALL_DEAD=[
  'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
  'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
];
  

  /**
    * As soon as a ChickenSmall-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
    * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND ChickenSmall is randomly placed into the canvas with random speed
    * AND is 'animated()'
    */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png'); //super()-constructor is needed because ChickenSmall -> MovableObject -> DrawableObject (loadImage() is here!)
    this.loadImages(this.CHICKENSMALL_WALKING); //super() only needed once; paths of CHICKENSMALL_WALKING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.CHICKENSMALL_DEAD); //super() only needed once; paths of CHICKENSMALL_DEAD-Array are stored into the imageCache via loadImages() of DrawableObject
    this.x = 900 + Math.random()*500; //x-value of the chickensmall; Range: 900 to 1400
    this.speed = 0.15 + Math.random()*0.45; //speed-value of the chickensmall; Range: 0.15 to 0.6
    this.animate(); //chickensmall gets animated as soon as it is created
  }


/**
   * Animates the ChickenSmall
   */
 animate() {
  this.animateChickenMovingtotheLeft();
  this.animateChickenDeadOrWalking();
}


/**
  * ChickenSmall is permanently moving left, through x-value gets changed via 'moveLeft()' every 1000/60 Seconds <-> 60 FPS
  */
animateChickenMovingtotheLeft() {
  this.intervalIDmovingtotheLeft = setInterval(() => {
    this.moveLeft();
  }, 1000/60)
  intervalCollection.push(this.intervalIDmovingtotheLeft);
}


/**
  * ChickenSmall is displayed as DEAD or WALKING through its image gets changed via 'playAnimation()' of MovableObject every 125 Milliseconds 
  */
animateChickenDeadOrWalking() {
  this.intervalIDanimate = setInterval(() => {
    // ChickenSmall DEAD
    if (this.isDead()) {
      this.playAnimation(this.CHICKENSMALL_DEAD);
      this.clearingChickenwhenDead();
    }
    // ChickenSmall WALKING
    else {
      this.playAnimation(this.CHICKENSMALL_WALKING);
    }
  }, 125)
  intervalCollection.push(this.intervalIDanimate);
}


/**
* Clears 'intervalIDwalking' of the ChickenSmall-Object so that ChickenSmall is not moving to the left anymore when ChickenSmall is Dead
* THEN removes ChickenSmall from the 'world.level.enemies'-Array via 'clearDeadEnemies()' of MovableObject
* THEN clears 'intervalIDanimate' so that no Images of ChickenSmall are not tryed to be displayed anymore
*/
clearingChickenwhenDead(){
  clearInterval(this.intervalIDmovingtotheLeft);
  this.clearDeadEnemies(this.x); //x-value ensures that the correct ChickenSmall is removed from the 'world.level.enemies'-Array
  
  setTimeout(function () { // Wait 500ms for 'clearDeadEnemies()' to finish, then clear 'intervalIDanimate', because otherwise 'animateChickenDeadOrWalking()' gets executed again & again
    clearInterval(this.intervalIDanimate); 
  }, 500);
}

}