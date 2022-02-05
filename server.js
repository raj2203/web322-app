/**********************************************************************
* WEB322 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy.
* No part of this assignment has been copied manually or electronically from any other
source
* (including web sites) or distributed to other students.
*
* Name: Raj Patel, Student ID: 159772201, Date: 04/02/2022
*
* Online (Heroku) URL: https://damp-dusk-58507.herokuapp.com/
************************************************************************
********/ 
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
  data.getPublishedPosts()
  .then((data)=>{
      res.json(data);
  }).catch((err) => {
      res.json("{message: "+err+'}');
      })
});
//setup a route to listen in /posts
app.get("/posts", function(req,res){
  data.getAllPosts()
  .then((data)=>{
      res.json(data);
  }).catch((err) => {
      res.json("{message: "+err+'}');
  })
});
//setup a route to listen in /categories
app.get("/categories", function(req,res){
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