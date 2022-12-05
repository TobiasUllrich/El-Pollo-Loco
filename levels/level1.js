let level1;


/**
 * initLevel() creates a new level with new objects and stores them in the variable 'level1'
 */
function initLevel() {
level1 = new level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Endboss()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/2.png', -500),
        new Cloud('img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 500),
        new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
        new Cloud('img/5_background/layers/4_clouds/2.png', 1500),
        new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
        new Cloud('img/5_background/layers/4_clouds/2.png', 2500),
        new Cloud('img/5_background/layers/4_clouds/2.png', 3000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 3500),
        new Cloud('img/5_background/layers/4_clouds/2.png', 4000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 4500),
        new Cloud('img/5_background/layers/4_clouds/2.png', 5000),
        new Cloud('img/5_background/layers/4_clouds/2.png', 5500)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', 0),   // 720-1 damit kein Rand sichtbar wird
        new BackgroundObject('img/5_background/layers/air.png', -719),  
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),  
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),  
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
    ]
);
}