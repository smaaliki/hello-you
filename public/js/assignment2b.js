let myHour=0;
let myMinute=0;
let mySecond=0;

function setup() {
    //Create the canvas and color it
    var myCanvas = createCanvas(600, 700);
    myCanvas.parent('assignment2b');

}


function draw() {
    background(0);
    watchFace();
    stroke(255,255,255);
    fill(255);

    // https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/50757763

    //Setup the text for the digital Clock
    //textFont(avenir);
    textSize(60);
    textAlign(CENTER, CENTER);

    let time = nf(hour(), 2, 0) + ":" + nf(minute(), 2, 0) + ":" + nf(second(), 2, 0)
    text(time, width/2,height-35);

    // Draw the hour hand
    push();
    translate(width/2, height/2-35);
    rotate(PI+2*PI*hour()/12);
    stroke(255, 113, 1);
    strokeWeight(2);
    fill(179,226,252);
    beginShape();
    vertex(10,0);
    quadraticVertex(0, 30, 0,135);
    quadraticVertex(0, 30, -10,0);
    quadraticVertex(0, -20, 10,0);
    endShape(CLOSE);
    pop();

    push();
    translate(width/2, height/2-35);
    rotate(PI+2*PI*minute()/60);
    stroke(255, 113, 1);
    strokeWeight(2);
    fill(179,226,252);
    beginShape();
    vertex(0,220);
    vertex(5,0);
    vertex(0,-40);
    vertex(-5,0);
    endShape(CLOSE);
    pop();

    push();
    translate(width/2, height/2-35);
    rotate(PI+2*PI*second()/60);
    stroke(255, 113, 1);
    strokeWeight(2);
    line(0,-20,0,200);
    ellipse(0,0,5);
    pop();


    //Add the date
    textSize(30);
    text(day(), 4*width/5, height/2-35);

}

function watchFace () {
    push();
    translate(width/2, height/2-35);
    stroke(255,255,255);
    //Draw the outside bezel
    fill(6, 18, 49);
    ellipse(0,0,510,510);
    noStroke();
    fill(255, 113, 1);
    ellipse(0,0,500,500);
    fill(6, 18, 49);
    ellipse(0,0,490,490);
    ellipse(0,0,480,480);

    //Draw the 1 minute marks
    fill(255,255,255);
    for (var i=0; i<60; i++) {
        rect(-1,-240,2,20);
        rotate(PI/30);
    }

    //Draw the 5 minute marks
    fill(255, 113, 1);
    for (var i=0; i<12; i++) {
        rect(-3,-240,6,20);
        rotate(PI/6);
    }
    pop();
}
