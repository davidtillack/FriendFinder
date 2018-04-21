var friend = require("../data/friend.js");

module.exports = function(app) {
  app.get("/app/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var friendScores = JSON.parse(req.body.scores);
    var scoresArray = [];
    var friendFinderMatch = 0;

    // Run through list of existing friends
    for (var i = 0; friend.length; i++) {
      var scoreDifferences = 0;
      for (var z = 0; z < friendScores.length; z++) {
        // Take the difference between two user's scores to see how close they are
        scoreDifferences += Math.abs(
          parseInt(friend[i].scores[z]) - parseInt(friendScores[z])
        );
      }
      // Push result into "scoresArray"
      scoresArray.push(scoreDifferences);
    }
    scoresArray.sort(function(matchFriend1, matchFriend2) {
      return (
        matchFriend1.friendFinderMatch - matchFriendfriend2.friendFinderMatch
      );
    });
    // Compare all now to find best match
    // for (var i = 0; i < scoresArray.length; i++) {
    //   if (scoresArray[i] <= scoresArray[friendFinderMatch]) {
    //     friendFinderMatch = i;
    //   }
    // }
    // friend match data
    res.json(friend[scoresArray[0].index]);

    // Push new friend match into array
    friend.push(req.body);
  });
};
