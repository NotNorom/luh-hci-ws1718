// raw copy, shits will get done

var popupIsOpen = false;
var popupContent = "";

function togglePopup() {
    console.log("toggling popup")
    var elems = document.getElementsByClassName("popup-wrapper");
    var fab = document.getElementsByClassName("fab");
    if (popupIsOpen) {
        for (var i = elems.length - 1; i >= 0; i--) {
            elems[i].setAttribute("hidden", true);
        }
        fab[0].innerText = "+";
        popupIsOpen = false;
    } else {
        for (var i = elems.length - 1; i >= 0; i--) {
            elems[i].removeAttribute("hidden");
        }
        fab[0].innerText = "x";
        popupIsOpen = true;
    }
    console.log(elems);
}
