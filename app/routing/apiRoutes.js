var friend = require("../data/friend.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendMatch = 0;

    //runs through all current friends
    for (var i = 0; friend.length; i++) {
      var scoresDiff = 0;
      //run through scores to compare friends
      for (var j = 0; j < newFriendScores.length; j++) {
        scoresDiff += Math.abs(friend[i].scores[j] - newFriendScores[j]);
      }
    }

    //after all friends are compared, find best match
    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[friendMatch]) {
        friendMatch = i;
      }
      scoresArray.push(scoresDiff);
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
