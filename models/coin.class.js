class Coin extends MovableObject {
  height = 80;
  y = 50;
  currentImage = 0; //Needed for playAnimation()
  intervalIDanimate; //Needed to clear Intervals

  //Reduces the frame around the object according to the offset-values
  offset = {
    top: 30,
    bottom: 30,
    left: 40,
    right: 40
  };

  //Array that stores the Image-paths of the Images for the Coin-Object
  COIN_BLINKING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];


  /**
    * As soon as a Coin-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
    * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Coins are randomly placed into the canvas AND are 'animated()'
    */
  constructor() {
    super().loadImage('img/8_coin/coin_1.png'); //super()-constructor is needed because Coin -> MovableObject -> DrawableObject (loadImage() is here!)
    this.loadImages(this.COIN_BLINKING); //super() only needed once; paths of COIN_BLINKING-Array are stored into the imageCache via loadImages() of DrawableObject
    this.x = 400 + Math.random() * 1600; //x-value of the coin; Range: 400 to 1400
    this.y = 130 + Math.random() * 100; //y-value of the coin; Range: 130 to 230
    this.animate(); //coins get animated as soon as they are created
  }


  /**
   * Animates the Coin
   */
  animate() {
    this.animateCoinBlinking();
  }

  
  /**
    * Coins are permanently blinking, through their image gets changed via 'playAnimation()' of MovableObject every 1000/60 Seconds <-> 60 FPS
    */
  animateCoinBlinking() {
    this.intervalIDanimate = setInterval(() => {
      this.playAnimation(this.COIN_BLINKING);
    }, 1000)
    intervalCollection.push(this.intervalIDanimate);
  }

}
