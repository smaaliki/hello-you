// The snow handing feature in the reindeer drawing was mostly copied wih some
// modifications from the following p5.js example
// https://p5js.org/examples/simulate-snowflakes.html

var img1;
var img2;
var antlerX = 0;
var antlerY = 0;
var antlersAngle = 0;
var antlersReleased = false;
var snowflakes = []; // array to hold snowflake objects
var angleModifier = 0;

function preload() {
    img1 = loadImage('/images/Knoblauch.jpg');
    img2 = loadImage('/images/Knadinsky.jpg');
}

function setup() {
    //Create the canvas and color it
    var myCanvas = createCanvas(1024, 768);
    myCanvas.parent('assignment1');
    background(120, 120, 120);

    //draw the images
    imageMode(CENTER);
    image(img1, 3 * width / 4, height / 4);
    image(img2, width / 4, 3 * height / 4, width / 2, height / 2);

    //Draw the Bauhaus inspired paintings
    drawKnoblaugh(0, 0, 12);  //the last number is the maximum number of slices
    drawKandinsky(width / 2, height / 2, 0);
}

function draw() {
    //Handle mouse hover over the replicated Knoblaugh  drawing
    if ((mouseX >= 0) && (mouseX < width / 2) && (mouseY >= 0) && (mouseY < height / 2)) {
        drawKnoblaugh(0, 0, round(12 * (1 - (mouseX / (width / 2)))));
    }

    //Handle mouse drag and release over the Kandinsky inspired drawing
    if (antlersReleased) {
        antlersAngle -= angleModifier;
        angleModifier -= (angleModifier / 10);
    }
    //The drawKandinsky function rotates the axis in order to handle the head turning.
    // Therefore, we need to push so that it doesn't affect the falling snow.
    push();
    drawKandinsky(width / 2, height / 2, antlersAngle);
    pop();

    //Make it snow on the reindeer
    handleSnow();
}

