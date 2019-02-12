var x = 0;
function setup() {
    var myCanvas = createCanvas(800, 600);
    background(255, 250, 250);

    translate(width/2, height/2);

    //Draw the outside bezel
    fill(125,125,125);
    ellipse(0,0,510,510);
    fill(240,240,240);
    ellipse(0,0,500,500);
    fill(255,240,240);
    ellipse(0,0,480,480);

    //Draw the 1 minute marks
    fill(20,20,20);
    for (var i=0; i<60; i++) {
        rect(-1,-240,2,20);
        rotate(PI/30);
    }

    //Draw the 5 minute marks
    fill(20,20,20);
    for (var i=0; i<12; i++) {
        rect(-3,-240,6,20);
        rotate(PI/6);
    }
    myCanvas.parent('clock');
}

function draw() {

    translate(width/2, height/2);

    //Clear the background
    fill(255,240,240);
    ellipse(0,0,440,440);

    push();
    // Draw the hour hand
    rotate(((x/720)*PI)/6);
    fill(20,20,20);
    //noStroke();
    beginShape();
    vertex(-10,0);
    quadraticVertex(0,-30, 0,-135);
    quadraticVertex(0,-30, 10,0);
    quadraticVertex(0,20, -10,0);
    stroke(255, 0, 0);

    //Todo: Lok into why this is not working
    //beginContour();
    //  vertex(0,-20);
    //vertex(5,-5);
    //vertex(-5,-5);
    //endContour();
    endShape(CLOSE);

    fill(80,80,80);
    rotate((((x/60)*PI)/6) - (((x/720)*PI)/6));
    beginShape();
    vertex(0,-220);
    vertex(5,0);
    vertex(0,40);
    vertex(-5,0);
    endShape(CLOSE);
    //rect(-10,-185, 20, 220);
    fill(255,250,250);
    pop();
    ellipse(0,0,4,4);

    if(x<=720*12)
        x +=((mouseX-(width/2))/width)*2;
    else
        x=0;
}
