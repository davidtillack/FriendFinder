var friend = require("../data/friend.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var friendMatch = 0;
    // The friend array not including yourself
    for (var i = friend.length - 1; i >= 0; i--) {
      var totalDifference = 0;
      // Loop over for the scores of the 10 questions & compare
      for (var j = 0; j < 9; j++) {
        totalDifference += Math.abs(friend[i].scores[j] - req.body.scores[j]);
      }
      if (totalDifference < 5) {
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
