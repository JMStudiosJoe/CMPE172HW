var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [{id:1},{id:2},{id:3}];
var id = 0;

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  var lion = _.find(lions, {id: req.params.id});
  res.json(lion || {});
});

app.post('/lions', function(req, res) {
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);

  res.json(lion);
});
app.post('/removeLions', function(req, res) {
  var lion = req.body;


  var removedLion = _.remove(lions, function(n) 
  {
    
    n.id = n.id+"";
    if(n.id === lion.id)
    {
        console.log("found the lion");
        return n;
    }
    
  });
  
  var lionInfo = {"lionRemoved": removedLion,
                  "lionsRemaining": lions};
  console.log("lions remaining");
  console.log(lionInfo);
  res.json(lionInfo);
});

app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'))
});

