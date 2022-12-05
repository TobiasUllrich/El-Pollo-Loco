class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;
    imgBottle; //To decide which bottle is being thrown
    intervalIDRotation; //Needed to clear Intervals
    intervalIDSplashedBottle; //Needed to clear Intervals

    //Reduces the frame around the object according to the offset-values
    offset = {
        top: 20,
        bottom: 20,
        left: 17.5,
        right: 17.5
    };
    //Array that stores the Image-paths of the Images for the Throwable-Object when rotating
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    //Array that stores the Image-paths of the Images for the Throwable-Object when splashing
    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    //Array that stores the Image-paths of the Images for the Throwable-Object when on ground
    BOTTLE_ONGROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * As soon as a Throwable-Object gets created, it's Image path is stored into the src attribute of a newly createt Image-Object 
     * via 'loadImage()' & 'loadImages()' of the Super-Constructor AND Throwable-Object is thrown immediatley
     * @param {Number} x x-value from which the throw starts
     * @param {Number} y y-value from which the throw starts
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');  //super()-constructor is needed because ThrowableObject -> MovableObject -> DrawableObject (loadImage() is here!)
        this.loadImages(this.BOTTLE_ROTATION); //super() only needed once; paths of BOTTLE_ROTATION-Array are stored into the imageCache via loadImages() of DrawableObject
        this.loadImages(this.BOTTLE_SPLASH); //super() only needed once; paths of BOTTLE_SPLASH-Array are stored into the imageCache via loadImages() of DrawableObject
        this.loadImages(this.BOTTLE_ONGROUND); //super() only needed once; paths of BOTTLE_ONGROUND-Array are stored into the imageCache via loadImages() of DrawableObject
        this.x = x;
        this.y = y;
        this.throw(this.x, this.y); //As soon as the Object is created it also gets thrown
    }


    /**
     * Generates randomly an image for bottles that is leaned to the left or leaned to the right, when bottles are on the ground
     * @returns path of img that will be shown when bottle is lying on ground
     */
    randomBottleonGround() {
        if (Math.random() < 0.5) { this.imgBottle = this.BOTTLE_ONGROUND[0] }
        else { this.imgBottle = this.BOTTLE_ONGROUND[1] };
        return this.imgBottle;
    }


    /**
     * Depending on the Looking-Direction of the Character the Bottle gets thrown to the right or to the left
     * @param {Number} x x-value from which the throw starts
     * @param {Number} y y-value from which the throw starts
     */
    throw(x, y) {
        let characterLookingtotheLeft = world.character.otherDirection;

        if (characterLookingtotheLeft == false) {
            this.x = x; //Point from which the bottle is thrown when Character is looking to the right
            this.y = y; //Point from which the bottle is thrown when Character is looking to the right
        }
        else if (characterLookingtotheLeft == true) {
            x = x - 100; //Point from which the bottle is thrown when Character is looking to the left
            y = y + 10; //Point from which the bottle is thrown when Character is looking to the left
        }

        this.bottleHasBeenThrown(x, y, characterLookingtotheLeft); //Bottle has been thrown
    }


    /**
     * As Bottle has been thrown it can be flying or hitting the ground after some time
     * @param {Number} x x-value from which the throw starts
     * @param {Number} y y-value from which the throw starts
     * @param {Boolean} directionFlyingtotheLeft true if bottle is flying to the left & then hitting the ground on the left, else false
     */
    bottleHasBeenThrown(x, y, directionFlyingtotheLeft) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();

        this.intervalIDRotation = setInterval(() => {
            if (this.isAboveGround()) {
                this.bottleFlying(directionFlyingtotheLeft);
            }
            else {
                this.bottleHittingtheGround();
            };
        }, 25)
        intervalCollection.push(this.intervalIDRotation);
    }


    /**
    * Bottle Flying and Rotating
    * @param {*} directionFlyingtotheLeft true if bottle is flying to the left & then hitting the ground on the left, else false
    */
    bottleFlying(directionFlyingtotheLeft) {
        if (directionFlyingtotheLeft == true) {this.x -= 10;} else {this.x += 10;}  // Bottle flying to the Left or to the Right    
        this.playAnimation(this.BOTTLE_ROTATION); //Bottle is Rotating as long as it is above the ground
    }


    /**
     * Bottle hitting the ground and lying there AND rotation ends
     */
    bottleHittingtheGround() {
        clearInterval(this.intervalIDRotation); //Bottle musn't rotate any more
        this.loadImage(this.randomBottleonGround()); //Random bottle-image is shown for the bottle on ground 
    }

    
    /**
     * Bottle with a certain is splashed through colliding with enemy
     * @param {Number} index index of Bottle
     */
    splashed(index) {
        clearInterval(this.intervalIDRotation); //Bottle musn't rotate any more

        this.intervalIDSplashedBottle = setInterval(() => {
            this.playAnimation(this.BOTTLE_SPLASH); //Splashed-animation
        }, 25)
        intervalCollection.push(this.intervalIDSplashedBottle);

        setTimeout(function () {
            world.throwableObjects.splice(index, 1); //Delete bottle from the throwableObjects-Array, after waiting 500ms for the splashed-animation to be played    
        }, 500);
    }

}
