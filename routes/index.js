var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');
var session = require('express-session');

//  GET home page.
router.get('/', function(req, res) {

  // check if the userConfigurations file is exist
  // for the first time of app running
  var path = "jsonDataFiles/userConfigurations.json";
  fs.exists(path, function(exists) {
    if (!exists) {
      res.redirect('./config');
    } else {
      var data = fs.readFileSync(path);
      if (data.includes('vocabularyName')) {
        jsonfile.readFile(path, function(err, obj)  {
          if (err)
            console.log(err); 
          if (obj.loginUserName && !req.session.isAuthenticated && req.app.locals.authRequired)
          res.render('login', {
            title: 'login'
          });
          if (obj.hasOwnProperty('text'))
            res.render('index', {
              title: 'Home',
              homePage: obj.text
            });
        });
      } else {
        // when it "userConfigurations.json" is empty
        res.redirect('./config');
      }
    }
  });

});

module.exports = router;
