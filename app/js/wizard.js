var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    console.log("onreadystatechange: " + request.readyState + ", " +  request.status);
    console.log(request.responseText);
    if (request.readyState == 4) {
        if (request.status == 200) {
            var response = JSON.parse(request.responseText);
            handlers[response._id](response);
        }
        if (request.status == 404) {
            var json = JSON.parse(request.responseText);
            if (json.reason === "no_db_file") {
                createDB();
            } else {
                var url = request.responseURL
//              console.log(typeof(url));
                var i = url.lastIndexOf("/", url.length - 1);
                var name = url.substring(i + 1);
                handlers[name]({ "_id" : name });
            }
        }
    }
};

function getCheckedRadio(name) {
    var options = document.getElementsByName(name);
    for (i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.checked) {
            return option.value;
        }
    }
    return null;
}

function set(name) {
    console.log("set::name = " + name);
    console.log("set::GET = " + dburl + name);
    request.open("GET", dburl + name, false);
    request.send();
}

function put(response, message) {
    console.log("put::response = " + response);
    console.log("put::message = " + message);
    request.open("PUT", dburl + response._id, false);
    request.setRequestHeader("Content-type", "application/json");
    message["_id"] = response._id;
    if (response._rev) {
        message["_rev"] = response._rev;
    }
    var s = JSON.stringify(message);
//  console.log("put: " + s);
    request.send(s);
}

function createDB() {
    request.open("PUT", dburl, false);
    request.send();
}

///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "milfs";
var dburl = "http://10.0.0.136:5984/" + dbname + "/";
var handlers = {
    "session_id": updateSessionID,     //send the session id to server
    "notification": showNotification,  //activate pop up (true)
    "poll": showPoll,            //Poll boolean == true
    "statistic": updateStatistic,      //send the characteristic
    "comments": updateComments,
    // add further handlers here
};

function updateSessionID(response) {
    put(response, {"session_id": document.getElementById("session_id").value});
}

function showNotification(response) {
    put(response, {
        "show_notification": document.getElementById("notification_checkbox").checked,
        "notification_content": document.getElementById("notification_text").value
    });
}

function showPoll(response) {
    put(response, {"show_poll": document.getElementById("vote").checked});
}

function updateStatistic(response) {
    var stat = {
        "easy": document.getElementById("easy").value,
        "difficult": document.getElementById("difficult").value,
        "slow": document.getElementById("slow").value,
        "fast": document.getElementById("fast").value,
        "interesting": document.getElementById("interesting").value
    };
    put(response, stat);
}

function updateComments(response) {
    var comments = {
        "comment_1" : {
            "content": document.getElementById("comment1_text").value,
            "author": "Test Autor",
            "timestamp": "1 Minute her",
            "score": parseInt(document.getElementById("comment1_score").value),
            "show": document.getElementById("comment1_show").checked
        },
        "comment_2" : {
            "content": document.getElementById("comment2_text").value,
            "author": "Test Autor",
            "timestamp": "3 Minuten her",
            "score": parseInt(document.getElementById("comment2_score").value),
            "show": document.getElementById("comment2_show").checked
        },
        "comment_3" : {
            "content": document.getElementById("comment3_text").value,
            "author": "Test Autor",
            "timestamp": "20 Minuten her",
            "score": parseInt(document.getElementById("comment3_score").value),
            "show": document.getElementById("comment3_show").checked
        },
    };
    put(response, comments);
}
