class StatusBar extends DrawableObject {
    percentage;
    img; // String with Image-Path
    //Array that stores the Image-paths of the Images for the StatusBar-Object when Health-StatusBar
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    //Array that stores the Image-paths of the Images for the StatusBar-Object when Coin-StatusBar
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    //Array that stores the Image-paths of the Images for the StatusBar-Object when Bottle-StatusBar
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    //Array that stores the Image-paths of the Images for the StatusBar-Object when Endboss-StatusBar
    IMAGES_ENDBOSS = [
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/0.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/20.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/40.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/60.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/80.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png'
    ];
    //Array that stores the Image-paths of the Images for the StatusBar-Object when Endboss-StatusBar
    IMAGES_ENDBOSS2 = [
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/endboss.png'
    ];


    /**
     * Creates the statusbar of a certain type at a certain (x,y)-position with a certain starting-percentage AND a certain width & height
     * @param {String} type Type of the statusBar
     * @param {Number} x x-value for positioning of the statusBar
     * @param {Number} y x-value for positioning of the statusBar
     * @param {Number} percentage starting-percentage of the statusBar
     * @param {Number} width width of the statusBar
     * @param {Number} height height of the statusBar
     */
    constructor(type, x, y, percentage, width, height) {
        super(); //super()-constructor is needed because StatusBarObject -> DrawableObject (loadImage() is here!)
        if (type == 'Health') { this.loadImages(this.IMAGES_HEALTH); } //super() only needed once; paths of IMAGES_HEALTH-Array are stored into the imageCache via loadImages() of DrawableObject
        if (type == 'Coins') { this.loadImages(this.IMAGES_COIN); } //super() only needed once; paths of IMAGES_COIN-Array are stored into the imageCache via loadImages() of DrawableObject
        if (type == 'Bottles') { this.loadImages(this.IMAGES_BOTTLE); } //super() only needed once; paths of IMAGES_BOTTLE-Array are stored into the imageCache via loadImages() of DrawableObject
        if (type == 'Endboss') { this.loadImages(this.IMAGES_ENDBOSS); } //super() only needed once; paths of IMAGES_ENDBOSS-Array are stored into the imageCache via loadImages() of DrawableObject
        if (type == 'EndbossPic') { this.loadImages(this.IMAGES_ENDBOSS2); } //super() only needed once; paths of IMAGES_ENDBOSS2-Array are stored into the imageCache via loadImages() of DrawableObject

        this.setPercentage(type, percentage); //Places the first Image according to the percentage-parameter
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.width = width;
        this.height = height;
    }


    /**
     * Sets a certain type StatusBar to a certain percentage
     * @param {String} type Type of the statusBar
     * @param {Number} percentage Percentage of the statusBar
     */
    setPercentage(type, percentage) {
        //Received percentage-value is stored in the variable 'this.percentage' of the Instance of this class (StatusBar)
        if (percentage < 0) { this.percentage = 0 }
        else if (percentage > 100) { this.percentage = 100 }
        else { this.percentage = percentage };

        this.setImageAccordingtoPercentage(type);
    }


    /**
     * Sets 'this.img' according to 'this.percentage'
     * @param {String} type Type of the statusBar
     */
    setImageAccordingtoPercentage(type) {  
        let path; //Saves the 'path' to the Image calculated through the calculated Index (0...5) from resolveImageIndex()
        if (type == 'Health') { path = this.IMAGES_HEALTH[this.resolveImageIndex()]; }
        if (type == 'Coins') { path = this.IMAGES_COIN[this.resolveImageIndex()]; }
        if (type == 'Bottles') { path = this.IMAGES_BOTTLE[this.resolveImageIndex()]; }
        if (type == 'Endboss') { path = this.IMAGES_ENDBOSS[this.resolveImageIndex()]; }
        if (type == 'EndbossPic') { path = this.IMAGES_ENDBOSS2[this.resolveImageIndex()]; }
        this.img = this.imageCache[path]; //Needed Image gets saved into 'this.img' after fetching it via path from the 'imageCache'
    }

    
    /**
     * Function that calculates an Index according to 'this.percentage'
     * @returns Index between 0 and 5
     */
    resolveImageIndex() {
        if (this.percentage == 100) { return 5 }
        else if (this.percentage >= 80) { return 4 }
        else if (this.percentage >= 60) { return 3 }
        else if (this.percentage >= 40) { return 2 }
        else if (this.percentage >= 20) { return 1 }
        else { return 0 };
    }

}   