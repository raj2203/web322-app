const e = require("express");
const fs = require("fs");
//const { resolve } = require("path");
var posts = [];
var categories = [];

module.exports.initialize = function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/posts.json',(err,data)=>{
            if(err){
                reject(err);
            }
            posts = JSON.parse(data);
            //resolve();
        });
        fs.readFile('./data/categories.json',(err,data)=>{
            if(err){
                reject(err);
            }
            categories = JSON.parse(data);
        })
        resolve();
    });
}
module.exports.getAllPosts = function(){
    return new Promise((resolve,reject)=>{
        if(posts.length ==0){
            reject("No Post Avaliable");
        }
        resolve(posts);
    })
}
module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
        var post =[];
        for(let i=0;i<posts.length;i++){
            if(posts[i].published){
                post.push(posts[i]);
            }
        }
        if(post.length==0)
        {
             reject("No Public Post Found");
        }
        resolve(post);
    })
}
module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        if(categories.length==1){
            reject("No Catagories Found")
        }
        resolve(categories);
    })
}