let teams;

function preload() {
    let url = "/JSON/nba-teams.json";
   teams = loadJSON(url);
}

function setup() {
    noCanvas();
    let nba_teams = teams.nba_teams;
    let conferences = [];
    let divisions = [];

    //conferences[0] = nba_teams[0].conference;
    //divisions[0] = nba_teams[0].division;

    for (let i = 0; i < nba_teams.length; i++) {
        let conferenceFound = false;
        for (let j = 0; j < conferences.length; j++) {
            if (nba_teams[i].conference === conferences[j]) {
                conferenceFound = true;
                break;
            }
        }
        if (!conferenceFound) {
            conferences[conferences.length] = nba_teams[i].conference;
        }

        let divisionFound = false;
        for (let j = 0; j < divisions.length; j++) {
            if (nba_teams[i].division === divisions[j]) {
                divisionFound = true;
                break;
            }
        }
        if (!divisionFound) {
            divisions[divisions.length] = nba_teams[i].division;
        }
    }
    console.log("Conferences: " + conferences.length);
    console.log("Divisions: " + divisions.length);
    console.log("NBA Teams: " + nba_teams.length);

    let confDiv;
    let confTitle, divTitle;
    let index = 1;

    for (let j = 0; j < conferences.length; j++) {
        index = 1;
        if (conferences[j] === "Eastern") {
            confDiv = select('#eastConf');
        } else {
            confDiv = select('#westConf');
        }

        confDiv.style("font-family: Roboto, sans-serif;");

        confTitle = createP(conferences[j] + " CONFERENCE");
        confTitle.parent(confDiv);
        confTitle.style('font-family: ' + '"Action NBA Cond Bold Web"' + ', sans-serif; font-size: 1.8em; text-transform: uppercase;');

        for (let k = 0; k < divisions.length; k++) {
            let myDiv = createDiv();
            if (conferences[j] === "Eastern") {
                if (divisions[k] === "Atlantic" || divisions[k] === "Central" || divisions[k] === "Southeast") {
                    myDiv.parent(confDiv);
                    //myDiv.style("background-color: rgb(" + random(255)+ ", " +  + random(255) + ",128)"); //rbg(" +random(255) +", 128,128);");
                    let divTitle = createP(divisions[k] + ' Division');
                    divTitle.parent(myDiv);
                    divTitle.style('font-family: ' + '"Action NBA Cond Bold Web"' + ', sans-serif; font-size: 1.4em; text-transform: uppercase;');
                }
            } else {
                if (divisions[k] === "Northwest" || divisions[k] === "Pacific" || divisions[k] === "Southwest") {
                    myDiv.parent(confDiv);
                    //myDiv.style("background-color: rgb(" + random(255)+ ", " +  + random(255) + ",128)"); //rbg(" +random(255) +", 128,128);");
                    let divTitle = createP(divisions[k] + ' Division');
                    divTitle.parent(myDiv);
                    divTitle.style('font-family: ' + '"Action NBA Cond Bold Web"' + ', sans-serif; font-size: 1.4em; text-transform: uppercase;');
                }
            }

            for (let i = 0; i < nba_teams.length; i++) {
                if (nba_teams[i].conference === conferences[j] && nba_teams[i].division === divisions[k]) {
                    let name = createP(index + '. ' + nba_teams[i].name);
                    let stadium = createP(nba_teams[i].stadium);
                    let location = createP(nba_teams[i].city + ', ' + nba_teams[i].state);
                    name.parent(myDiv);
                    stadium.parent(myDiv);
                    location.parent(myDiv);
                    name.style("font-size: 18px; font-weight: bold;");
                    stadium.style("font-size: 14px; font-style: italic;");
                    location.style("font-size: 14px; font-style: bold;");
                    index += 1;
                }
            }
        }
    }
}

function draw() {
}
