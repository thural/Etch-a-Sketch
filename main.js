///////////////////////////////////////////// HTML Foundation /////////////////////////////////////////////////////

//header element with the title
const h1 = document.createElement('h1');
h1.setAttribute('style', 'color:purple')
h1.textContent = 'Etch A Sketch';
document.body.appendChild(h1);

//Default global values
var ink = 'black';
var currentSize = 16;
let color = 'white';
let size = 16;

//main container
const container = document.createElement('div');
container.id = 'mainContainer';
container.className = 'center';
document.body.appendChild(container);

//div to wrap pixelContainer
const pixelBoard = document.createElement('div');
pixelBoard.id = "pixelBoard"
container.appendChild(pixelBoard);

//div for pixel controls
const pixelControlBoard = document.createElement('div');
pixelControlBoard.id = 'pixelControlBoard';
container.appendChild(pixelControlBoard);

//div to wrap pigmentContainer
const pigmentBoard = document.createElement('div');
pigmentBoard.id = 'pigmentBoard';
container.appendChild(pigmentBoard);

//div for pigment controls
const pigmentControlBoard = document.createElement('div');
pigmentControlBoard.id = 'pigmentControlBoard';
container.appendChild(pigmentControlBoard);

////////////////////////////////////////////////////// Element Constructors //////////////////////////////////////

//constructs pixel contianer in pixelBoard
const pixelConstructor = function(size) {
    //Container for pixel divs
    const pixelContainer = document.createElement('div');
    pixelContainer.setAttribute('id', 'pixelContainer');
    pixelBoard.appendChild(pixelContainer);
    //Pixel numbers for the pixelgenerator below
    let pixelNums = size * size;
    //Generating multiple pixels as divs, in the container
    for (i = 0; i < pixelNums; i++) {
        const pixel = document.createElement('pixel');
        pixelContainer.appendChild(pixel);
    }
    //Set grid style according to pixel numbers
    pixelContainer.setAttribute('style', `grid-template:repeat(${size},${640/size}px)/repeat(${size},${640/size}px)`)
    currentSize = size
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

///////////////////////////////////////////////////// Startup Calls /////////////////////////////////////////////

//Draw a default 16x16 pixel grid at startup
pixelConstructor(16);

//Draw a default pigment grid at startup
pigmentConstructor('colorful');

/////////////////////////////////////////////////// Control Buttons /////////////////////////////////////////////

//pixel mode button for 16x16 pixels
const pixelModeOne = document.createElement('button');
pixelModeOne.textContent = '16x16';
pixelControlBoard.appendChild(pixelModeOne);

//pixel mode button for 32x32 pixels
const pixelModeTwo = document.createElement('button');
pixelModeTwo.textContent = '32x32';
pixelControlBoard.appendChild(pixelModeTwo);

//pixel mode button for 64x64 pixels
const pixelModeThree = document.createElement('button');
pixelModeThree.textContent = '64x64';
pixelControlBoard.appendChild(pixelModeThree);

//pixel mode button for custom pixel size
const pixelModeCustom = document.createElement('button');
pixelModeCustom.textContent = 'Custom';
pixelControlBoard.appendChild(pixelModeCustom);

//erase button inside the controls div
const eraseBtn = document.createElement('button');
eraseBtn.textContent = 'Erase';
pigmentControlBoard.appendChild(eraseBtn);

//clear button inside the controls div
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear';
pigmentControlBoard.appendChild(clearBtn);

//colorful button
const colorBtn = document.createElement('button');
colorBtn.textContent = 'Colorful';
pigmentControlBoard.appendChild(colorBtn);

//monochrome button
const monoBtn = document.createElement('button');
monoBtn.textContent = 'Monochrome';
pigmentControlBoard.appendChild(monoBtn);

/////////////////////////////////////////////// Listeners for Mouse Events ////////////////////////////////////

//function to load listeners for pixelContainer
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

    //mousemove listener for pixelContainer, changes color of pixels while mouseIsDown is true
    pixelContainer.addEventListener('mousemove', event => {
        event.stopPropagation();
        mouseIsDown ? event.target.style.backgroundColor = ink : null
    })
};

//Call listeners to register events on pixels
pixelListener();

//click listener for erase button, changes ink color to default
eraseBtn.addEventListener('click', event => ink = 'white')

//click listener for clear button, deletes current pixelContainer and re-calls pixelConstructor
clearBtn.addEventListener('click', event => {
    pixelContainer.parentNode.removeChild(pixelContainer);
    pixelConstructor(currentSize);
    //Listeners should be re-called every time if pixelContainer is re-built
    pixelListener()
});

//click listener for colorful button, deletes current pigmentContainer and re-calls pigmentConstructor
colorBtn.addEventListener('click', event => {
    pigmentContainer.parentNode.removeChild(pigmentContainer);
    pigmentConstructor('colorful')
});

//click listener for monochrome button, deletes current pigmentContainer and re-calls pigmentConstructor
monoBtn.addEventListener('click', event => {
    pigmentContainer.parentNode.removeChild(pigmentContainer);
    pigmentConstructor('monochrome')
});

//click listener for the button to re-build the pixelContainer with the defined size
pixelModeOne.addEventListener('click', event => {
    pixelContainer.parentNode.removeChild(pixelContainer);
    pixelConstructor(16);
    pixelListener()
});

//click listener for the button to re-build the pixelContainer with the defined size
pixelModeTwo.addEventListener('click', event => {
    pixelContainer.parentNode.removeChild(pixelContainer);
    pixelConstructor(32);
    pixelListener()
});

//click listener for the button to re-build the pixelContainer with the defined size
pixelModeThree.addEventListener('click', event => {
    pixelContainer.parentNode.removeChild(pixelContainer);
    pixelConstructor(64);
    pixelListener()
});

//click listener for the button to re-build the pixelContainer with custom size
pixelModeCustom.addEventListener('click', event => {
    do {
        size = Number(prompt('Enter a value not higher than 100'));
        console.log(size);
        if (size == null || size == undefined) break
    } while (!(size == false) && size > 100);
    pixelContainer.parentNode.removeChild(pixelContainer);
    size ? pixelConstructor(size) : pixelConstructor(16);
    pixelListener()

});