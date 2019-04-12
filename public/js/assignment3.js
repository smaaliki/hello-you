let bgCanvas, logo, intro, settingsButton, myElement;
let settingsShown = 1;
let nameText;
let settingsArea, courtArea;
let gender;

function preload() {
  logo = loadImage('images/logo.png');
}

function setup() {
  settingsArea = select("#settingsArea");
  courtArea = select("#courtArea");

  bgCanvas = createCanvas(windowWidth, windowHeight);
  bgCanvas.position(0,0);
  bgCanvas.style("z-index","-1");

  // setup the intro text
  intro = createP("Welcome to e-Tennis. Get started by setting up your player in the settings on the right.")
  intro.style("color: grey; font-size: 1em; font-family: impact");
  intro.parent("#courtArea");

  //setup the settings button
  settingsButton = createButton("Settings");
  settingsButton.position(windowWidth-70,10);
  settingsButton.mousePressed(showSettings);
  settingsButton.parent("#headerArea");

  //Name Textbox
  let nameLabel = createP("Enter your name:");
  nameLabel.parent("#settingsArea");
  nameText = createInput('','text');
  nameText.parent("#settingsArea");

  //Gender
  let genderLabel = createP("Are you a girl or a boy?");
  genderLabel.parent("#settingsArea");
  gender = createRadio();
  gender.option('girl');
  gender.option('boy');
  gender.parent("#settingsArea");

  //Save button
  let saveButton = createButton("Save");
  saveButton.mousePressed(saveSettings);
  saveButton.style("float:right;");
  saveButton.parent("#settingsArea");

  //Hide the settings
  settingsArea.style("display:none");
}

function draw() {
  background(255,255,255);
  image(logo,10,10, 225,50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  settingsButton.position(windowWidth-70,10);
}

function showSettings() {
  if(settingsArea.elt.style.display === "none") {
    settingsArea.style("display:block; width:18%;");
    courtArea.style("width:77%");
  } else {
    settingsArea.style("display:none; width:0%;");
    courtArea.style("width:98%");
  }
}

function saveSettings() {
  intro.html("Hello " + nameText.value() +  "! Are you ready to play?");

  if (gender.value() == 'girl') {
    intro.style("color:rgb(255,180,180)");
  } else {
    intro.style("color:rgb(10,10,255)");
  }
  settingsArea.style("display:none; width:0%;");
  courtArea.style("width:98%");
}
