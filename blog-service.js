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

module.exports.addPost = function(postData){
    if(!postData.id) employeeData.id=false;
    else postData.id = true;
    postData.postNum = posts.length+1;
    posts.push(postData);
    return new Promise((resolve, reject) => {
        resolve(posts);
        if(posts.length == 0)
        reject("no results returned");
    });
};

exports.getPostsByCategory = function(category){
    return new Promise((resolve, reject) => {
        let filteredPosts = posts.filter(posts => posts.category == category);
        resolve(filteredPosts);
        if(filteredPosts.length == 0)
        reject("no results returned");
    });
}

exports.getPostsByMinDate = function(minDateStr){
    return new Promise((resolve, reject) => {
        let filteredPosts = posts.filter(posts => posts.postDate == minDateStr);
        resolve(filteredPosts);
        if(filteredPosts.length == 0)
        reject("no results returned");
    });
}

exports.getPostById = function(id){
    return new Promise((resolve, reject) => {
        let filteredPosts = posts.filter(posts => posts.id == id);
        resolve(filteredPosts);
        if(filteredPosts.length == 0)
        reject("no results returned");
    });
}