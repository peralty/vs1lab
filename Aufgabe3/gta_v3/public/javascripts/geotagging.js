// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
 function updateLocation() {
    let tagLat = document.getElementById("latitude_input")
    let tagLong = document.getElementById("longitude_input")

    console.log(tagLat);
    console.log(tagLong);

    let mapManager = new MapManager("EHhsx33AjvAofKoU9zPL366HAQnvBAwE");

    let mapView = document.querySelector("#mapView");
    let listElements = JSON.parse(mapView.getAttribute("data-tags"));

    var mapURL = mapManager.getMapUrl(
        document.getElementById("latitude_input").value, 
        document.getElementById("longitude_input").value,
        listElements
    )
    document.getElementById("mapView").setAttribute("src",mapURL) ;

    // Erweitert um Abfrage
    if (tagLat.value == null || tagLong.value == null ||
        tagLat.value === "" || tagLong.value === "") {
            console.log("it worked");
        try {
            LocationHelper.findLocation(updateDocument);
        } catch (e) {
            console.log("The GeoLocation API is currently unavailable.");
        }
    }
}

function updateDocument(helper) {
    console.log("in function updateDocument");

    document.getElementById("latitude_input").value = helper.latitude; 
    document.getElementById("longitude_input").value = helper.longitude;
    document.getElementById("discovery_latitude").value = helper.latitude;
    document.getElementById("discovery_longitude").value = helper.longitude;

    let mapManager = new MapManager("EHhsx33AjvAofKoU9zPL366HAQnvBAwE");
    let tagList = document.getElementById("mapView").dataset.tags;

    console.log("Taglist Log:" + tagList);

    let mapURL = mapManager.getMapUrl(
        helper.latitude,
        helper.longitude,
        JSON.parse(tagList)
       /*
        document.getElementById("latitude_input").value, 
        document.getElementById("longitude_input").value,
        */
    );
    document.getElementById("mapView").src = mapURL;
}

/* old location helper
function updateLocation() {
    try{
        LocationHelper.findLocation(updateDocument);} 
    catch(e){
        alert("Fehler beim Auslesen der Position!");
    }

    let mapManager = new MapManager("EHhsx33AjvAofKoU9zPL366HAQnvBAwE");
    var mapURL = mapManager.getMapUrl(
        document.getElementById("latitude_input").value, 
        document.getElementById("longitude_input").value,
    )
    document.getElementById("mapView").setAttribute("src",mapURL) ;
}
*/


// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});