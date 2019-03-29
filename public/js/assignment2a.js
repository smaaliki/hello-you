let marks = [];
let markSpacing = 10;
let groupSpacing = 10;
let vDistance = 10;
let markLength = 40;
let groupSize = 5;
let groupsPerLine = 0;

function setup() {
    //Create the canvas and color it
    var myCanvas = createCanvas(360, 300);
    myCanvas.parent('assignment2a');

    //First, figure out how many groups we can have in one row
    groupsPerLine = floor(width/(groupSpacing + groupSize*markSpacing));
}


function draw() {
    background(0,0,0);
    stroke(200,20,150);

    //draw the marks
    for (let mark of marks) {
        mark.display();
    }
}

function mousePressed(){
    //When the mouse is pressed, add a new mark to the array
    marks.push(new Mark(marks.length));
}

function keyPressed(){
    //If any key on teh keyboard is pressed, remove all of the array items
    marks.splice(0, marks.length);
}

function Mark(id) {
    //Figure out which rowNum this mark should be one
    let rowNum = floor((id/groupSize)/groupsPerLine);

    //Determine the origin of the mark (x,y)
    this.x = groupSpacing*(1+(floor((id)/groupSize))) + markSpacing*(id+1) - (rowNum*(groupsPerLine* (groupSpacing + groupSize*markSpacing)));
    this.y = vDistance + (vDistance+markLength)*rowNum;
    this.id = id;

    this.display = function() {
        //If this is the last mark in the group (depnds on groupSize), draw it slanted;
        if ((this.id + 1) % groupSize == 0) {
            line(this.x, this.y + 5,this.x - (groupSize * markSpacing), this.y + markLength - 5);
        } else {
            line(this.x, this.y,this.x, this.y + markLength);
        }
    };
}
