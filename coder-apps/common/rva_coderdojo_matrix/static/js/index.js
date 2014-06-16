// The page must be loaded first before the script can run.
// This makes sure that the page is loaded first.
$(document).ready(function () {
    // Check to see if the browser is capable of showing an HTML 5 canvas.
    // If so we can do matrix rain!
    if (!!window.HTMLCanvasElement) {
        var matrixRain = new MatrixRain(); // Create a Javascript Object of MatrixRain
        matrixRain.setImageURL(staticurl  + '/media/rva-coderdojo-lg.png');

        // Try changing this to see what happens!
        matrixRain.setText("WELCOME TO THE RVA CODER DOJO");

        // I wonder what happens if you change this number?
        matrixRain.setFontSize(10);

        // Too fast or too slow?  You are in control.
        // Try changing this value.
        matrixRain.setDelay(80);

        // Try different colors..  remember:
        // - rgb(redColor, greenColor, blueColor)
        // - Colors can go from 0 [dark] to 255 [bright]
        // - So rgb(255, 0, 255) will be bright purple (red + blue).
        matrixRain.setFontColor('#00FF00');

        // Start running the matrix rain animation!
        matrixRain.start();
    }
    else
    {
        // If we can't add an HTML 5 canvas, just show the coder dojo non-animated image.
        // Add a fallback image if canvas is not supported.
        var fallback = document.createElement('img'); // Creates a regular <img> tag.
        fallback.id='matrix-fallback';
        fallback.src = staticurl  + '/media/rva-coderdojo-nocanvas-lg.png';
        // Attaches the RVA coder dojo image to the page as a regular html <img>
        document.body.appendChild(fallback);
    }
});