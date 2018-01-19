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
var dburl = "http://10.0.0.136:5984/" + dbname + "/";
var handlers = {
    "notification": showNotification,
    "poll": showPoll,
    "statistic": updateStatistic,
};

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
    if (response["show_poll"]) {
        window.location.pathname = "/abstimmung";
    }
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