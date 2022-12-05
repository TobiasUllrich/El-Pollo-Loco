class Character extends MovableObject {
  height = 300;
  width = 100;
  y = 95; //Character has 100px Distance from his left-border to the left-canvas-border, means the distance form left-character-border to right-border is 620px
  speed = 5;
  currentImage = 0; //Needed for playAnimation()
  world; //Needed because of the keyboard-keys
  walking_sound = new Audio('audio/character walking.mp3'); //Walking-Sound
  jumping_sound = new Audio('audio/character jumping.wav'); //Jumping-Sound
  snoring_sound = new Audio('audio/character snoring.wav'); //Dead-Sound
  dead_sound = new Audio('audio/character dead.mp3'); //Dead-Sound
  deadSoundPlayed = false; //Variable to ensure that Dead-Sound is only played once
  timeoflastaction = new Date().getTime(); //Needed for Idle-Animation()
  cameraShiftx = 0; //Shifts the x-value of the camera 
  intervalID1; //Needed to clear Intervals
  intervalID2; //Needed to clear Intervals
  intervalID3; //Needed to clear Intervals
  intervalID4; //Needed to clear Intervals
  intervalID5; //Needed to clear Intervals
  intervalID6; //Needed to clear Intervals
  intervalID7; //Needed to clear Intervals
  intervalID8; //Needed to clear Intervals
  intervalID9; //Needed to clear Intervals

  //Reduces the frame around the object according to the offset-values
  offset = {
    top: 120,
    bottom: 15,
    left: 25,
    right: 35
  };

  //Array that stores the Image-paths of the Images for the Character-Object when Idling
  IMAGES_IDLE = ['img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'];
  //Array that stores the Image-paths of the Images for the Character-Object when Long-Idling
  IMAGES_LONGIDLE = ['img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'];
  //Array that stores the Image-paths of the Images for the Character-Object when Walking
  IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'];
  //Array that stores the Image-paths of the Images for the Character-Object when Jumping
  IMAGES_JUMPING = ['img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'];
  //Array that stores the Image-paths of the Images for the Character-Object when Hurt
  IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'];
  //Array that stores the Image-paths of the Images for the Character-Object when Dead
  IMAGES_DEAD = ['img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'];


  /**
    * As soon as a Character-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
    * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Gravity gets applied
    * AND Caracter gets animated
    */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png'); //super()-constructor is needed because Character -> MovableObject -> DrawableObject (loadImage() is here!)
    this.loadImages(this.IMAGES_WALKING); //super() only needed once; paths of IMAGES_WALKING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.IMAGES_JUMPING); //super() only needed once; paths of IMAGES_JUMPING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.IMAGES_HURT); //super() only needed once; paths of IMAGES_HURT-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.IMAGES_DEAD); //super() only needed once; paths of IMAGES_DEAD-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.IMAGES_IDLE); //super() only needed once; paths of IMAGES_IDLE-Array are stored into the imageCache via loadImages() of DrawableObject
    this.loadImages(this.IMAGES_LONGIDLE); //super() only needed once; paths of IMAGES_LONGIDLE-Array are stored into the imageCache via loadImages() of DrawableObject
    this.applyGravity(); //Gravity is applied to the Character
    this.animate(); //Character gets animated as soon as it is created
    this.keyObserver();
  }


  /**
   * Shifts Camera on first Contact with Endboss, Moves Character with Keys AND shows different Animations
   */
  animate() {
    this.checkifCharacterhadContactwithEndboss();
    this.moveCharacterwithKeys();
    this.getCharacterAnimated();
  }


  /**
   * Character Images are shown: DEAD, HURT, JUMPING, WALKING, IDLE, LONGIDLE
   */
  getCharacterAnimated() {
    this.animateCharacterIsDead();
    this.animateCharacterIsHurt();
    this.animateCharacterIsJumping();
    this.animateCharacterIsWalking();
    this.animateCharacterIsIdling();
  }


  /**
   * Animates Character when Hurt
   */
  animateCharacterIsHurt() {
    this.intervalID1 = setInterval(() => {     
      if (this.isHurt()) { this.playAnimation(this.IMAGES_HURT) };
    }, 50)
    intervalCollection.push(this.intervalID1);
  }


  /**
   * Animates Character when Jumping
   */
  animateCharacterIsJumping() {
    this.intervalID2 = setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING)
      };
    }, 150);
    intervalCollection.push(this.intervalID2);
  }


  /**
   * Animates Character when Dead
   */
  animateCharacterIsDead() {
    this.intervalID3 = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.deadSoundPlayed == false && muted == false) { this.dead_sound.play(); this.deadSoundPlayed = true; };
        clearInterval(world.character.intervalIDGravityCharacter); //Eliminates Gravity for Character
        setInterval(() => { this.y += 1; }, 200); //Lets Character flow out of the canvas
        gameHasEnded('Game Lost',new Date().getTime()); //Ends the Game
      };
    }, 50);
    intervalCollection.push(this.intervalID3);
  }


  /**
   * Character is Walking
   */
  animateCharacterIsWalking() {
    this.intervalID4 = setInterval(() => {
      if (!this.isDead() && !this.isHurt() && !this.isAboveGround()) {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      };
    }, 50);
    intervalCollection.push(this.intervalID4);
  }


  /**
   * Character is Idling OR LongIdling
   */
  animateCharacterIsIdling() {   
    this.intervalID5 = setInterval(() => {
      if (!this.isDead() && !this.isHurt() && !this.isAboveGround()) {
        // No keys pressed within the last 4 Seconds shows LongIdle-Images of the Character
        if ((new Date().getTime() - this.timeoflastaction) > 4000) 
        { this.playAnimation(this.IMAGES_LONGIDLE); if (muted == false) {this.snoring_sound.play()} else{this.snoring_sound.pause()}; }
        else
        { this.playAnimation(this.IMAGES_IDLE);}    
      }
      else
      {this.snoring_sound.pause()};
    }, 300);
    intervalCollection.push(this.intervalID5); 
  }


  /**
   * Checks if any key was pressed and saves the time it was pressed
   */
  keyObserver(){
    this.intervalID6 = setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D || this.world.keyboard.F || this.world.keyboard.G) 
      {this.timeoflastaction = new Date().getTime() };
    }, 20);
    intervalCollection.push(this.intervalID6);
  }


  /**
   * Character can moveLeft, moveRight and is able to jump if respective Keys are pressed
   */
  moveCharacterwithKeys() {
    this.intervalID7 = setInterval(() => {
      this.walking_sound.pause(); // Sound is shortly paused and is only played again, when LEFT or RIGHT get pressed
      if (this.rightBorderNotReached()) {
        this.characterMovingRight();
      }
      if (this.leftBorderNotReached()) {
        this.characterMovingLeft();
      }
      if (this.characterNotAlreadyInAir()) {
        this.jump();
        if (muted == false) { this.jumping_sound.play() };
      }
    }, 1000 / 60)
    intervalCollection.push(this.intervalID7);
  }


  /**
   * If this.x >= this.world.level.level_end_x then Character can't be moved anymore right because end of Level
   * @returns true if Character can be moved with RIGHT-key, otherwise false
   */
  rightBorderNotReached() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }


  /**
   * If x <= 0 then Character can't be moved anymore left because end of Level
   * @returns true if Character can be moved with LEFT-key, otherwise false
   */
  leftBorderNotReached() {
    return this.world.keyboard.LEFT && this.x > 0;
  }


  /**
   * If this.isAboveGround()=true Character can't jump, because it would be a Double-jump
   * @returns true if Character is able to jump
   */
  characterNotAlreadyInAir() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }


  /**
   * Character is moving to the Left
   */
  characterMovingLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (muted == false) { this.walking_sound.play() }; // Sound is played while Character walking to the Left
  }


  /**
   * Character is moving to the Right
   */
  characterMovingRight() {
    this.moveRight();
    this.otherDirection = false;
    if (muted == false) { this.walking_sound.play() }; // Sound is played while Character walking to the Right
  }


  /**
   * If the statusBar of Endboss is at x=480 then firstContact to Endboss has happened and camera is centered
   * Otherwise if camera was not yet shifted then it will be shifted with firstContact to Endboss
   * After shift it will move along with the movement of the Character
   */
  checkifCharacterhadContactwithEndboss() {
    this.intervalID8 = setInterval(() => {
      if (world.statusBarEndboss.x == 480 && this.cameraShiftx < 200) { this.centerCharacter() };
      this.moveCameraAlongwithCharacter();
    }, 1000 / 60)
    intervalCollection.push(this.intervalID8);
  }


  /**
   * Moves Camera along with the x-value of the Character
   */
  moveCameraAlongwithCharacter() {
    this.world.camera_x = -this.x + 100 + this.cameraShiftx;
  }

  
  /**
   * Centers Character in the middle of the canvas
   */
  centerCharacter() {
    this.intervalID9 = setInterval(() => {
      if (this.cameraShiftx < 200) { this.cameraShiftx += 1 };
    }, 200);
    intervalCollection.push(this.intervalID9);
  }

}