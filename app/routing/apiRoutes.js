var friend = require("../data/friend.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var friendMatch = 0;
    var diff = 500;

    for (var i = friend.length - 1; i >= 0; i--) {
      var totalDifference = 0;

      for (var j = 0; j < 2; j++) {
        totalDifference =
          totalDifference + Math.abs(friend[i].scores[j] - req.body.scores[j]);
      }
      if (totalDifference < diff) {
        diff = totalDifference;
        friendMatch = i;
      }
    }

    // push in the user input into the friendArray
    friend.push(req.body);

    // respond back with the best match
    res.json({
      name: friend[friendMatch].name,
      photo: friend[friendMatch].photo
    }); // KEY LINE
  });
};
