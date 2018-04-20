var array = require("../data/friend.js");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(array);
  });

  app.post("/api/friend", function(req, res) {
    var friendScores = req.body.scores;
    var scoresArray = [];
    var friendFinderMatch = 0;

    // Run through list of existing friends
    for (var i = 0; array.length; i++) {
      var scoreDifferences = 0;
      for (var z = 0; z < friendScores.length; z++) {
        // Take the difference between two user's scores to see how close they are
        scoreDifferences += Math.abs(
          parseInt(array[i].scores[z]) - parseInt(friendScores[z])
        );
      }
      // Push result into "scoresArray"
      scoresArray.push(scoreDifferences);
    }
    // Compare all now to find best match
    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[friendFinderMatch]) {
        friendFinderMatch = i;
      }
    }
    // friend match data
    var yourFriend = array[friendFinderMatch];
    res.json(yourFriend);

    // Push new friend match into array
    array.push(req.body);
  });
};
