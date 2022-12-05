class BackgroundObject extends MovableObject {
  x;
  y;
  width = 720;
  height = 480;

  
  /**
   * As soon as a Background-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
   * via 'loadImage()' of the Super-Constructor
   * @param {String} imagePath Path of Image of the Background-Object
   * @param {Number} x Positioning of the Image along the x-Axis
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath); //super()-constructor is needed because BackgroundObject -> MovableObject -> DrawableObject (loadImage() is here!)
    this.x = x;
    this.y = 480 - this.height;
  }

}