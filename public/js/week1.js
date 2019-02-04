var x=0;
var direction = 0;  //0=out 1=in
var redColor = 0;
var greenColor = 0;
var blueColor = 0;

function setup() {
    var myCanvas = createCanvas(200,200);
    redColor = random(0,255);
    greenColor = random(0,255);
    blueColor = random(0,255);
    background(redColor, greenColor, blueColor);
    myCanvas.parent('circle');
}

function draw() {
    fill(255-redColor, 255-greenColor, 255-blueColor);
    ellipse(width/2,height/2,x);

    if(direction==0) {
        fill(255-redColor, 255-greenColor, 255-blueColor);
        ellipse(width/2,height/2,x);

        if(x<width-1) {
            x=x+1;
        } else {
            direction = 1;
            background(255-redColor, 255-greenColor, 255-blueColor);
        }
    } else {
        background(255-redColor, 255-greenColor, 255-blueColor);
        fill(redColor, greenColor, blueColor);
        ellipse(width/2,height/2,x);
        if(x>0) {
            x=x-1;
        } else {
            direction = 0;
            redColor = random(0,255);
            greenColor = random(0,255);
            blueColor = random(0,255);
            background(redColor, greenColor, blueColor);
        }
    }
}
