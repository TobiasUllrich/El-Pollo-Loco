class World {

  level = level1; //Objects are created in level1 and saved in level
  character = new Character(); //New character is created and saved in character
  canvas;
  ctx;
  keyboard;
  intervalIDcheckActionsofCharacter; //Needed to clear Intervals
  intervalIDcheckCollisions; //Needed to clear Intervals
  intervalIDSplashedBottles; //Needed to clear Intervals
  camera_x; //Defines which part of the canvas is visible
  statusBarHealth = new StatusBar('Health', 40, 0, 100, 200, 60); //Creates Health-StatusBar
  statusBarCoins = new StatusBar('Coins', 40, 40, 0, 200, 60); //Creates Coins-StatusBar
  statusBarBottles = new StatusBar('Bottles', 40, 80, 100, 200, 60); //Creates Bottles-StatusBar
  statusBarEndboss = new StatusBar('Endboss', 800, 0, 100, 200, 60); //Creates Endboss-StatusBar Part1
  statusBarEndbossPic = new StatusBar('EndbossPic', 800, -10, 100, 107, 87); //Creates Endboss-StatusBar Part2
  statusBars = [this.statusBarHealth, this.statusBarCoins, this.statusBarBottles, this.statusBarEndboss, this.statusBarEndbossPic]; //For better Handling

  game_sound = new Audio('audio/Mexican Music.mp3'); //Creates new Audio-Object for Background-Music
  sounds = []; //All sounds get stored here during Run-time
  throwableObjects = []; //All bottles that physically exist in the Game (air or ground) are in 'throwableObjects'


  /**
   * Plays sounds of an Audio-file under a certain path with a certain volume and pushes it into the 'sound'-array
   * @param {String} path Path of the Audio-file
   * @param {Number} volume Volume of the Audio-file (between 0.0 and 1.0)
   */
  playSound(path, volume) {
    let sound = new Audio(path);
    if (volume !== undefined) { sound.volume = volume };
    this.sounds.push(sound);
    if (muted == false) { this.sounds[this.sounds.length - 1].play() }; //If Game is muted no sounds will be played
  }


  /**
   * As soon as a World-Object gets created the context of the canvas gets defined, all objects of the world get drawn via 'draw()',
   * 'setWorld()' is executed, 'thingsHappeningWhilePlaying()' is executed and 'sound()' is played
   * @param {Object} canvas Object which relates to our canvas HTML-Element
   * @param {Oject} keyboard Keyboard-Object
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.sound();
    this.thingsHappeningWhilePlaying();
  }


  /**
   * Helping-Function which saves the World-Object into the world-variable of our Character 
   * -> Needed to have access to the Keyboard-Object inside of our Character
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * Plays & Repeats the Background-Music with a certain volume
   */
  sound() {
    this.game_sound.volume = 0.06;
    this.game_sound.loop = true;
    this.game_sound.play();
  }


  /**
   * Gets executed as soon as Game is has started
   */
  thingsHappeningWhilePlaying() {
    this.checkCollisions();
    this.checkActionsOfCharacter();
    this.clearSplashedBottles();
  }


  /********************************************* ACTIONS OF CHARACTER *********************************************************/
  /**
  * Checks if 'F'-Key OR 'G'-Key is pressed, because then Coins have to be transformed
  */
  checkActionsOfCharacter() {
    this.intervalIDcheckActionsofCharacter = setInterval(() => {
      if (this.keyboard.F) { this.transferCoinsTo('Bottles', this.statusBarBottles) };
      if (this.keyboard.G) { this.transferCoinsTo('Health', this.statusBarHealth) };
      if (this.keyboard.D) { this.throwBottle() };
    }, 150);
    intervalCollection.push(this.intervalIDcheckActionsofCharacter);
  }


  /**
   * Transfers Coins to another 'type' of statusBar (statusBar-Object saved in 'bar') 
   * @param {String} type Says which statusBar is affected ('Bottles' OR 'Health')
   * @param {Object} bar Is the statusBar-Object, that gains Coins
   */
  transferCoinsTo(type, bar) {
    let coins = this.statusBarCoins.percentage;
    let statusBarThatGains = bar; //
    if (this.allCoinsCanbeTransferred(`to ${type}`)) {
      this.emptyCoinsFor(type, statusBarThatGains);
    }
    else {
      this.fillStatusBar(type, statusBarThatGains);
    };
    if (this.statusBarCoins.percentage < coins) { this.playSound('audio/character using coins.wav', 0.05); };
  }


  /**
   * Coin-StatusBar can be emptied for another 'type' of statusBar (statusBar-Object saved in 'bar')
   * @param {String} type Says which statusBar is affected ('Bottles' OR 'Health')
   * @param {Object} bar Is the statusBar-Object, that gains Coins
   */
  emptyCoinsFor(type, bar) {
    bar.setPercentage(type, bar.percentage + this.statusBarCoins.percentage);
    if (type == 'Health') { this.character.energy += this.statusBarCoins.percentage }; //*** */
    this.statusBarCoins.setPercentage('Coins', 0);
  }


  /**
   * Another 'type' of statusBar (statusBar-Object saved in 'bar') gets completely filled with Coins
   * @param {String} type Says which statusBar is affected ('Bottles' OR 'Health')
   * @param {Object} bar Is the statusBar-Object, that gains Coins
   */
  fillStatusBar(type, bar) {
    this.statusBarCoins.setPercentage('Coins', this.statusBarCoins.percentage - (100 - bar.percentage));
    if (type == 'Health') { this.character.energy = 100 }; //*** */
    bar.setPercentage(type, 100);
  }


  /**
   * Checks if all Coins can be transformed
   * -> If the remaining space for Bottles OR Health is greater or equal as the Coins, then all Coins can be transferred
   * @param {String} toWhat says if Coins have to be transferred into Bottles OR Health
   * @returns true if all Coins can be transferred
   */
  allCoinsCanbeTransferred(toWhat) {
    if (toWhat == 'to Bottles') { return (100 - this.statusBarBottles.percentage) >= this.statusBarCoins.percentage; }
    if (toWhat == 'to Health') { return (100 - this.statusBarHealth.percentage) >= this.statusBarCoins.percentage; }
  }


  /**
   * Trys to throw a Bottle and if possible, then creates a new Bottle-Object AND adds it to 'throwableObjects'-Array
   */
  throwBottle() {
    if (this.bottleAvailable()) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.statusBarBottles.setPercentage('Bottles', this.statusBarBottles.percentage - 20);
      this.throwableObjects.push(bottle);
      this.playSound('audio/character throwing bottle.wav');
    }
  }


  /**
   * Checks if Bottle is available (can be seen at 'statusBarBottles')
   * @returns true if at least one Bottle is availabel
   */
  bottleAvailable() {
    return this.statusBarBottles.percentage > 0;
  }
  /********************************************* ACTIONS OF CHARACTER *********************************************************/


  /************************************************** COLLISIONS **************************************************************/
  /**
   * Permanently checks if there are any collisions in our world
   */
  checkCollisions() {
    this.intervalIDcheckCollisions = setInterval(() => {
      this.checkIfEnemiesAreColliding();
      this.checkIfCharacterPickedUpACoin();
    }, 50);
    intervalCollection.push(this.intervalIDcheckCollisions);
  }


  /**
   * Loops through 'enemies'-array to check for Collisions with Character OR Bottles
   */
  checkIfEnemiesAreColliding() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isHeadnutting(enemy)) {
        this.characterKillsEnemyThroughHeadnut(enemy);
        this.playSound('audio/character calling arriba.wav');
      }
      else if (this.character.isColliding(enemy)) {
        this.characterIsDamagedFromEnemy(enemy);
        if (this.character.energy > 0) { this.playSound('audio/character hurt.wav') };
      };
      this.checkIfBottlesAreColliding(enemy);
    });
  }


  /**
   * Loops through 'throwableObjects'-array to check for Collisions with Enemies OR Character
   * @param {Object} enemy enemy-object
   */
  checkIfBottlesAreColliding(enemy) {
    this.throwableObjects.forEach((bottle, index) => {
      if (bottle.isColliding(enemy) && bottle.isAboveGround()) {
        this.bottleHitsEnemy(enemy, bottle, index);
      }
      else if (!bottle.isAboveGround() && bottle.isColliding(this.character) && this.statusBarBottles.percentage < 100) {
        this.bottlePickedUpByCharacter(index);
      };
    });
  }


  /**
   * Character kills enemy with jump on the head AND makes a mini-jump afterwards
   * @param {Object} enemy enemy-object
   */
  characterKillsEnemyThroughHeadnut(enemy) {
    if (!enemy.isDead()) { this.character.minijump() };
    enemy.hit(this.character);
  }


  /**
   * Character is damaged from Enemy and loses Health
   */
  characterIsDamagedFromEnemy(enemy) {
    this.character.hit(enemy);
    this.statusBarHealth.setPercentage('Health', this.character.energy);
  }


  /**
   * Bottle hits Enemy and gets splashed; If Endboss is hit, then statusBar of the Endboss is updated
   * @param {Object} enemy enemy-object
   * @param {Object} bottle bottle-object
   * @param {Number} index index of bottle-object
   */
  bottleHitsEnemy(enemy, bottle, index) {
    enemy.hit(bottle);
    bottle.splashed(index);
    bottle.energy = 0;
    this.playSound('audio/bottle splashing.flac');

    if (enemy instanceof Endboss) {
      this.statusBarEndboss.setPercentage('Endboss', enemy.energy);
    }
    else {
      this.playSound('audio/chicken hurt.wav');
    }
  }


  /**
   * Character picks up Bottle
   * @param {Number} index index of bottle-object
   */
  bottlePickedUpByCharacter(index) {
    this.statusBarBottles.setPercentage('Bottles', this.statusBarBottles.percentage + 20);
    this.throwableObjects.splice(index, 1); //Deletes Bottle from the 'throwableObjects'-Array
    this.playSound('audio/character picksup bottle.wav');
  }


  /**
   * Loops through 'coins'-array to check if Character picks up a Coin
   */
  checkIfCharacterPickedUpACoin() {
    this.level.coins.forEach((coin, index) => {
      if (coin.isColliding(this.character) && this.statusBarCoins.percentage < 100) {
        this.coinPickedUpByCharacter(index);
        this.playSound('audio/character using coins.wav', 0.05);
      };
    });
  }


  /**
   * Character picks up Coin
   * @param {Number} index index of coin-object
   */
  coinPickedUpByCharacter(index) {
    this.statusBarCoins.setPercentage('Coins', this.statusBarCoins.percentage + 20);
    this.level.coins.splice(index, 1); //Deletes Coin from the 'coins'-Array
  }
  /************************************************** COLLISIONS **************************************************************/


  /**
   * Loops through bottles to check if the are on ground AND have energy=0 
   * -> Then removes them from the 'throwableObjects'-Array
   */
  clearSplashedBottles() {
    this.intervalIDSplashedBottles = setInterval(() => {
      for (let i = this.throwableObjects.length; i > -1; i--) {
        if (typeof this.throwableObjects[i] === 'undefined') {/*Not accessible*/ }
        else {
          if (this.throwableObjects[i].energy == 0 && !this.throwableObjects[i].isAboveGround()) { this.clearBottle(i); };
        };
      };
    }, 50);
    intervalCollection.push(this.intervalIDSplashedBottles);
  }


  /**
   * Removes Bottle with index i from the 'throwableObjects'-Array
   * @param {Number} index index of bottle-object
   */
  clearBottle(index) {
    this.throwableObjects.splice(index, 1);
  }


  /**
   * Draws Objects into the canvas and repeats the drawing
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Context has to be cleared before each new drawing
    this.ctx.translate(this.camera_x, 0); //this.ctx.translate(value added to the x-Axis,value added to the y-Axis); x-value up: we see more of the left side
    this.drawAllObjects();
    this.repeatDraw();
  }


  /**
   * Draws all Images of all Objects into the canvas
   */
  drawAllObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);

    this.statusBars.forEach(statusBar => {
      this.ctx.translate(-this.camera_x, 0); //So that the statusBar stays fixed on its position
      this.addToMap(statusBar);
      this.ctx.translate(this.camera_x, 0); //So that the statusBar stays fixed on its position
    });

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }


  /**
   * Repeats Drawing all Images of all Objects into the canvas
   * repeatDraw() repeats drawAllObjects()
   * -> necessary because the above drawing sometimes doesn't work because Image is not loaded -> you can't see anyhing on the canvas
   */
  repeatDraw() {
    let self = this; // self = this, because in 'requestAnimationFrame()' this isn't working anymore
    requestAnimationFrame(function () { self.draw(); });
  }


  /**
   * Adds an Array of Objects to the canvas
   * @param {Array} objects Array which contains objects
   */
  addObjectsToMap(objects) {
    objects.forEach(o => { this.addToMap(o); });
  }


  /**
   * Draws an Object into the canvas
   * @param {Object} mo Object to be drawn
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo); //Flips the object depending on the variable 'otherDirection'
    }

    mo.draw(this.ctx);      //Calls draw() in DrawableObject to draw to object
    //mo.drawFrame(this.ctx); //Calls drawFrame() in DrawableObject to draw a Frame around the object

    if (mo.otherDirection) {
      this.flipImageBack(mo); //Flips the object back depending on the variable 'otherDirection'
    }
  }


  /**
   * Flips the object
   * @param {Object} mo Object to be flipped
   */
  flipImage(mo) {
    this.ctx.save(); //Saves the actual attributes of our Context, because as soon as Context is changed ALL new Images will be inserted the new way into the canvas
    this.ctx.translate(mo.width, 0); //Shifts Image to the right along x-Axis, because Image would jump to the left when flipping
    this.ctx.scale(-1, 1); //Mirrors Context along the y-Axis; FIRST 'translate()', THEN 'scale()' -> Order is important!
    mo.x = mo.x * -1; //When mirroring Context x-Axis & y-Axis get switched, SO Forward- & Backward-Key are doing exactly the opposite and SO we have to correct it with -1!
  }


  /**
   * Flips the object back
   * @param {Object} mo Object to be flipped back
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; //When mirroring Context x-Axis & y-Axis get switched, SO Forward- & Backward-Key are doing exactly the opposite and SO we have to correct it with -1!
    this.ctx.restore(); //Restores the old Context
  }

}

