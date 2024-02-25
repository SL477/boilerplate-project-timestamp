// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp
app.get("/api/timestamp/:date_string", function (req, res) {
  //check if the date is invalid
  const myRegex = /^[a-z]/;
  // console.log(req.params.date_string.match(myRegex));
  if (req.params.date_string.match(myRegex)) {
    res.json({"error": "Invalid Date"});
  }
  else {
    try {
      let d = new Date(req.params.date_string);
      // Get unix timestamp d.getTime()/1000
      res.json({"unix": d.getTime(), "utc": d.toUTCString()});
    }
    catch {
      res.json({"error": "Invalid Date"});
    }
  }
});

// Blank timestamp
app.get("/api/timestamp/", function (req, res) {
	var d = new Date();
	res.json({"unix": d.getTime(), "utc": d.toUTCString()});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});