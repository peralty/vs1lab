// File origin: VS1LAB A2
// testtest
/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

let clientTags = [];
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
    getInitialValues();

    document.getElementById("add_tag_button").addEventListener("click", function (){
        let data = {
            latitude: document.getElementById("latitude_input").value,
            longitude: document.getElementById("longitude_input").value,
            name: document.getElementById("name_input").value,
            hashtag: document.getElementById("hashtag_input").value
        }
        if(!(data.hashtag.match(/#[a-zA-Z0-9]+/))){
            return;
        }
        const xhttp = new XMLHttpRequest(),
            method="POST",
            url="http://localhost:3000/api/geotags";
        xhttp.open(method, url, true);
        xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");


        xhttp.onreadystatechange = function (){
            //console.log(xhttp.readyState);
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
            {

                //console.log(xhttp.response);
                const answer = JSON.parse(JSON.parse(xhttp.response));
                //console.log(answer);
                let element = document.createElement("li")
                element.innerHTML = (`${answer.name} ${answer.latitude} ${answer.longitude} ${answer.hashtag}`);
                document.getElementById("discoveryResults").appendChild(element);
                clientTags.push(answer);
            }
        }
        xhttp.send(JSON.stringify(data));
    })

    document.getElementById("search_button").addEventListener("click", function () {
        let searchWord = document.getElementById("search_input").value.toLowerCase();
        let filterTags = clientTags.filter((tag) => {
                return tag.name.toLowerCase().includes(searchWord) || tag.hashtag.toLowerCase().includes(searchWord);
            }
        );

        document.getElementById("discoveryResults").innerHTML = "";
        for (let i = 0; i < filterTags.length; i++) {
            let element = document.createElement("li");
            element.innerHTML = (`${filterTags[i].name} ${filterTags[i].latitude} ${filterTags[i].longitude} ${filterTags[i].hashtag}`);
            document.getElementById("discoveryResults").appendChild(element);
        }
    });

function getInitialValues(){
    const xhttp = new XMLHttpRequest(),
        method="GET",
        url="http://localhost:3000/api/geotags";
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = function (){
        console.log(xhttp.readyState);
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
        {
            const answer = JSON.parse(xhttp.response);
            console.log(answer);
            document.getElementById("discoveryResults").innerHTML = "";

            for(let i = 0; i < answer.geotags.length; i++)
            {
                let element = document.createElement("li")
                element.innerHTML = (`${answer.geotags[i].name} ${answer.geotags[i].latitude} ${answer.geotags[i].longitude} ${answer.geotags[i].hashtag}`);
                document.getElementById("discoveryResults").appendChild(element);
            }
            clientTags = answer.geotags.slice();
            
            let newMap = document.createElement("img");
            newMap.setAttribute("data-tags", JSON.stringify(clientTags));
            newMap.setAttribute("id","mapView");
            newMap.setAttribute("alt","2 a map with locations");
            newMap.setAttribute("src","./images/mapview.jpg");
            //console.log(newMap);
            document.getElementById("mapView").replaceWith(newMap);

        }
    }
    xhttp.send();
}})

/*
function updateMapWithClientTags() {
    let newMap = document.createElement("img");
    newMap.setAttribute("data-tags", JSON.stringify(clientTags));
    newMap.setAttribute("id","mapView");
    newMap.setAttribute("alt","2 a map with locations");
    newMap.setAttribute("src","./images/mapview.jpg");
    console.log(newMap);
    document.getElementById("mapView").replaceWith(newMap);
}
*/

