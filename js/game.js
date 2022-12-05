let isInFullscreen = false;
let canvas;
let world;
let keyboard = new Keyboard();
let gameEnded = false;
let gameEndSoundPlayed = false;
let muted = false;
let intervalCollection =[]; //Collects the ID of all running Intervals
let gameintervalID; //Needed to clear Intervals


/**
 * Clears all Intervals (needed before start of the game) & deletes it from the intervalCollection-Array
 */
function clearAllIntervals() {
    let repeat = 500;
    for (let i = 0; i < repeat; i++) {
        clearInterval(intervalCollection[0]);
        intervalCollection.splice(0,1);
    }
}


/**
 * New objects are created via initLevel(), HTML-Canvas gets stored in canvas variable AND a new World is created
 * AND gameEndSound was of course not played AND Game is started in an muted or unmuted state
 */
function startGame() {
    gameEnded = false; //Game has just started
    initLevel(); //Objects have to be created before the world, otherwise they are not accessible
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); //New world gets stored in variable 'world'
    
    gameEndSoundPlayed = false;
    if(muted==true){muteGame()}else{unmuteGame()}; 
    hideRotateInfo(); //Hides Rotate-Info
    showCanvas(); //Now you can play
}


/**
 * Ends Game via Endscreen 3 seconds after Character OR Endboss has died
 * @param {String} lostOrWon Contains 'Game Lost' OR 'Game Won'
 * @param {Date} time Time when Character died OR Endboss died
 */
function gameHasEnded(lostOrWon,time) {
    
    if(gameEnded == false){
    gameintervalID = setInterval(() => {if((time+3000)<new Date().getTime() && !gameEnded){ 
        showEndscreen(); //Shows Endscreen after 3 seconds
    }}, 125);
    intervalCollection.push(gameintervalID);

    stopGameSounds();
    repositionEndscreen();
    playGameEndedSound(lostOrWon);
   }
}


/**
 * Makes the canvas object visible on the HTML-Page
 */
function showCanvas(){
    setTimeout(function () {
        document.getElementById('canvas').classList.remove('d-none'); 
        document.getElementById('startscreen').classList.add('d-none'); 
    }, 500);
}


/**
 * Shows Endscreen when the Game has ended
 */
function showEndscreen(){
    clearAllIntervals();
    document.getElementById('endscreen').classList.remove('d-none');
    gameEnded = true;     
}


/**
 * Stops the Game-Sounds when the Game is over
 */
function stopGameSounds(){
    world.game_sound.pause();
    world.game_sound.currentTime = 0; //Sets game_sound to the beginning
}


/**
 * Plays a Sound when the Game has ended
 * @param {String} lostOrWon Contains 'Game Lost' OR 'Game Won'
 */
function playGameEndedSound(lostOrWon){
    if (lostOrWon == 'Game Lost' && gameEndSoundPlayed == false) { world.playSound('audio/game over.mp3') }
    else if (lostOrWon == 'Game Won' && gameEndSoundPlayed == false) { world.playSound('audio/game victory.wav') };
    gameEndSoundPlayed = true;
}


/**
 * Shows Start-Screen
 */
 function showStartscreen(){
    clearAllIntervals();
    document.getElementById('startscreen').classList.remove('d-none'); 
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    showRotateInfo(); 
}


/**
 * Starts Game after clearing Intervals
 */
function restartGame() {
    clearAllIntervals();
    document.getElementById('sound-img').src = 'img/volume-32.png';
    document.getElementById('endscreen').classList.add('d-none');
    startGame();
}