function handleSnow() {
    // Set the snow color
    fill(240);
    noStroke();

    var t = frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (var i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (var flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

function drawKnoblaugh(originX, originY, slices) {
    var from = color(14, 16, 15);
    var to = color(233, 209, 181);
    var centerX = width / 4;
    var centerY = height / 4;

    var interA = 0;
    var i = 0, start = 0;
    var sliceSize = 2 * PI / slices;

    //Draw the background
    fill(227, 209, 185);
    noStroke();
    rect(originX, originY, width / 2, height / 2);
    stroke(0, 0, 0);
    strokeWeight(2);

    //Draw the outer circle
    from = color(14, 16, 15);
    to = color(233, 209, 181);
    for (i = 0; i < slices; i++) {
        interA = lerpColor(from, to, i / (slices - 1));
        fill(interA);
        start = PI / 2 + i * sliceSize;
        arc(centerX, centerY, 300, 300, start, start + sliceSize);
    }

    //Draw the middle circle
    from = to;
    to = color(220, 6, 4);
    for (i = 0; i < slices; i++) {
        interA = lerpColor(from, to, i / (slices - 1));
        fill(interA);
        start = PI / 2 + i * sliceSize;
        arc(centerX, centerY, 225, 225, start, start + sliceSize);
    }

    //Draw the inner circle
    to = from;
    from = color(14, 16, 15);
    for (i = 0; i < slices; i++) {
        interA = lerpColor(from, to, i / (slices - 1));
        fill(interA);
        start = PI / 2 + i * sliceSize;
        arc(centerX, centerY, 150, 150, start, start + sliceSize);
    }

    //Draw the lines between the slices
    for (i = 0; i < slices; i++) {
        start = PI / 2 + i * sliceSize;
        line(centerX, centerY, centerX + cos(start) * 150, centerY + sin(start) * 150);
    }
}

function mousePressed() {
    //if ((mouseX > width/2) && (mouseY < height/2)){
    //range accounting for text length
    link("https://www.google.com", "_new");
    //}
}

function mouseDragged() {
    if ((mouseX > width / 2) && (mouseX < width) && (mouseY > height / 2) && (mouseY < height)) {
        //If the mosue is dragged within the reindeer drawing
        antlerX = mouseX - (0.75 * width);
        antlerY = mouseY - (0.75 * height) + 50; //The 50 compensates for the head being 50 pixels

        //Todo: This took a lot of trial and error.  I need to re-visit this at some poitn to understand what is going on and to make it smoother
        if (antlerX >= 0) {
            antlersAngle = atan2(antlerY, antlerX);
        } else {
            antlersAngle = atan2(-antlerY, -antlerX);
        }
        antlersReleased = false;
    }
    else {
        // If the mouse goes outside the reindeer drawing, release the head
        headReleased()
    }
}

function mouseReleased() {
    headReleased();
}

function headReleased() {
    // By dividing teh modifier by 10, it starts fast and slows down to sprign back into place
    //Todo: can we make this bounce like a bobble head or a spring?
    antlersReleased = true;
    angleModifier = antlersAngle / 10;
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = width / 2;
    this.posY = height / 2;
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(0.25 * width, 2)));

    this.update = function (time) {
        // x position follows a circle
        var w = 0.6; // angular speed
        var angle = w * time + this.initialangle;
        this.posX = 0.75 * width + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            var index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        ellipse(this.posX, this.posY, this.size);
    };
}

function drawKandinsky(originX, originY, angle) {
    //Colors:  These colors were picked from the original Kandinsky drawing
    // Brown: 106, 52, 50
    // Orange: 137, 73, 61
    // Dark Grey: 51,65,74
    // Pink: 153, 130, 124
    // Blue: 88, 100, 124

    translate(originX, originY);
    // Get the center of the drawing area
    var centerX = width / 4;
    var centerY = height / 4 + 30;

    //Draw the background
    fill(191, 195, 180);
    noStroke();
    rect(0, 0, width / 2, height / 2);

    //Translate to draw the reindeer
    translate(centerX, centerY);

    //This can be used to move the dear in the drawing area
    centerX = centerY = 0;

    // Draw the body
    fill(137, 73, 61, 200);
    beginShape();
    vertex(centerX - 25, centerY + 150); //left leg
    bezierVertex(centerX - 75, centerY + 100, centerX - 75, centerY, centerX, centerY);
    bezierVertex(centerX + 75, centerY, centerX + 75, centerY + 100, centerX + 25, centerY + 150);
    vertex(centerX, centerY + 75); //belly
    endShape(CLOSE);

    //Handle rotation of the head
    rotate(angle);

    // Draw the head
    fill(153, 130, 124, 200);
    triangle(centerX - 50, centerY - 50, centerX + 50, centerY - 50, centerX, centerY + 25);

    //Draw the eyes
    fill(51, 65, 74, 150);
    ellipse(centerX - 12, centerY - 25, 15, 20);
    ellipse(centerX + 12, centerY - 25, 15, 20);

    //Draw the pupils
    ellipse(centerX - 12, centerY - 25, 5, 10);
    ellipse(centerX + 12, centerY - 25, 5, 10);

    //Draw the nose
    fill(151, 65, 74, 200);
    ellipse(centerX, centerY + 25, 15, 20);

    // Draw the antlers
    strokeWeight(4);
    noFill();
    for (var i = 0; i <= 75; i = i + 25) {
        stroke(88, 100, 124, 100 + i);
        beginShape();
        vertex(centerX - 50 - i, centerY - 100 - i);
        bezierVertex(centerX - 50 - i, centerY - 50, centerX - 50 - i, centerY - 50, centerX, centerY - 50);
        bezierVertex(centerX + 50 + i, centerY - 50, centerX + 50 + i, centerY - 50, centerX + 50 + i, centerY - 100 - i);
        endShape();
    }
}
