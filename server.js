var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require("path");
app.use(express.static('static'));



// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}



// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.redirect('/about');
});

// setup another route to listen on /about
app.get("/sign_in.html", function(req, res){
  res.sendFile(path.join(dirname, "/views/about.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);