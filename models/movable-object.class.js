class MovableObject extends DrawableObject {
  speed = 0.3;
  currentArraylength = 0; // Helpvariable for playAnimation()
  otherDirection = false; // Direction of Character
  speedY = 0; // Speed of Object upwards (positive values) ODER falling downwards (negative values)
  acceleration = 1; // Acceleration of our Object
  energy = 100;
  lasthit = 0; //Last Time when object was hitten
  intervalIDGravity; //Needed to clear Intervals
  intervalIDGravityCharacter; //Needed to clear Intervals


  /**
   * Only DrawableObjects gets accessed via super()
   */
  constructor() {
    super();
  }


  /**
   * As soon as an Object is above the ground OR Energy-Push upwards is active THEN gravity is applied
   */
  applyGravity() {
    if (this instanceof Character) {
      this.applyGravityToCharacter();
    }
    else {
      this.applyGravityToObject();
    }
  }


  /**
   * Used to apply Gravity to any Object except the Character
   */
  applyGravityToObject() {
    this.intervalIDGravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
    intervalCollection.push(this.intervalIDGravity);
  }


  /**
   * Used to apply Gravity to the Character
   */
  applyGravityToCharacter() {
    this.intervalIDGravityCharacter = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
    intervalCollection.push(this.intervalIDGravityCharacter);
  }


  /**
   * No object can leave the canvas through the ground because of gravity
   * @returns true if object is above the ground, false otherwise
   */
  isAboveGround() {
    if ((this instanceof ThrowableObject)) {
      if (360 > this.y) { return true }
      else { return false };
    }
    else { return this.y < 140 };
  }


  /**
   * Energy gets reduced by 5, when an object is hit (Exeption: Character hit by ChickenSmall), but energy is never low than 0
   * No more hit is taking place if the energy of the colliding object is 0
   */
  hit(CollidingObjectThatmakesDamage) {
    if (CollidingObjectThatmakesDamage.energy > 0) {
      if (this instanceof Character && CollidingObjectThatmakesDamage instanceof ChickenSmall) {
        this.energy -= 1;
      }
      else {
        this.energy -= 5;
      }
      if (this.energy < 0) { this.energy = 0; }
      else { this.lasthit = new Date().getTime(); }
    }
  }


  /**
   * Object is only hurt until more than 1 second after the first hit() has passed
   * @returns true if object is hurt, otherwise false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }


  /**
   * Any object is dead when it has an energy of 0
   * @returns true if object is dead
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * Object is moving to the Right
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Object is moving to the Left
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Object is jumping through a energy-boost upwards, which afterwards gets diminished by gravity
   */
  jump() {
    this.speedY = 15;
  }


  /**
    * Object is jumping through a smaller energy-boost upwards, which afterwards gets diminished by gravity
    */
  minijump() {
    this.speedY = 10;
  }


  /**
   * Checks if the actual object is colliding with another object 'mo'
   * @param {Object} mo MovableObject
   * @returns true if actual object is colliding with another object 'mo', otherwise false
   */
  isColliding(mo) {
    if (this instanceof ThrowableObject || this instanceof Coin) {
      return this.bottleOrCoinIsCollidingWith(mo);
    };
    if ((this instanceof Character && mo instanceof Endboss)) {
      return this.characterIsCollidingWithEndboss(mo);
    };
    if (this instanceof Character && this.otherDirection == true) {
      return this.characterIsCollidingBackwardsWithEnemy(mo);
    };
    if ((this instanceof Character && this.otherDirection == false)) {
      return this.characterIsCollidingForwardsWithEnemy(mo);
    };
  }


  /**
   * Checks if Bottle OR a Coin is colliding with any Object 
   * [BottleRight > CSLeft + BottleLeft < CSLeft + BottleRight < CSRight + BottleBottom < CSBottom + BottleTop > CSTop] 
   * @param {Object} mo Object that collides with Bottle OR Coin
   * @returns true if Bottle OR Coin is inside another object, otherwise false
   */
  bottleOrCoinIsCollidingWith(mo) {
    return (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom < mo.y + mo.height - mo.offset.bottom &&
      this.y + this.offset.top > mo.y + mo.offset.top);
  }


  /**
   * Checks if Character is colliding with the Endboss
   * [CharLeft > EnemyLeft + CharRight < EnemyRight] OR [CharLeft < EnemyLeft + CharRight > EnemyLeft]
   * @param {Object} mo Endboss-Object
   * @returns true if Character is colliding with the Endboss, otherwise false
   */
  characterIsCollidingWithEndboss(mo) {
    return ((this.x + this.offset.left > mo.x + mo.offset.left &&
      this.x + this.width - this.offset.right < mo.x + mo.width - mo.offset.right)
      ||
      (this.x + this.offset.left < mo.x + mo.offset.left &&
        this.x + this.width - this.offset.right > mo.x + mo.offset.left));
  }


  /**
   * Checks if Character is running into the back of an Enemy
   * [CharLeft < EnemyRight + CharRight > EnemyRight + CharBottom > EnemyTop +  CharTop < EnemyBottom]
   * @param {Object} mo Enemy-Object
   * @returns true if Character is running into an Enemy from behind, otherwise false
   */
  characterIsCollidingBackwardsWithEnemy(mo) {
    return (this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom);
  }


  /**
   * Checks if Character is running forward into an Enemy
   * [CharRight > EnemyLeft + CharLeft < EnemyLeft + CharBottom > EnemyTop +  CharTop < EnemyBottom]
   * @param {Object} mo Enemy-Object
   * @returns true if Character is running forward into an Enemy, otherwise false
   */
  characterIsCollidingForwardsWithEnemy(mo) {
    return (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom);
  }


  /**
   * Checks if the Character is jumping onto another object 'mo'
   * @param {Object} mo MovableObject
   * @returns true if the Character is jumping onto another object 'mo', otherwise false
   */
  isHeadnutting(mo) {
    if (this instanceof Character && mo instanceof Chicken) {
      return this.characterIsHeadnuttingChicken(mo);
    }
    else if (this instanceof Character && mo instanceof ChickenSmall && this.isAboveGround()) {
      return this.characterIsHeadnuttingChickenSmall(mo);
    }
  }


  /**
   * Checks if Character is jumping onto a Chicken
   * @param {Object} mo Chicken-Object
   * @returns true if Character jumping onto Chicken, otherwise false
   */
  characterIsHeadnuttingChicken(mo) {
    return (this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Right lower corner of Character is inside the Chicken
      this.x + this.width - this.offset.right < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + 25 &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top)
      ||
      (this.x + this.offset.left > mo.x + mo.offset.left && // Left lower corner of Character is inside the Chicken
       this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
       this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + 25 &&
       this.y + this.height - this.offset.bottom > mo.y + mo.offset.top);
  }


  /**
   * Checks if Character is jumping onto a ChickenSmall
   * @param {Object} mo ChickenSmall-Object 
   * @returns true if Character jumping onto ChickenSmall, otherwise false
   */
  characterIsHeadnuttingChickenSmall(mo) {
    return (this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Right lower corner of Character is inside the ChickenSmall & Character is above ground
      this.x + this.width - this.offset.right < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top)
      ||
      (this.x + this.offset.left > mo.x + mo.offset.left && // Left lower corner of Character is inside the ChickenSmall & Character is above ground
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top)
      ||
      (this.x + this.offset.left < mo.x + mo.offset.left && // X-Axis of Character includes ChickenSmall
        this.x + this.width - this.offset.right > mo.x + mo.width - mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top);
  }


  /**
   * Loops through an Array with paths of Images if it is called repeatedly e.g. with setInterval()
   * @param {Array} images Array with contains paths of images
   */
  playAnimation(images) {
    if (this.currentArraylength != images.length) { this.currentImage = 0 };
    this.currentArraylength = images.length;
    let i = this.currentImage % images.length;

    if (i == 0 && this.currentImage > 1) { this.currentImage = 0 };
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Loops through enemies-array to check if they are dead and if so deletes the enemies
   * @param {Number} x x-value of dead enemy
   */
  clearDeadEnemies(x) {
    for (let i = 0; i < world.level.enemies.length; i++) {
      if (typeof world.level.enemies[i] === 'undefined') {/*Not accessible*/ }
      else {
        if (world.level.enemies[i].isDead()) {
          setTimeout(function () { //Deletes the Element from the enemies-array
            try {
              if (world.level.enemies[i].x == x) {
                world.level.enemies.splice(i, 1);
                i--;
              }
            }
            catch (e) { };
          }, 500);
        }
      }
    }
  }

}