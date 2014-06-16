// Original matrix-rain code from: http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// (refactored and enhanced by RVA Coder Dojo)

// We are using a Javascript style of coding to create a call called "MatrixRain" here.
function MatrixRain (containerId) {

    // This will insert a <div> into the page and give it the id 'matrix-canvas-stack'
    this.canvasStackDiv = document.createElement('div');
    this.canvasStackDiv.id='matrix-canvas-stack';

    // If the user of this class passes in a containerId value, then we will place the
    // 'matrix-canvas-stack' inside the provided container element in the page.
    // this lets the user position the matrix rain logo wherever they want on the page.
    if (containerId != null && document.getElementById(containerId) != null) {
        this.container = document.getElementById(containerId);
        this.container.appendChild(this.canvasStackDiv);
    }
    else // If not, we just drop the 'matrix-canvas-stack' as the last element in the page.
        document.body.appendChild(this.canvasStackDiv);

    // These next values are defaults which can be changed using
    // the set method defined later on.

    // this is the default speed for the rain.
    this.renderDelay = 50;

    // This will be the URL for the overlay image (if you have one) default is no image.
    this.imageURL = null;

    // This can be a link to jump to if the user clicks on the logo. default is none
    this.gotoURL = null;

    // These are just random looking matrix characters by default.  They can be changed.
    this.matrixText =  '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑';

    // This is the default font size for the matrix rain letters.
    this.fontSize=8;

    // This is the default color (bright green)
    this.fontColor='rgb(0,255,0)';
};

// Call setGotoURL to create a landing web page to go to when the user clicks on the rain.
MatrixRain.prototype.setGotoURL = function(gotoURL) {
    if (gotoURL != null) {
        this.gotoURL = gotoURL;
    }
};

// Call setText to put your own secret message in the rain.
MatrixRain.prototype.setText = function (textIn) {
    if (textIn != null)
        this.matrixText = textIn;
};

// Call setDelay with a number.  Bigger numbers make the rain animate slower.
// Smaller numbers make it go faster.
MatrixRain.prototype.setDelay = function (delayIn) {
    if (delayIn != null && delayIn >= 0)
        this.renderDelay = delayIn;
};

// Call setImageURL to create an overlay image for the rain.  Only the transparent portions of
// the image will show the rain.
MatrixRain.prototype.setImageURL = function (imageURL) {
    if (imageURL != undefined)
        this.imageURL = imageURL;
};

// Call setFontSize to change how big or small the letters are that make up your secret message.
MatrixRain.prototype.setFontSize = function (fontSize) {
    if (fontSize != undefined && fontSize > 0)
        this.fontSize = fontSize;
};

// This helps to resize the canvas.
MatrixRain.prototype.resize = function (width, height) {
    this.matrixCanvas.width=width;
    this.matrixCanvas.height= height;
    if (this.matrixOverlay != undefined) {
        this.matrixOverlay.width=width;
        this.matrixOverlay.height=height;
    }
};

// This creates an HTML 5 canvas element with the provided name (id), height and width.
MatrixRain.prototype.createCanvas = function (id, width, height) {
    var newCanvas = document.createElement('canvas');
    newCanvas.id = id;
    if (width != null)
        newCanvas.width = width;
    if (height != null)
        newCanvas.height = height;

    // sets the alignment so the layers will overlap.
    newCanvas.style.position="absolute";
    newCanvas.style.backgroundColor="transparent";

    return newCanvas;
};

// This is the function to start the matrix rain animation.  Call it
// after you have created a MatrixRain javascript object, and called
// all the setters you want to configure your rain.  For example:
//      var matrixRain = new MatrixRain();
//      matrixRain.setText('Hello World');
//      matrixRain.setFontSize(12);
//      matrixRain.start();
MatrixRain.prototype.start = function() {
    this.matrixCanvas = this.createCanvas('matrix-canvas');
    this.matrixCanvas.style.zIndex=0;
    this.matrixCanvas.style.background="black";
    this.canvasStackDiv.appendChild(this.matrixCanvas);
    if (this.imageURL != null) {
        img = new Image();
        img.matrix = this;
        img.onerror = function() {
            this.matrix.startRain();
            window.console && console.log('Could not load image: ' + this.imageURL);
        };
        img.onload = function() {
            this.matrix.addOverlay(img);
            this.matrix.startRain();
        };
        img.src = this.imageURL;
    }
    else {
        this.startRain();
    }
};

// This function adds the overlay image as an HTML 5 canvas on top of the rain animation
// It is sized to be the same height and width as the rain animation.
MatrixRain.prototype.addOverlay = function(image) {
    this.matrixOverlay = this.createCanvas('matrix-overlay', image.width, image.height);
    this.matrixOverlay.style.zIndex=10;
    this.canvasStackDiv.appendChild(this.matrixOverlay);
    this.resize(image.width, image.height);
    var context = this.matrixOverlay.getContext('2d');
    context.drawImage(image, 0,0);
};

// This will do the initial setup for the matrix rain data.
MatrixRain.prototype.startRain = function() {
    this.mtxCtx = this.matrixCanvas.getContext('2d');

    this.matrixText = this.matrixText.split("");

    // How many characters across the canvas
    this.columns = this.matrixCanvas.width / this.fontSize;
    this.drops = [];

    // Where to start in the matrix code
    // This allows for readable text messages to rain down.
    this.textIndex = [];

    for (var x = 0; x < this.columns; x++) {
        this.drops[x] = this.matrixCanvas.height + 1;
        this.textIndex[x] = Math.floor(Math.random() * this.matrixText.length);
    }

    // this is a poor hack to attach to the global namespace for the callback
    window.MatrixRainInstance = this;

    // This sets a timer to wait until "renderDelay" expires
    // then call the "render()" function (defined below)
    // this process repeats forever until the user leaves the page.
    setInterval(this.render, this.renderDelay);
};

// This function is the animation for the matrix rain.
MatrixRain.prototype.render = function() {

    // This gets access to the matrix rain class
    var _this = window.MatrixRainInstance;

    // Fill the canvas with a very transparent black.
    // This is what causes the letters to slowly fade out.
    _this.mtxCtx.fillStyle="rgba(0,0,0,0.05)";
    _this.mtxCtx.fillRect(0, 0, _this.matrixCanvas.width, _this.matrixCanvas.height);

    // Now set the color and font size for the matrix text
    _this.mtxCtx.fillStyle = _this.fontColor;
    _this.mtxCtx.font = _this.fontSize + "px arial";

    // Loop over each of the drops
    for (var i=0; i < _this.drops.length; i++) {

        // Start adding text to the canvas
        _this.textIndex[i] = (_this.textIndex[i] + 1) % _this.matrixText.length;
        var text = _this.matrixText[_this.textIndex[i]];

        // x = i * fontSize, y = value of drops[i]*fontSize
        _this.mtxCtx.fillText(text, i*_this.fontSize, _this.drops[i]*_this.fontSize);

        // reset a drop after it hits the bottom and have it start to drop from the top.
        if (_this.drops[i] * _this.fontSize > _this.matrixCanvas.height && Math.random() > 0.875) {
            _this.drops[i] = 0;
        }

        // bump Y coordinate
        _this.drops[i]++;
    }
};


