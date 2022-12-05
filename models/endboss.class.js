class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 50;
  energy = 100;
  currentImage = 0; //Needed for playAnimation()
  intervalIDanimateEndboss; //Needed to clear Intervals
  intervalIDdeadEndboss; //Needed to clear Intervals
  endboss_drama = new Audio('audio/endboss drama.wav'); //Drama-Sound when Contact with Endboss
  endbossDramaAlreadyPlayed = false; //Was the Drama-Sound already played
  hadFirstContact = false; //Variable which says if a contact between Endboss & Character already happened
  positionOfCharacter; //Variable which stores the x-value of the Character

  //Reduces the frame around the object according to the offset-values
  offset = {
    top: 70,
    bottom: 80,
    left: 40,
    right: 40
  };
  //Array that stores the Image-paths of the Images for the Endboss-Object when in alert-status
  ENDBOSS_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  //Array that stores the Image-paths of the Images for the Endboss-Object when walking
  ENDBOSS_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];
  //Array that stores the Image-paths of the Images for the Endboss-Object when dead
  ENDBOSS_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];
  //Array that stores the Image-paths of the Images for the Endboss-Object when attacks
  ENDBOSS_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];
  //Array that stores the Image-paths of the Images for the Endboss-Object when hurt
  ENDBOSS_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];


  /**
    * As soon as a Endboss-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
    * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Endboss is placed at x=2000 into the canvas with random speed
    * AND is 'animated()'
    */
  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');  //super()-constructor is needed because Endboss -> MovableObject -> DrawableObject (loadImage() is here!)
    this.loadImages(this.ENDBOSS_WALKING); //super() only needed once; paths of ENDBOSS_WALKING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.ENDBOSS_DEAD); //super() only needed once; paths of ENDBOSS_DEAD-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.ENDBOSS_ALERT); //super() only needed once; paths of ENDBOSS_ALERT-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.ENDBOSS_ATTACK); //super() only needed once; paths of ENDBOSS_ATTACK-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.ENDBOSS_HURT); //super() only needed once; paths of ENDBOSS_HURT-Array are stored into the imageCache via loadImages() of DrawableObject
    this.x = 2000; //x-value of the endboss
    this.speed = 0.15 + Math.random() * 0.45; //speed-value of the endboss; Range: 0.15 to 0.6
    this.animate(); //Endboss gets animated as soon as it is created
  }


  /**
     * Animates the Endboss
     */
  animate() {
    this.intervalIDanimateEndboss = setInterval(() => {
      this.storePositionOfCharacter(); //Stores the x-value of our Character in 'this.positionOfCharacter'

      if (this.endbossHasSpottetCharacterFortheFirstTime()) {
        this.endbossAlertAnimation();
      }
      else {
        this.endbossAnimationsAfterBeingAlerted();
      }
    }, 125);
    intervalCollection.push(this.intervalIDanimateEndboss);
  }


  /**
   * Permanently updating the position of Character; x-value of character not accessible at start, so we set positionOfCharacter = 250
   */
  storePositionOfCharacter() {
    try { this.positionOfCharacter = world.character.x } catch (e) { this.positionOfCharacter = 250 };
  }


  /**
   * Shows Endboss in Alert-State + Endboss-StatusBar + Sets hadFirstContact = true after 3 Seconds
   */
  endbossAlertAnimation() {
    this.animateEndbossAlert();
    this.showEndbossStatusBar();
    let self = this;
    setTimeout(function () { self.setFirstContactToTrue() }, 3000); //hadFirstContact = true after 3 Seconds, to show the ALERT-Animation
  }


  /**
   * Shows Endboss-Animations: [Dead+gameHasEnded] OR [Hurt+Attack to Left/Right] OR [Moving to Left/Right]
   */
  endbossAnimationsAfterBeingAlerted() {
    if (this.isDead()) {
      this.clearEndbosswhenDead(this.x); gameHasEnded('Game Won', new Date().getTime());} //Ends the Game
    else if (this.isHurt() && (!this.characterStandingRightofEndboss(this.positionOfCharacter))) {
      this.endbossHurtAnimationThenAttackingToThe('Left');
    }
    else if (this.isHurt() && (this.characterStandingRightofEndboss(this.positionOfCharacter))) {
      this.endbossHurtAnimationThenAttackingToThe('Right');
    }
    else if (this.characterStandingRightofEndboss(this.positionOfCharacter)) {
      this.animateEndbossMovingtotheRight();
    }
    else { 
      this.animateEndbossMovingtotheLeft(); };
  }


  /**
   * Plays the Hurt-Animation of the Endboss AND lets him attack 0.3 seconds afterwards
   * @param {String} direction Contains the Attack-direction of the Endboss ('Left' OR 'Right')
   */
  endbossHurtAnimationThenAttackingToThe(direction) {
    this.animateEndbossHurt();
    let self = this;
    if (direction == 'Left') {
      setTimeout(function () { self.animateEndbossAttackingtotheLeft() }, 300);
    }
    else {
      setTimeout(function () { self.animateEndbossAttackingtotheRight() }, 300);
    }
  }


  /**
   * Sets hadFirstContact = true!
   */
  setFirstContactToTrue() {
    this.hadFirstContact = true;
  }


  /**
   * Checks if Character has had a first Contact with the Endboss
   * @returns true if Character already hat contact with Endboss, else false
   */
  endbossHasSpottetCharacterFortheFirstTime() {
    return (this.x - this.positionOfCharacter) < 500 && !this.hadFirstContact;
  }


  /**
    * Endboss is alerted & Drama-Music is played
    */
  animateEndbossAlert() {
    this.playAnimation(this.ENDBOSS_ALERT); //Show Alert-Images 
    if (muted == false && this.endbossDramaAlreadyPlayed == false) { this.endboss_drama.play() };
    this.endbossDramaAlreadyPlayed = true;
  }


  /**
   * Makes the StatusBar of the Endboss visible
   */
  showEndbossStatusBar() {
    world.statusBarEndboss.x = 480;
    world.statusBarEndbossPic.x = 605;
  }


  /**
  * Clears 'intervalIDanimate' so that no Images of Endboss are not tryed to be displayed anymore
  * THEN plays Dead-Animation
  * THEN removes Endboss from the 'world.level.enemies'-Array via 'clearDeadEnemies()' of MovableObject after waiting for 1 second
   * @param {Number} Endbossx x-value of Endboss: ensures that the correct Endboss is removed from the 'world.level.enemies'-Array
   */
  clearEndbosswhenDead(Endbossx) {
    clearInterval(this.intervalIDanimateEndboss);
    this.intervalIDdeadEndboss = setInterval(() => {
      this.playAnimation(this.ENDBOSS_DEAD);
    }, 125);
    intervalCollection.push(this.intervalIDdeadEndboss);
    setTimeout(
      this.clearDeadEnemies(Endbossx)
      , 1000);   
  }


  /**
    * Endboss is attacking to the Left for 3 seconds if it gets hurt
    */
  animateEndbossAttackingtotheLeft() {
    this.playAnimation(this.ENDBOSS_ATTACK);
    this.otherDirection = false;
    this.x -= 50; //Raising speed
    this.jump();
  }


  /**
    * Endboss is attacking to the Right for 3 seconds if it gets hurt
    */
  animateEndbossAttackingtotheRight() {
    this.playAnimation(this.ENDBOSS_ATTACK);
    this.otherDirection = true;
    this.x += 50; //Raising speed
    this.jump();
  }


  /**
    * Endboss is hurt
    */
  animateEndbossHurt() {
    this.playAnimation(this.ENDBOSS_HURT); //Show Hurt-Images 
  }


  /**
    * Endboss is moving to the Left
    */
  animateEndbossMovingtotheLeft() {
    this.otherDirection = false; //Endboss changes Moving-Direction to Left
    this.playAnimation(this.ENDBOSS_WALKING);
    this.moveLeft();
  }


  /**
    * Endboss is moving to the Right
    */
  animateEndbossMovingtotheRight() {
    this.otherDirection = true; //Endboss changes Moving-Direction to Right
    this.playAnimation(this.ENDBOSS_WALKING);
    this.moveRight();
  }


  /**
   * Checks if Character is standing right of Endboss
   * @param {Number} xChar x-value of Character
   * @returns true if Character is standing right of Endboss, else false
   */
  characterStandingRightofEndboss(xChar) {
    return this.x < xChar;
  }

}