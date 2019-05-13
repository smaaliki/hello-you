//Set the court origin and size.These are just placeholders
//as they will be modified in the draw funciton depending on the window size.
let court = {
    x: (1140 - 780) / 2,
    y: (510 - 360) / 2,
    w: 780,
    h: 360
}

let ballD = 20; // ball diameter (pixels)
let player1 = new player();
let machineAngle = 0;
let machineCount = 0;
let tennisBall1 = new tennisball();

//settings
let bgCanvas, intro, settingsButton, myElement;
let settingsShown = 1;
let nameText;
let settingsArea, courtArea;
let gender;

//Play/pause
let pausePlayImg;
let paused = 1;

//score
let score = 0, missedScore = 0;

//Game level
let gameLevel = 1;
let ballSpeed = 7; //Ball speed in pixels per frame
let ballTime = 240;  //The time (secs) from the time that the ball is shot out of the machine until it disappears

function preload() {
    //Load the Play/Pause icon
    pausePlayImg = loadImage('images/pauseplay.png');
}

function setup() {
    bgCanvas = createCanvas(windowWidth, windowHeight * 0.75);

    //Initialize the court
    court.w = width * 0.5;
    court.h = court.w * 360 / 780;  //360/780 is the ratio of the court dimensions
    court.x = (width - court.w) / 2;
    court.y = (height - court.h) / 2;

    //Initialize the player
    player1.setName("Player");
    player1.setPos(court.x + court.w + 20, court.y + (court.h / 2));

    //settings
    settingsArea = select("#settingsArea");
    courtArea = select("#courtArea");

    // setup the intro text
    intro = createP("Welcome to e-Tennis. Get started by setting up your player in the settings on the right.")
    intro.style("color: grey; font-size: 1em; font-family: impact");
    intro.parent("#courtArea");

    //setup the settings button
    settingsButton = createButton("Settings");
    settingsButton.position(windowWidth - 90, 10);
    settingsButton.mousePressed(showSettings);
    settingsButton.parent("#headerArea");

    //Name Textbox
    nameText = createInput('', 'text');
    let nameLabel = createP("Enter your name:");
    nameLabel.parent("#settingsArea");
    nameText.parent("#settingsArea");

    //Gender
    let genderLabel = createP("Are you a girl or a boy?");
    genderLabel.parent("#settingsArea");
    gender = createRadio();
    gender.option('girl');
    gender.option('boy');
    gender.parent("#settingsArea");

    //Let's Go (Save) button
    let saveButton = createButton("Let's Go!");
    saveButton.mousePressed(saveSettings);
    saveButton.style("float:right;");
    saveButton.parent("#settingsArea");

    //Hide the settings
    settingsArea.style("display:none");
}

function draw() {
    background(27, 27, 87);

    drawTennisCourt();

    if (!paused) {
        machineCount++;
        if (machineCount >= ballTime) {
            //Randomize the machine angle b/w -15 and 15 degrees.  These angles will
            //guarantee that the ball will land on teh player's side of the court
            machineAngle = random(-15, 15);
            machineCount = 0;
            if (score == 15) {
                //Good Job. Increment the level
                incrGameLevel();
                score = 0;
                missedScore = 0;
                intro.html("Level " + (gameLevel - 1) + " is complete!");

                if (gameLevel == 8) {
                    //Game is too fast at this level.  It's inhumane to keep going!
                    intro.html("You have completed level " + gameLevel + ". At this level, the ball machine is heating up!!  Federer ain't got nothing on you!!");
                    paused = true;
                    score = 0;
                    missedScore = 0;
                    resetGameLevel();
                }
            } else if (missedScore == 11) {
                // Player Lost.  GAME OVER!!!
                intro.html("You're out.  Gome Over.  Hasta la vista, baby!!  Highest level achieved was Level " + (gameLevel - 1));
                paused = true;
                score = 0;
                missedScore = 0;
                resetGameLevel();
            }
        }
    }

    drawBallMachine();

    if (!paused) {
        handleBall();
        player1.update();
    }

    // draw pause/play icon
    image(pausePlayImg, width - pausePlayImg.width - 10, 10);

    // Show the scores
    fill(255, 255, 255);
    noStroke();
    text(player1.name, court.x + court.w - 100, 20);
    text(score, court.x + court.w - 20, 20);
    text("Machine", court.x + court.w - 100, 40);
    text(missedScore, court.x + court.w - 20, 40);
}

