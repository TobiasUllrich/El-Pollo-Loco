class Chicken extends MovableObject {
  height = 80;
  y = 350;
  currentImage = 0; //Needed for playAnimation()
  energy = 5;
  intervalIDmovingtotheLeft; //Needed to clear Intervals
  intervalIDanimate; //Needed to clear Intervals

  //Reduces the frame around the object according to the offset-values
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  //Array that stores the Image-paths of the Images for the Chicken-Object when walking
  CHICKEN_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  //Array that stores the Image-paths of the Images for the Chicken-Object when dead
  CHICKEN_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];


  /**
    * As soon as a Chicken-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
    * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Chicken is randomly placed into the canvas with random speed
    * AND is 'animated()'
    */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');  //super()-constructor is needed because Chicken -> MovableObject -> DrawableObject (loadImage() is here!)
    this.loadImages(this.CHICKEN_WALKING); //super() only needed once; paths of CHICKEN_WALKING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.CHICKEN_DEAD); //super() only needed once; paths of CHICKEN_DEAD-Array are stored into the imageCache via loadImages() of DrawableObject
    this.x = 500 + Math.random() * 500; //x-value of the chicken; Range: 500 to 1000
    this.speed = 0.15 + Math.random() * 0.45; //speed-value of the chicken; Range: 0.15 to 0.6
    this.animate(); //chickens gets animated as soon as it is created
  }


  /**
   * Animates the Chicken
   */
  animate() {
    this.animateChickenMovingtotheLeft();
    this.animateChickenDeadOrWalking();
  }


  /**
    * Chicken is permanently moving left, through x-value gets changed via 'moveLeft()' every 1000/60 Seconds <-> 60 FPS
    */
  animateChickenMovingtotheLeft() {
    this.intervalIDmovingtotheLeft = setInterval(() => {
      this.moveLeft();
    }, 1000/60)
    intervalCollection.push(this.intervalIDmovingtotheLeft);
  }


  /**
    * Chicken is displayed as DEAD or WALKING through its image gets changed via 'playAnimation()' of MovableObject every 125 Milliseconds 
    */
  animateChickenDeadOrWalking() {
    this.intervalIDanimate = setInterval(() => {
      // Chicken DEAD
      if (this.isDead()) {
        this.playAnimation(this.CHICKEN_DEAD);
        this.clearingChickenwhenDead();
      }
      // Chicken WALKING
      else {
        this.playAnimation(this.CHICKEN_WALKING);
      }
    }, 125)
    intervalCollection.push(this.intervalIDanimate);
  }

  
/**
 * Clears 'intervalIDwalking' of the Chicken-Object so that Chicken is not moving to the left anymore when Chicken is Dead
 * THEN removes Chicken from the 'world.level.enemies'-Array via 'clearDeadEnemies()' of MovableObject
 * THEN clears 'intervalIDanimate' so that no Images of Chicken are not tryed to be displayed anymore
 */
  clearingChickenwhenDead(){
    clearInterval(this.intervalIDmovingtotheLeft);
    this.clearDeadEnemies(this.x); //x-value ensures that the correct Chicken is removed from the 'world.level.enemies'-Array
    
    setTimeout(function () { // Wait 500ms for 'clearDeadEnemies()' to finish, then clear 'intervalIDanimate', because otherwise 'animateChickenDeadOrWalking()' gets executed again & again
      clearInterval(this.intervalIDanimate); 
    }, 500);
  }

}