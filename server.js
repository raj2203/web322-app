var data = require('./blog-service.js');
var path = require("path");
var express = require('express');
var app = express();

const { join } = require("path");
app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on PORT: " + HTTP_PORT);
}
//setup a route to listen on the default url path
app.get("/", function(req,res){
    res.redirect("/about");
});
//setup another route to listen in /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});
//setup a route to listen in /blogs
app.get("/blogs", function(req,res){
  data.getAllPosts()
  .then((data)=>{
      res.json(data);
  }).catch((err) => {
      res.json("{message: "+err+'}');
      })
});
//setup a route to listen in /posts
app.get("/managers", function(req,res){
  data.getPublishedPosts()
  .then((data)=>{
      res.json(data);
  }).catch((err) => {
      res.json("{message: "+err+'}');
  })
});
//setup a route to listen in /categories
app.get("/departments", function(req,res){
  data.getCategories()
  .then((data)=>{
      res.json(data);
  }).catch((err) => {
      res.json("{message: "+err+'}');
  })
});
//This must be the last call, otherwise the files called after won't execute.
app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,"/views/404.html"));
});


data.initialize().then(function(){ //before I run my server I initialize the data
  app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
  console.log("Unable to start server: "+err);
});