function drawTennisCourt() {
    court.w = windowWidth * 0.5;
    court.h = court.w * 360 / 780;  //360/780 is the ratio of the court dimensions
    court.x = (width - court.w) / 2;
    court.y = (height - court.h) / 2;

    stroke(255, 255, 255, 255);
    strokeWeight(4);
    let longLineOffset = court.h * 4.5 / 36;
    let vertLineOffset = court.w * 18 / 78;
    let postOffset = court.h * 3 / 36;

    translate(court.x, court.y);

    //Draw the lines around the court
    fill(29, 98, 27);
    beginShape();
    vertex(0, 0);
    vertex(court.w, 0);
    vertex(court.w, court.h);
    vertex(0, court.h);
    endShape(CLOSE);

    //Draw Long lines
    line(0, longLineOffset, court.w, longLineOffset);
    line(0, court.h - longLineOffset, court.w, court.h - longLineOffset);

    //Draw vertical lines
    line(vertLineOffset, longLineOffset, vertLineOffset, court.h - longLineOffset);
    line(court.w - vertLineOffset, longLineOffset, court.w - vertLineOffset, court.h - longLineOffset);

    //Draw Middle line
    line(vertLineOffset, court.h / 2, court.w - vertLineOffset, court.h / 2);

    //Draw marker lines
    line(0, court.h / 2, 10, court.h / 2);
    line(court.w - 10, court.h / 2, court.w, court.h / 2);

    //Draw net
    fill(255, 125, 125);
    stroke(255, 125, 125, 255);
    ellipse(court.w / 2, -postOffset, 10);
    ellipse(court.w / 2, court.h + postOffset, 10);

    stroke(255, 255, 255, 255);
    strokeWeight(2);
    line(court.w / 2, -postOffset, court.w / 2, court.h + postOffset);

    translate(-court.x, -court.y);
}

function player() {
    this.name = "";
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    this.colorR = 20;
    this.colorG = 20;
    this.colorB = 180;

    this.setName = function (name) {
        this.name = name;
    }

    this.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    }

    this.setColor = function (r, g, b) {
        this.colorR = r;
        this.colorG = g;
        this.colorB = b;
    }

    this.update = function () {
        if (keyIsDown(LEFT_ARROW)) {
            if (player1.x > (court.x + court.w / 2 + 4)) {
                player1.x -= this.speed;
            }
        }

        if (keyIsDown(RIGHT_ARROW)) {
            if (player1.x < (2 * court.x + court.w - 20)) {
                player1.x += this.speed;
            }
        }

        if (keyIsDown(UP_ARROW)) {
            if (player1.y > 40) {
                player1.y -= this.speed;
            }
        }

        if (keyIsDown(DOWN_ARROW)) {
            if (player1.y < (2 * court.y + court.h - 40)) {
                player1.y += this.speed;
            }
        }

        stroke(this.colorR, this.colorG, this.colorB, 255);
        strokeWeight(8);
        line(this.x, this.y - 20, this.x, this.y + 20);
        noStroke();
        text(this.name, this.x + 10, this.y);
    }
}

function drawBallMachine() {

    push();
    translate(court.x - 100, court.y + (court.h / 2));
    rotate(radians(machineAngle));
    noFill();
    strokeWeight(2);
    rect(0, -ballD * 1.5 - 1, ballD * 3 + 2, ballD * 3 + 2);  //the box will fit 3x3 balls plus the strokewidth on both sides.

    //Draw a matrix of 3x3 tennis balls
    for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
            //Draw the ball
            noStroke();
            fill(0, 255, 0);
            ellipse(11 + ballD * n, (m - 1) * ballD, ballD);

            //Draw the white lines on the ball
            stroke(255, 255, 255);
            noFill();
            arc((-ballD / 9) + (ballD) * n, (m - 1) * ballD, ballD, ballD, -PI / 4, PI / 4);
            arc(ballD / 9 + (ballD) * (n + 1), (m - 1) * ballD, ballD, ballD, 3 * PI / 4, 5 * PI / 4);
        }
    }

    //Draw the ball shooter part (white rectangle)
    fill(255);
    stroke(255);
    rect(2 * ballD + 2, -ballD / 2, 2 * ballD, ballD);
    pop();
}

