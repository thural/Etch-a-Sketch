///////////////////////////////////////////// HTML Foundation /////////////////////////////////////////////////////

//header element with the title
const h1 = document.createElement('h1');
h1.setAttribute('style', 'color:purple')
h1.textContent = 'Etch A Sketch';
document.body.appendChild(h1);

//Default global values
var ink = 'black';
let color = 'white';
let size = 256;

//div to wrap pixelContainer
const pixelBoard = document.createElement('div');
pixelBoard.id = "pixelBoard"
document.body.appendChild(pixelBoard);

//div to wrap pigmentContainer
const pigmentBoard = document.createElement('div');
pigmentBoard.id = 'pigmentBoard';
document.body.appendChild(pigmentBoard);

////////////////////////////////////////////////////// Element Constructors //////////////////////////////////////

//constructs pixel contianer into pixelBoard
const pixelConstructor = function(size) {
    //Container for pixel divs
    const pixelContainer = document.createElement('div');
    pixelContainer.setAttribute('id', 'pixelContainer');
    pixelBoard.appendChild(pixelContainer);

    //Creating multiple pixels as divs, in the container
    for (i = 0; i < size; i++) {
        const pixel = document.createElement('pixel');
        pixelContainer.appendChild(pixel);
    }
};

//Constructs pigment container into pigmentBoard
const pigmentConstructor = function(colorMode) {
    //Container for pigment divs
    const pigmentContainer = document.createElement('div');
    pigmentContainer.setAttribute('id', 'pigmentContainer');
    pigmentBoard.appendChild(pigmentContainer);

    //generate randomized HSL color values
    const randomColor = function(colorMode) {
        let h = Math.round(Math.random() * 359);
        let s = Math.round(Math.random() * 100);
        let l = Math.round(Math.random() * 100);
        if (colorMode == 'monochrome') {
            return `hsl(${h} , ${0}%, ${l}%)`
        } else {
            return `hsl(${h} , ${s}%, ${l}%)`
        }
    };

    //multiple pigments as divs in thepigment
    for (i = 0; i < 128; i++) {
        const pigment = document.createElement('pigment');
        pigment.style.backgroundColor = randomColor(colorMode);
        pigmentContainer.appendChild(pigment);
    };

    //click event listener for pigmentContainer
    pigmentContainer.addEventListener('click', event => {
        ink = event.target.style.backgroundColor
    })
};

///////////////////////////////////////////////////// Startup calls /////////////////////////////////////////////

//Draw a default 16x16 pixel grid at startup
pixelConstructor(256);

//Draw a default pigment grid
pigmentConstructor('colorful');

/////////////////////////////////////////////////// Control buttons /////////////////////////////////////////////

//container for buttons
const controls = document.createElement('div');
document.body.appendChild(controls);
controls.id = "controls";

//erase button inside the controls div
const eraseBtn = document.createElement('button');
eraseBtn.textContent = 'Erase';
controls.appendChild(eraseBtn);


//clear button inside the controls div
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear';
controls.appendChild(clearBtn);


//colorful button
const colorBtn = document.createElement('button');
colorBtn.textContent = 'Colorful';
controls.appendChild(colorBtn);

//monochrome button
const monoBtn = document.createElement('button');
monoBtn.textContent = 'Monochrome';
controls.appendChild(monoBtn);

/////////////////////////////////////////////// listeners for mouse events ////////////////////////////////////

const pixelListener = function() {
    //updates status of mouseIsDown
var mouseIsDown = false;
pixelContainer.addEventListener('mousedown', event => {
    event.stopPropagation();
    mouseIsDown = true
});
    //mouseup listener for pixelContainer, changes color of pixels when mouse button is up
    pixelContainer.addEventListener('mouseup', event => {
        event.stopPropagation();
        event.target.style.backgroundColor = ink;
        mouseIsDown = false
    });

    //mouse move listener for pixelContainer, changes color of pixels while mouseIsDown is true and mouse moves over
    pixelContainer.addEventListener('mousemove', event => {
        event.stopPropagation();
        if (mouseIsDown) {
            event.target.style.backgroundColor = ink;
        }
    })
};

//Load listeners to register events pixels
pixelListener();

//mouse click listener for erase button, changes ink color to default
eraseBtn.addEventListener('click', event => ink = 'white')

//mouse click listener for clear button, deletes current pixelContainer and re-calls pixelConstructor
clearBtn.addEventListener('click', event => {
    pixelContainer.parentNode.removeChild(pixelContainer);
    pixelConstructor(256);
    pixelListener()
});

//mouse click listener for colorful button, deletes current pigmentContainer and re-calls pigmentConstructor
colorBtn.addEventListener('click', event => {
    pigmentContainer.parentNode.removeChild(pigmentContainer);
    pigmentConstructor('colorful')
});

//mouse click listener for monochrome button, deletes current pigmentContainer and re-calls pigmentConstructor
monoBtn.addEventListener('click', event => {
    pigmentContainer.parentNode.removeChild(pigmentContainer);
    pigmentConstructor('monochrome')
});