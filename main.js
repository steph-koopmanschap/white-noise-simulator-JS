/*
// NAME: White Noise Generator
// CONTRIBUTORS: Steph Koopmanschap
// VERSION: 1.0
*/

//Screen Settings
var ScreenWidth = 800;
var ScreenHeight = 600;
var MainScreen = null;
var Canvas2D = null;
//Updates per second
var RefreshRate = 24; 
//Convert refresh rate to miliseconds
var FrameRate = (1/RefreshRate) * 1000; 
var PixelSize = 1;
var isColorized = false;
var GlobalClockID;
var isRunning = false;
var InputSlider = document.getElementById('pixelDensity');
var InputCheckbox = document.getElementById('colorToggle');

//returns a random integer between min and max
function randIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a random Hex color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
 }

function generateNoise() {
    //remove the previous frame first
    clearCanvas();
    //Get input
    PixelSize = parseInt(InputSlider.value);
    isColorized = InputCheckbox.checked;
    //Draw pixels
    for (let i = 0; i < ScreenWidth; i += PixelSize) {
        for (let j = 0; j < ScreenHeight; j += PixelSize) {

            let pixelColor = "black"
            //Monochrome pixels
            if(isColorized === false) {
                let blackOrWhite = randIntRange(0, 1);
                if (blackOrWhite === 1) {
                    pixelColor = "white";
                }
            }
            //Colored pixels
            else if(isColorized === true) {
                pixelColor = getRandomColor();
            }
            //Draw
            Canvas2D.fillStyle = pixelColor;
            Canvas2D.fillRect(i, j, PixelSize, PixelSize);
        }
    }
}

function clearCanvas() {
    Canvas2D.fillStyle = "black";
    Canvas2D.clearRect(0, 0, ScreenWidth, ScreenHeight);
}

//Initialize Screen
function initScreen() {
    //create the screen
    MainScreen = document.createElement("canvas");
    MainScreen.width = ScreenWidth;
    MainScreen.height = ScreenHeight;
    MainScreen.style.margin = "10px";
    MainScreen.style.border = "4px solid orange";
    MainScreen.style.backgroundColor = "black";
    Canvas2D = MainScreen.getContext("2d");
    document.body.insertBefore(MainScreen, document.body.childNodes[3]);
}

function startNoise() {
    if (isRunning === false) {
        GlobalClockId = setInterval(function() {
            generateNoise();
        }, FrameRate);
    }
    isRunning = true;
}

function stopNoise() {
    if (isRunning === true) {
        clearInterval(GlobalClockId);
        Canvas2D.fillStyle = "black";
        Canvas2D.clearRect(0, 0, ScreenWidth, ScreenHeight);
    }
    isRunning = false;
}

initScreen();