function handleBall() {
    // Set the ball color
    noStroke();
    fill(0, 255, 0);
    let t = machineCount / 60; // update time

    tennisBall1.update(t); // update ball position
    tennisBall1.display(); // draw ball
}

function tennisball() {
    // initialize coordinates
    this.posX = 80;
    this.posY = 0;
    this.initialangle = 0;//random(0, 2 * PI);
    this.size = ballD;
    this.direction = 0;  //0 => right, 1=> left
    this.missed = 0;
    this.yIncrementer = 0;
    this.radius = this.size / 2;

    this.update = function (time) {
        if (machineCount == 0) {
            //Reset the ball position, to the ball shooter position
            this.posX = 80;
            this.posY = 0;
            this.direction = 0;
            this.missed = 0;
        }

        //Figure out the incrementer.  This makes the ball start out fast and slow down over time
        let posIncr = ballSpeed - (6 * (machineCount / ballTime));

        if (this.direction) {
            //PLayer hit ball and it is bouncing back
            this.posX -= posIncr;
            this.yIncrementer += posIncr;
            this.posY = this.yIncrementer * tan(radians(2 * machineAngle));
        } else {
            if (((this.posX + court.x - 100 + ballD / 2 + posIncr) * cos(radians(machineAngle)) < player1.x) ||
                (this.missed)) {
                // Ball has not yet reached the player's position
                this.posX += posIncr;
            } else {
                if ((court.y + court.h / 2) + (this.posX * sin(radians(machineAngle))) >= (player1.y - 30) &&
                    (court.y + court.h / 2) + (this.posX * sin(radians(machineAngle))) <= (player1.y + 30)) {
                    //Player hit the ball
                    this.posX = player1.x - ballD / 2 - 4 - (court.x - 100); // -4 => player line weight
                    this.direction = 1;
                    this.yIncrementer = 0;
                    score += 1;
                }
                else {
                    //Player missed the ball
                    this.missed = 1;
                    missedScore += 1;
                }
            }
        }
    };

    this.display = function () {
        push();
        translate(court.x - 100, court.y + (court.h / 2));
        rotate(radians(machineAngle));
        ellipse(this.posX, this.posY, this.size);
        strokeWeight(2);
        stroke(255, 255, 255);
        noFill();
        arc(this.posX - (11 * ballD / 18), this.posY, ballD, ballD, -PI / 4, PI / 4);
        arc(this.posX + (11 * ballD / 18), this.posY, ballD, ballD, 3 * PI / 4, 5 * PI / 4);
        pop();
    };
}

function showSettings() {
    //Toggle b/w showing and hiding the Settings box
    if (settingsArea.elt.style.display === "none") {
        settingsArea.style("display:block; width:18%;");
        courtArea.style("width:77%");
    } else {
        settingsArea.style("display:none; width:0%;");
        courtArea.style("width:98%");
    }
    //Pause the game, while the user adjusts the settings
    paused = 1;
}

function saveSettings() {
    //Save the name
    player1.setName(nameText.value());
    intro.html("Hello " + nameText.value() + "! Let's play.  You can use the Up, Down, Left and Right keys on the keyboard to move your player.  Everytime you hit back 15 out of 25 balls, you advance one level and the game speeds up.  When ready hit the Play/Pause button on the right to get started. Good Luck!");

    //Set the player color based on the gender
    if (gender.value() == 'girl') {
        player1.setColor(255, 180, 180);
    } else {
        player1.setColor(10, 10, 255);
    }
    settingsArea.style("display:none; width:0%;");
    courtArea.style("width:98%");
}

function mousePressed() {
    //If the mouse is pressed on the Play/Pause button
    if ((mouseX >= width - pausePlayImg.width - 10) && (mouseX <= width) &&
        (mouseY >= 0) && (mouseY <= pausePlayImg.height + 10)) {
        paused = !paused;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.75);
    settingsButton.position(windowWidth - 80, 10);
}

function incrGameLevel() {
    //Increment the game level, increase the ball speed and reduce the ball time.
    gameLevel += 1;
    ballSpeed += 1;
    ballTime -= 30;
}

function resetGameLevel() {
    //Reset the game level, the ball speed and the ball time to beginner level.
    gameLevel = 1;
    ballSpeed = 7;
    ballTime = 240;
}
