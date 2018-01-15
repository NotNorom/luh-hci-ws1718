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

var dbname = "milfs";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
    "session_id": updateSessionID,
    "notification": showNotification,
    "poll": showPoll,
    "statistic": updateStatistic,
    "comments": updateComments,
};

function updateSessionID(response) {
    //console.log("updateSessinID: " + response);
}

function showNotification(response) {
    var elem = document.getElementById("notification");
    var content = document.getElementById("notification_content");
    if (response["show_notification"]) {
        elem.classList.add("active");
        content.innerText = response["notification_content"];
    } else {
        elem.classList.remove("active");
    }
}

function showPoll(response) {
    //console.log("showPoll: " + response);
}

function updateStatistic(response) {
    chart.data.datasets[0].data = [
        response["easy"],
        response["difficult"],
        response["slow"],
        response["fast"],
        response["interesting"]
    ];
    chart.update();
}

function updateComments(response) {
    //console.log("updateComments: " + response);
}