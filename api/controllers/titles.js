'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var db = require('../database/database.json');
var errors = require('../database/errors.json')

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  titles: titles,
  title: title
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function titles(req, res) {
  res.json(db['titles']);
}

function title(req, res) {
  var id = req.swagger.params.id.value
  var result = searchParams(db, 'titles', 'id', id)
  if (result) {
    res.json(result);
  } else {
    // Si la liste est vide on renvoie un 200 avec un message d'explication
    res.json(errors['empty_list_titles'])
  }
}

// Renvoie l'objet json correspondant à la catégorie, au critère voulue
function searchParams(json, categoryField, searchField, searchVal) {
  for (var i=0 ; i < json[categoryField].length ; i++)
  {
    if (json[categoryField][i][searchField] == searchVal) {
      return json[categoryField][i]
    }
  }
}
