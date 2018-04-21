var friend = require("../data/friend.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var friendMatch = 0;

    for (var i = friend.length; i >= 0; i--) {
      var difference = 0;

      for (var j = 0; j < 9; j++) {
        difference += Math.abs(friend[i].scores[j] - req.body.scores[j]);
      }
      if (difference < 5) {
        friendMatch = i;
      }
    }

    // push the user's input
    friend.push(req.body);

    // provide the best match to the user
    res.json({
      name: "Your Friend's Name is: " + friend[friendMatch].name,
      photo: friend[friendMatch].photo
    });
  });
};