/**
 * Observes if a certain Key is pressed down
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) { keyboard.RIGHT = true; }
    if (e.keyCode == 37) { keyboard.LEFT = true; }
    if (e.keyCode == 38) { keyboard.UP = true; }
    if (e.keyCode == 40) { keyboard.DOWN = true; }
    if (e.keyCode == 32) { keyboard.SPACE = true; }
    if (e.keyCode == 68) { keyboard.D = true; }
    if (e.keyCode == 70) { keyboard.F = true; }
    if (e.keyCode == 71) { keyboard.G = true; }
});


/**
 * Observes if a certain Key is released
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) { keyboard.RIGHT = false; }
    if (e.keyCode == 37) { keyboard.LEFT = false; }
    if (e.keyCode == 38) { keyboard.UP = false; }
    if (e.keyCode == 40) { keyboard.DOWN = false; }
    if (e.keyCode == 32) { keyboard.SPACE = false; }
    if (e.keyCode == 68) { keyboard.D = false; }
    if (e.keyCode == 70) { keyboard.F = false; }
    if (e.keyCode == 71) { keyboard.G = false; }
});


/**
 * Simulates/Creates an event, so you can use it e.g. with 'onclick()' in HTML-Code
 * @param {Number} keyCode keyCode of the event
 * @param {String} type type of the event
 */
function simulateKeyPressed(keyCode, type) {
    var event = document.createEvent("HTMLEvents"); //Event is created
    event.initEvent(type, true, false); //Event is initialised
    event.keyCode = keyCode; //Event gets the keyCode

    document.dispatchEvent(event);

    if (event.keyCode == 39 && type == 'keydown') { keyboard.RIGHT = true; }
    if (event.keyCode == 37 && type == 'keydown') { keyboard.LEFT = true; }
    if (event.keyCode == 38 && type == 'keydown') { keyboard.UP = true; }
    if (event.keyCode == 40 && type == 'keydown') { keyboard.DOWN = true; }
    if (event.keyCode == 32 && type == 'keydown') { keyboard.SPACE = true; }
    if (event.keyCode == 68 && type == 'keydown') { keyboard.D = true; }
    if (event.keyCode == 70 && type == 'keydown') { keyboard.F = true; }
    if (event.keyCode == 71 && type == 'keydown') { keyboard.G = true; }

    if (event.keyCode == 39 && type == 'keyup') { keyboard.RIGHT = false; }
    if (event.keyCode == 37 && type == 'keyup') { keyboard.LEFT = false; }
    if (event.keyCode == 38 && type == 'keyup') { keyboard.UP = false; }
    if (event.keyCode == 40 && type == 'keyup') { keyboard.DOWN = false; }
    if (event.keyCode == 32 && type == 'keyup') { keyboard.SPACE = false; }
    if (event.keyCode == 68 && type == 'keyup') { keyboard.D = false; }
    if (event.keyCode == 70 && type == 'keyup') { keyboard.F = false; }
    if (event.keyCode == 71 && type == 'keyup') { keyboard.G = false; }
}


/**
 * Observe if Fullscreen was left via observing Fullscreen-Change-Events (because ESCAPE-Event is not working!)
 */
window.addEventListener('fullscreenchange', exitFullscreenHandler);
window.addEventListener('webkitfullscreenchange', exitFullscreenHandler);
window.addEventListener('mozfullscreenchange', exitFullscreenHandler);
window.addEventListener('MSFullscreenChange', exitFullscreenHandler);


/**
 * Recognizes if Fullscreen was left, THEN re-positions Sound- & Fullscreen-Buttons
 */
function exitFullscreenHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        //Fullscreen was left
        isInFullscreen = false;
        repositionEndscreen();
        repositionCenteredButtonBarWhenLeavingFullscreen();
        repositionLeftRightButtonBarWhenLeavingFullscreen();
    }
}


/**
 * Turns muted sound ON again or turns sound OFF
 */
function muteOrActivateSound() {
    if (world.game_sound.paused) {
        unmuteGame();
    }
    else {
        muteGame();
    }
}


/**
 * Mutes the Game
 */
function muteGame() {
    muted = true;
    world.game_sound.pause();
    document.getElementById('sound-img').src = 'img/mute-32.png';
}


/**
 * Unmutes the Game
 */
function unmuteGame() {
    muted = false;
    world.game_sound.play();
    document.getElementById('sound-img').src = 'img/volume-32.png';
}


/**
 * Re-positions Sound- & Fullscreen-Buttons + Adds title
 */
function repositionCenteredButtonBarWhenLeavingFullscreen() {
    document.getElementById('fullscreen-img').src = 'img/fullscreen-32.png';
    document.getElementById('title').classList.remove('d-none'); //Adds title
    document.getElementById('button-bar').removeAttribute('style');
}


