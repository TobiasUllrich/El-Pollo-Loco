class DrawableObject {
  img;
  imageCache = {}; // JSON-Object that saves an Image
  x = 250;
  y = 225;
  height = 100;
  width = 100;

  constructor() {
  }


  /**
   * Creates a new Image-Object and gives it an Image-Path
   * @param {String} path Path of Image for the Image-Object that is created
   */
  loadImage(path) {
    this.img = new Image(); // Image-Object is a Standar-Class in Javascript
    this.img.src = path;
  }


  /**
   * Creates many new Image-Objects, gives them an Image-Path and stores them in 'this.imageCache'
   * @param {String-Array} pathArray Paths of Images for the Image-Objects that are created ['img/1.png', 'img/2.png', ...]
   */
  loadImages(pathArray) { // Für jedes Element aus dem Array wird ein Bild-Objekt erstellt, welches anschließend mit dem Bild-Pfad als Schlüssel in den imageCache gespeichert wird
    pathArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; // Image-Object gets stored in the imageCache with 'path' as the key
    });
  }


  /**
   * Draws an Image at (x,y) with a certain width and a certain height
   * @param {*} ctx Context of our Canvas, e.g. 2d or 3d
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  
  /**
   * Draws a Frame around an Image at (x,y) with a certain width and a certain height and a certain offset
   * @param {*} ctx Context of our Canvas, e.g. 2d or 3d
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Endboss || this instanceof ChickenSmall || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height); //Rectangle gets arranged with the Coordinates of the Movable-Object
      ctx.stroke(); 

      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'red';
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top); //Rechteck soll an den Koordinaten des movable-Objects ausgerichtet werden
      ctx.stroke();
    }
  }

}   