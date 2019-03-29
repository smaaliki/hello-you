
let skyColor;
let skyLight; // Sky color 12 Noon
let skyDark;  // Sky Color 12 Midnight

let hill1Color;
let hill1Light;
let hill1Dark;

let hill2Color;
let hill2Light;
let hill2Dark;

let houseColor;
let houseLight;
let houseDark;

let doorColor;
let doorLight;
let doorDark;

let roofColor;
let roofLight;
let roofDark;

let stars = [];
let starsCreated;

function setup() {
    //Initialize all of the colors
    skyLight = color(0,168,243);
    skyDark = color(1,38,54);
    hill1Light = color(15,205,14);
    hill1Dark = color(15,40,40);
    hill2Light = color(25,255,24);
    hill2Dark = color(25,50,50);
    houseLight = color(248,236,186);
    houseDark = color(46,49,81);
    doorLight = color(211,123,72);
    doorDark = color(26,27,48);
    roofLight = color(220,6,4);
    roofDark = color(100,6,4);

    //Create the Canvas
    var myCanvas = createCanvas(900, 400);
    myCanvas.parent('assignment2c');

    //Create Stars
    for (let i = 0; i < random(20,80); i++) {
        stars.push(new star());
    }
    starsCreated = true;
}

function draw() {
    noStroke();

    // Fetch the current time
    var H = hour();
    var M = minute();
    var S = second();
    let t = frameCount;

    //Update Colors
    updateColors(H,M);
    //Draw the sky
    handleSky(H,M);

    //Draw the stars
    handleStars(t, H, M);

    // Compute the Sun location
    var mappedH = 1.5*width   // set the sun off the screen unless it is between 5:00 AM and 6:59 PM
    if((H >= 5) && (H <= 18)) {
        mappedH = map(H, 6, 18, 0, width);
    }
    var mappedM = map(M, 0, 59, 0, width/12);
    var mappedS = map(S, 0, 59, 0, width/12/60);
    fill(255, 242, 0);
    ellipse(mappedH+mappedM+mappedS,height/4,height/4);

    // Compute the Moon location
    mappedH = 1.5*width   // set the moon off the screen unless it is between 6:00 PM and 6:59 AM
    if(H <= 6) {
        mappedH = map(H, 0, 6, width/2, width);
    } else if (H >= 17) {
        mappedH = map(H, 18, 24, 0, width/2);
    }
    fill(200,200,200);
    ellipse(mappedH+mappedM+mappedS,height/6,height/6);

    //Draw the background (i.e. the hills)
    handleBackground(H,M);

    //Draw the house
    handleHouse(H);
}

function star() {
    this.x = random(0,width);
    this.y = random(0,height/2);
    this.r=random(1,5);
    this.maxIntensity = random (125, 255);

    this.display = function(timeCount, hour, minutes) {
        let x=this.x;
        let y= this.y;
        let r=this.r;

        //Add a little flicker to the stars
        if((timeCount%30) == 0) {
            r += (random(-1,2));
        }

        //Handle the star intensity at 6 AM (decreases) and 6 PM (increases)
        var transparency = this.maxIntensity;
        if(hour == 6) {
            transparency = map(minutes, 0, 59, this.maxIntensity, 0);
        } else if(hour == 18) {
            transparency = map(minutes, 0, 59, 0, this.maxIntensity);
        }

        //draw the star
        push();
        fill(255,255,255, transparency);
        beginShape();
        vertex(x-r,y);
        quadraticVertex(x-r/20, y-r/20, x, y-r);
        quadraticVertex(x+r/20, y-r/20, x+r,y);
        quadraticVertex(x+r/20, y+r/20, x, y+r);
        quadraticVertex(x-r/20, y+r/20, x-r, y);
        endShape(CLOSE);
        pop();
    };
}

