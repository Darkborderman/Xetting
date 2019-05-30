const express=require('express');
const path=require('path');
const server=express();

let directory=`${__dirname}/`;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

const nhentai=require(`./modules/nhentai.js`);
const doujinantena=require(`./modules/doujinantena.js`);

const port=3000;

//setup pug view direction
server.set("view engine", "pug");
server.set("views", path.join(`${__dirname}`, "dist"));

server.use(express.static('dist'));

server.get('/', function(req, res) {
    console.log(req);
    res.render('pug/index.pug');
});

server.get('/result',function(req,res){
    res.render('pug/result.pug',{
        /*
        result:[{.},{.},{..}]
        {.}=>{
            // the unique id of the book
            bookNumber:"16357"
            //where did this book comes from
            source:"nhentai"
            //this book's title
            title:"boooks"
            //image thumbnail url for this book
            thumbnail:"https://nhentai.net/g/123456/1/"

        }
        */
        result:3,
    });
});

server.get('/detail',function(req,res){
    res.render('pug/detail.pug');
});

server.listen(port);
console.log(`server open on ${port}`);