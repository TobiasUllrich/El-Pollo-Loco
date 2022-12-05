class Cloud extends MovableObject {
  y = 50; 
  width = 500;
  height = 250;
  intervalIDanimate; //Needed to clear Intervals


  /**
   * As soon as a Cloud-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
   * via 'loadImage()' of the Super-Constructor
   * @param {String} imagePath Path of Image of the Cloud-Object
   * @param {Number} x Positioning of the Image along the x-Axis
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath); //super()-constructor is needed because Cloud -> MovableObject -> DrawableObject (loadImage() is here!)
    this.x = x;
    this.animate(); //clouds get animated as soon as they are created   
  }


  /**
   * Animates the Cloud
   */
  animate() {
    this.animateCloudsflyingtotheLeft();
  }

  
  /**
   * Clouds are permanently moving left, through x-value gets changed via 'moveLeft()' every 1000/60 Seconds <-> 60 FPS
   */
  animateCloudsflyingtotheLeft(){
    this.intervalIDanimate = setInterval(() => {
      this.moveLeft(); 
    }, 1000/60)
    intervalCollection.push(this.intervalIDanimate);
  }

}