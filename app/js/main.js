var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    // console.log("onreadystatechange: " + request.readyState + ", " +  request.status);
    // console.log(request.responseText);
    if (request.readyState == 4) {
        if (request.status == 200) {
            var response = JSON.parse(request.responseText);
            handlers[response._id](response);
        }
        if (request.status == 404) {
            console.log("not found: " + request.responseText);
        }
    }
};

function get(variable) {
    // console.log("get " + variable);
    request.open("GET", dburl + variable, false);
    request.send();
}

function update() {
    for (var name in handlers) {
        // console.log("updating " + name);
        get(name);
    }
}

// request updates at a fixed interval (ms)
var intervalID = setInterval(update, 1000);

///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "milf";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
    "session_id" : updateSessionID,
    "notification" : showNotification,
    "abstimmung" : showAbstimmung,
    "statistik" : updateStatistik,
    // add further handlers here
};

function updateSessionID(response) {
    console.log("updateSessinID: " + response);
}

function showNotification(response) {
    console.log("showNotification: " + response);
}

var showCounter = true;

function showAbstimmung(response) {
    console.log("showAbstimmung: " + response);
}

function updateStatistik(response) {
    console.log("updateStatistik: " + response);
}