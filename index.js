// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/* let dateInput = "2015-05-20"
let dateObj = new Date(dateInput)

console.log(isNaN(dateObj)) */

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date", (req, res) => {
  const dateInput = req.params.date
  const confirmDate = /[a-z]|-/gi.test(dateInput)

  if(confirmDate){
    const dateObj = new Date (dateInput)
    if (!isNaN(dateObj)){
        res.json(
          {
            "unix": dateObj.getTime(),
            "utc": dateObj.toUTCString()
          }
        )
    }else {
      res.json({
        "error": "Invalid Date"
      })
    }
  }else {
    const unix = parseInt(dateInput)
      res.json({
        "unix": unix,
        "utc": new Date (unix).toUTCString()
      })
  }
})

app.get("/api/", (req, res) => {
  const date = new Date()
  const unixTimestamp = Math.floor(date.getTime())
  res.json({
    "unix": unixTimestamp,
    "utc": date.toUTCString()
  })
})