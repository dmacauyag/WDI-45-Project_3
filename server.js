const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  port = 3000

app.listen(port, (err) => {
  console.log(err || "Server listening on port:", port)
})
