var array = require("../data/friend.js");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(array);
  });

  app.post("/api/friend", function(req, res) {
    var friendMatch = {
      name: req.body.name,
      photo: req.body.photo,
      scores: JSON.parse(req.body.scores)
    };

    var compareArray = [];

    array.forEach(function(item, index) {
      var diff = 0;
      for (var x = 0; item.score.length; x++) {
        diff += Math.abs(item.scores[x] - friendMatch.scores[x]);
        compareArray.push({ difference: diff, index: index });
      }
    });
    compareArray.sort(function(friend1, friend2) {
      return friend1.diff - friend2.diff;
    });
    array.push(friendMatch);
    res.json(array[compareArray[0].index]);
  });
};
