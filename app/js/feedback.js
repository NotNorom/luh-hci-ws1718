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
    "comments": updateComments,
};

function updateComments(response) {
    updateComment(1, response["comment_1"]);
    updateComment(2, response["comment_2"]);
    updateComment(3, response["comment_3"]);
}

function updateComment(id, comment) {
    var comment_root = document.getElementById("comment_" + id);
    var comment_author = document.getElementById("comment_" + id + "_author");
    var comment_timestamp = document.getElementById("comment_" + id + "_timestamp");
    var comment_score = document.getElementById("comment_" + id + "_score");
    var comment_content = document.getElementById("comment_" + id + "_content");

    if (comment["show"]) {
        comment_root.style.display = "grid";
    } else {
        comment_root.style.display = "none";
        return;
    }

    comment_author.innerText = comment["author"];
    comment_timestamp.innerText = comment["timestamp"];
    comment_score.innerText = comment["score"];
    comment_content.innerText = comment["content"];
}