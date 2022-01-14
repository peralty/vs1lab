// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();
const tags = require('../models/geotag-examples');

/*
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
*/

/**
 * The module "geotag" exports a class GeoTagStore.
 * It represents geotags.
 *
 * DONE: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore.
 * It provides an in-memory store for geotag objects.
 *
 * DONE: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');

let memoryTags = tags.tagList;

router.get("/api/geotags", function (req, res){
  res.json({geotags: memoryTags});
})

router.post("/api/geotags", function (req, res){
  memoryTags.push(new GeoTag(req.body.name, req.body.latitude, req.body.longitude, req.body.hashtag));
  console.log(memoryTags);
  res.json(JSON.stringify(req.body));
})

router.get("/api/geotags/:id", function (req,res) {
  let id = req.params.id;
  for (let i = 0; i < memoryTags.length; i++) {
      if(memoryTags[i].id == id){
          res.json(JSON.stringify(memoryTags[i]))
      }
  }
  res.sendStatus(404)
})

router.put("/api/geotags/:id", function (req, res) {
  let id = req.params.id;
  for (let i = 0; i < memoryTags.length; i++) {
      if(memoryTags[i].id == id){
          let id = GeoTag.id;
          let newTag = new GeoTag(req.body.name, req.body.latitude, req.body.longitude, req.body.hashtag);
          GeoTag.id = id;
          newTag.id = memoryTags[i].id;
          memoryTags[i] = newTag
          res.json(JSON.stringify(memoryTags[i]))
      }
  }
  res.sendStatus(404)
})

router.delete("/api/geotags/:id", function (req, res) {
  let id = req.params.id;
  memoryTags = memoryTags.filter(tag => tag.id != id)
  res.sendStatus(200)
})

router.get('/', (req, res) => {
  res.render('index', { taglist: [] })
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags
 * by radius around a given location.
 */
// DONE: ... your code here ...
router.post('/tagging', (req, res) => {
  //console.log(req.body);
  let tag = new GeoTag(req.body["name_input"],
      req.body["latitude_input"],
      req.body["longitude_input"],
      req.body["hashtag_input"]);
  GeoTagStore.addGeoTag(tag);
  res.render('index', {taglist: GeoTagStore.getNearbyGeoTags(tag, 100000)})
});

/*
app.post('/tagging', function (req, res)  {
  var gtag = new GeoTag(req.body.latitude,req.body.longitude,req.body.name,req.body.hashtag);
  GeoTagStore.addGeoTag(gtag);
  res.render('index', {taglist: GeoTagStore.getNearbyGeoTags(tag, 100000)});
});
*/

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain
 * the term as a part of their names or hashtags.
 * To this end, "GeoTagStore" provides methods to search geotags
 * by radius and keyword.
 */
// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
  console.log(req.body);
  console.log("req.body[search_input] " + req.body["search_input"]);
  let queryTag = new GeoTag('Query',
      req.body["discovery_latitude"],
      req.body["discovery_longitude"],
      '#query');
  res.render('index', {taglist: GeoTagStore.searchNearbyGeoTags(queryTag, 100000, req.body["search_input"]) })
});

module.exports = router;