function updateColors(hour,minute) {
    if((hour <= 5) || (hour >= 19)) {
        skyColor = skyDark;
        hill1Color = hill1Dark;
        hill2Color = hill2Dark;
        houseColor = houseDark;
        doorColor = doorDark;
        roofColor = roofDark;
    } else if((hour >= 7) && (hour <= 17)) {
        skyColor = skyLight;
        hill1Color = hill1Light;
        hill2Color = hill2Light;
        houseColor = houseLight;
        doorColor = doorLight;
        roofColor = roofLight;
    } else if((hour >= 6) && (hour < 7)){
        skyColor = lerpColor(skyDark, skyLight, minute/60);
        hill1Color = lerpColor(hill1Dark, hill1Light, minute/60);
        hill2Color = lerpColor(hill2Dark, hill2Light, minute/60);
        houseColor = lerpColor(houseDark, houseLight, minute/60);
        doorColor = lerpColor(doorDark, doorLight, minute/60);
        roofColor = lerpColor(roofDark, roofLight, minute/60);
    } else {
        skyColor = lerpColor(skyLight, skyDark, minute/60);
        hill1Color = lerpColor(hill1Light, hill1Dark, minute/60);
        hill2Color = lerpColor(hill2Light, hill2Dark, minute/60);
        houseColor = lerpColor(houseLight, houseDark, minute/60);
        doorColor = lerpColor(doorLight, doorDark, minute/60);
        roofColor = lerpColor(roofLight, roofDark, minute/60);
    }
}

function handleSky(hour,minute) {
    background(skyColor);
}

function handleStars(timeCount, hour, minute) {
    if((hour >= 7) && (hour <= 17) && (starsCreated == true)) {
        //Delete the stars at 7 AM
        stars.splice(0,stars.length);
        starsCreated = false;
    } else if ((hour >= 18)  && (starsCreated == false)) {
        //Create Stars at 6 PM
        for (let i = 0; i < random(20,80); i++) {
            stars.push(new star()); // append snowflake object
        }
        starsCreated = true;
    } else if(hour<7 || hour>=18) {
        //Between 6PM and 7AM, display the stars
        for (let myStar of stars) {
            myStar.display(timeCount,hour,minute); // draw snowflake
        }
    }
}

function handleBackground(hour, minute) {
    push();

    //Draw Back Hill
    fill(hill1Color);
    beginShape();
    vertex(0,2*height/3);
    quadraticVertex(width/4, 2*height/3 + 20, width/2, 2*height/3);
    quadraticVertex(3*width/4, 2*height/3 -20, width, 2*height/3);
    vertex(width,height);
    vertex(0,height);
    endShape(CLOSE);

    //Draw Front Hill
    fill(hill2Color);
    beginShape();
    vertex(0,2*height/3);
    quadraticVertex(width/4, 2*height/3 -20, width/2, 2*height/3);
    quadraticVertex(3*width/4, 2*height/3 +20, width, 2*height/3);
    vertex(width,height);
    vertex(0,height);
    endShape(CLOSE);

    pop();
}

function handleHouse(hour) {
    push();
    stroke(0);

    //Draw the house
    fill(houseColor);
    rect(3*width/5, 11*height/20, width/5, 7*height/30);

    //Draw the door
    fill(doorColor);
    rect(41*width/60, 65*height/100, width/30, height/8);
    rect(41*width/60 + height/100, 66*height/100, width/30 - height/50, height/8 - height/50);
    ellipse(43*width/60-1 , 65*height/100 + height/16, 1);

    //Draw the window
    fill(63, 72, 204);
    rect(44*width/60, 63*height/100, 30,30);
    if((hour >= 19) && (hour < 23)) {
        fill(255,242,0);
    } else if((hour >= 23) || (hour <= 7)){
        fill(48,53,132);
    }
    rect(44*width/60 + height/100, 64*height/100, 22, 22);
    line(44*width/60 + height/100 +11, 64*height/100, 44*width/60 + height/100 +11, 64*height/100 + 22);
    line(44*width/60 + height/100, 64*height/100 +11, 44*width/60 + height/100 + 22, 64*height/100 + 11);

    //Draw the roof
    fill(roofColor);
    rect(3*width/5-width/90, height/2-30, width/5+width/45, height/6);
    for (let i = 1; i< ((width/5+width/45)/10); i++) {
        line(3*width/5-width/90 + i*10, height/2-30, 3*width/5-width/90 + i*10, height/2-30+height/6)
    }
    pop();
}