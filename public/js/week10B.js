var weather;
var api = "http://api.openweathermap.org/data/2.5/weather?zip=";
var zip;
var apikey = "&appid=b780eb2a6798a8ac88b8cf3e03d71cb2";
var units = "&units=imperial";
var myPara;

function setup() {
    let canvas = createCanvas(600, 300);
    var button = select('#submit');
    button.mousePressed(getTemp);

    getTemp();
    canvas.parent("content");
}

function getTemp() {
    zip = select("#zipcode").value();

    var url = api + zip + apikey + units;
    loadJSON(url, gotData);
}

function gotData(myData) {
    weather = myData;
}

function draw() {
    background(100, 200, 187);

    if (weather) {
        //City
        fill('white');
        textSize(20);
        textAlign(CENTER, CENTER);
        text(weather.name, width / 2, 30);

        //Temperature
        var myTemp = weather.main.temp;

        if (myTemp <= 60) {
            fill('blue');
        } else if (myTemp >= 85) {
            fill('red');
        } else {
            fill('green');
        }

        ellipse(20, 60, 20);
        fill('white');
        textSize(20);
        textAlign(LEFT, CENTER);
        text("Temperature: " + round(myTemp), 50, 60);

        //Humidity
        var myHumd = weather.main.humidity;

        if (myHumd <= 30) {
            fill('blue');
        } else if (myHumd >= 80) {
            fill('red');
        } else {
            fill('green');
        }

        ellipse(20, 100, 20);
        fill('white');
        textSize(20);
        textAlign(LEFT, CENTER);
        text("Humidity: " + round(myHumd), 50, 100);

        // Draw the wind direction
        var windSpeed = weather.wind.speed;
        var windAngle = weather.wind.deg;

        push();
        translate(width - 60, 60);
        rotate(radians(windAngle+180));
        stroke(255, 113, 1);
        strokeWeight(2);
        fill(179, 226, 252);
        beginShape();
        vertex(10, -10);
        vertex(10, 30);
        vertex(20, 30);
        vertex(0, 50);
        vertex(-20, 30);
        vertex(-10, 30);
        vertex(-10, -10);
        endShape(CLOSE);
        pop();
        textAlign(CENTER, CENTER);
        text(round(windSpeed) + " mph", width - 60, 120);
    }
}