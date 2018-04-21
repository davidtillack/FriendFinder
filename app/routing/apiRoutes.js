var friend = require("../data/friend.js");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
    var friendArray = [];
    var friendMatch = {
      name: req.body.name,
      photo: req.body.photo,
      description: req.body.description,
      scores: parseInt(req.body.scores)
    };
    friend.forEach(function(question, index) {
      var difference = 0;
      for (var i = 0; question.score.length; i++) {
        difference += Math.abs(question.scores[i] - friendMatch.scores[i]);
        friendArray.push({ difference: difference, index: index });
      }
    });
    friendArray.sort(function(friend1, friend2) {
      return friend1.difference - friend2.difference;
    });
    friend.push(friendMatch);
    res.json(friend[friendArray[0].index]);
  });
};