/**
 * Re-positions Sound- & Fullscreen-Buttons + Removes title
 */
function repositionCenteredButtonBarWhenEnteringFullscreen() {
    document.getElementById('fullscreen-img').src = 'img/fullscreen-exit-32.png';
    document.getElementById('title').classList.add('d-none'); //Removes title
    let heightOfcanvas = document.getElementById('canvas').clientHeight;
    heightOfcanvas = heightOfcanvas / 2;
    document.getElementById('button-bar').style.top = `calc(50vh - ${heightOfcanvas}px)`;
}


/**
 * Displays Endscreen over the canvas
 */
function repositionEndscreen() {
    let heightOftitle = document.getElementById('title').clientHeight;
    let heightOffullscreen = document.getElementById('fullscreen').clientHeight;
    document.getElementById('endscreen').style.top = `calc((${heightOftitle}px+${heightOffullscreen}px)/2) + ${heightOftitle}px + ${heightOffullscreen}/2 px)`; 
}


/**
 * Re-positions 'button-bar-left' & 'button-bar-right' (next to the canvas)
 */
function repositionLeftRightButtonBarWhenEnteringFullscreen() {
    let heightOfcanvas = document.getElementById('canvas').clientHeight;
    document.getElementById('button-bar-left').style.height = `${heightOfcanvas}px`;
    document.getElementById('button-bar-right').style.height = `${heightOfcanvas}px`;   
}


/**
 * Removes the height-attribute of 'button-bar-left' & 'button-bar-right' (next to the canvas)
 */
 function repositionLeftRightButtonBarWhenLeavingFullscreen() {
    document.getElementById('button-bar-left').style.removeProperty('height');
    document.getElementById('button-bar-right').style.removeProperty('height');   
}


/**
 * Closes Pop-Up with the description How to Play
 */
function closeHowToPlayPopUp(){
    document.getElementById('howtoplay-bg').classList.add('d-none');
    document.getElementById('howtoplay').classList.add('d-none');
}


/**
 * Opens Pop-Up with the description How to Play
 */
function openHowToPlayPopUp(){
    document.getElementById('howtoplay-bg').classList.remove('d-none');
    document.getElementById('howtoplay').classList.remove('d-none');
}


/**
 * Hides the text 'Please rotate your mobile-device!'
 */
function hideRotateInfo(){
    document.getElementById('rotate-info').classList.add('d-none');
}


/**
 * Shows the text 'Please rotate your mobile-device!'
 */
function showRotateInfo(){
    document.getElementById('rotate-info').classList.remove('d-none');
}


/**
 * Fullscreen enter OR Fullscreen leave depending which mode you are in right now
 */
function enterOrexitFullscreen() {
    if (!isInFullscreen) {
        fullscreen();
        repositionCenteredButtonBarWhenEnteringFullscreen();
        setTimeout(function () { repositionLeftRightButtonBarWhenEnteringFullscreen(); }, 50);//50ms needed to calculate the widths in repositionButtonBar2WhenEnteringFullscreen()
        isInFullscreen = true;
    }
    else {
        exitFullscreen();
        isInFullscreen = false;
        repositionCenteredButtonBarWhenLeavingFullscreen();
        repositionLeftRightButtonBarWhenLeavingFullscreen();
    }
}


/**
 * Activates Fullscreen for the element with id='fullscreen'
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


/**
 * Activates Fullscreen (https://wiki.selfhtml.org/wiki/JavaScript/Fullscreen)
 * @param {HTML-Element} element HTML-Element for which Fullscreen is activated
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * Leaves Fullscreen (https://wiki.selfhtml.org/wiki/JavaScript/Fullscreen)
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Checks if user clicks on the background, when HowToPlay-PopUp is opened -> If so then PopUp is closed
 * @param {PointerEvent} event PointerEvent that is triggered, when you click on something on the HTML-Page
 */
window.onclick = function(event) {  
     if(event.target.id == 'howtoplay-bg'){
        closeHowToPlayPopUp();
    }
}
