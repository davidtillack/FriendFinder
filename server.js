// NPM packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Basic properties for express server
var app = express(); // Tells node that we are creating an "express" server
var PORT = process.env.PORT || 8080; // Sets an initial port. We'll use this later in our listener

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./app/public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Routing files
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
