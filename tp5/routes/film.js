// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');



var express = require('express');
var router = express.Router();

let films = [{
    id: "0",
    name: "Film1",
}]


/* GET film listing. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Voici les films',
        films
    });
});

/* GET one film via ID*/
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find user in DB
    const film = _.find(films, ["id", id]);
    // Return user
    res.status(200).json({
        message: 'Film found!',
        film: {film, id}
    });
}); 

/* PUT new film */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { film } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    films.push({ film, id });
    // Return message
    res.json({
      message: `Just added ${id}`,
      film: { film, id }
    });
});
  

/* DELETE film via ID*/
router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
  
    // Remove from "DB"
    _.remove(films, ["id", id]);
  
    // Return message
    res.json({
      message: `Just removed ${id}`
    });
});
  

/* UPDATE film via ID*/
router.post('/:id', (req, res) => {
    // Get the :id of the user we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the user we want to update from the body of the request
    const { film } = req.body;
    // Find in DB
    const filmToUpdate = _.find(films, ["id", id]);
    // Update data with new data (js is by address)
    filmToUpdate.film = film;
  
    // Return message
    res.json({
      message: `Just updated ${id} with ${film}`
    });
});
  
module.exports = router;