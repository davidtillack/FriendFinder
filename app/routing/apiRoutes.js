var friend = require("../data/friend.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function(app) {
  app.get("/api/friend", function(req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function(req, res) {
       
    var userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: JSON.parse(req.body.scores)
        };
    
    var friendArray = [];

    friend.forEach(function(question, index) {
        var difference = 0;
        for (var i = 0; i < question.score.length; i++) {
            difference += Math.abs(question.scores[i] - userData.scores[i]);
            friendArray.push({"difference": difference, "index": index});           
        }
    });
    friendArray.sort(function(friend1, friend2){
        return friend1.difference - friend2.difference;
    });
    friend.push(userData);
    res.json(friend[friendArray[0].index]);
    });

