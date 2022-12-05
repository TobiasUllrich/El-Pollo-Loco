class level{
enemies;
coins;
clouds;
backgroundObjects;
level_end_x = 2200;  // End of the level: x-value has a value, where the right black Border can't be seen anymore


/**
 * At Creation of a new level, all movable objects that should be created have to be transfered as Arrays
 * @param {Array with Objects} enemies Chicken, ChickenSmall, Endboss
 * @param {Array with Objects} coins Coins
 * @param {Array with Objects} clouds Clouds
 * @param {Array with Objects} backgroundObjects Background-Objects
 */
constructor(enemies,coins,clouds,backgroundObjects){
  this.enemies=enemies;
  this.coins=coins;
  this.clouds=clouds;
  this.backgroundObjects=backgroundObjects;
}

}