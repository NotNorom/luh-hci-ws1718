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
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
    "session_id" : updateSessionID,     //send the session id to server
    "notification" : showNotification,  //activate pop up (true)
    "abstimmung" : showPoll,            //Poll boolean == true
    "statistik" : updateStatistic,      //send the characteristic
    // add further handlers here
};

function updateSessionID(response){
    put(response,{"SessionID": document.getElementById("sessionid").value});
}

function showNotification(response){
    if(document.getElementById("vote").checked === true){
        put(response,{"ShowNotification": true});
    } else {
        put(response,{"ShowNotification": false});
    }
}

function showPoll(response){
    put(response,{"ShowPoll" : true});
}

function updateStatistic(response){
    var stat = {
     "easy" : document.getElementById("easy").value,
     "difficult" : document.getElementById("difficult").value,
     "slow" : document.getElementById("slow").value,
     "fast" : document.getElementById("fast").value,
     "interesting"  :document.getElementById("interesting").value
    };
    put(response, JSON.stringify(stat));
}
/*
function setAnimal(response) {
    var src = getCheckedRadio("animalImage");
    var width = parseInt(document.getElementById("animalWidth").value);
    // console.log(src);
    // console.log(width);
    put(response, {"src" : src, "width" : width});
}

function stepCounter(response) {
    var value = response.value ? response.value : 0;
    // console.log(value);
    put(response, {"value" : value + 1});
}

function showCounter(response) {
    var checked = document.getElementById("showCounter").checked;
    // console.log(checked);
    put(response, {"checked" : checked});
}

function mytext(response) {
    var value = document.getElementById("mytext").value;
//  console.log("mytext::value = " + value);
    put(response, {"value" : value});
}
*/