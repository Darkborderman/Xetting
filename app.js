const express=require('express');
const path=require('path');
const server=express();

let directory=`${__dirname}/`;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

const nhentaiPageListMax = 25;

const nhentai=require(`./modules/nhentai.js`);

const port=3000;

//setup pug view direction
server.set("view engine", "pug");
server.set("views", path.join(`${__dirname}`, "dist"));

server.use(express.static('dist'));

server.get('/', function(req, res) {
    console.log(req);
    res.render('pug/index.pug');
});

server.get('/result',async function(req,res){
    console.log(req.query.query);
    console.log(req.query.source);
    console.log(req.query.page);
    if(req.query.source === undefined) req.query.source = 'nhentai';
    if(req.query.page < 1 | req.query.page === undefined) {
        req.query.page = 1;
    }
    let querypage = nhentaiPageListMax*(req.query.page - 1);
    let resultLength = 15;
    let result = await nhentai.search(req.query.query, querypage, querypage+resultLength);
    //console.log(result);
    let temp = [];
    let row = 5; //slice result into several rows
    let timeSliced = Math.ceil(resultLength/row);
    for(i = 0; i < timeSliced; i++){
        temp.push(result.slice(row*i, row*(i+1)));
    }
    console.log(temp);
    result = temp;
    res.render('pug/result.pug',{
        result:result
    });
});

server.get('/detail',async function(req,res){
    console.log(req.query.source);
    console.log(req.query.booknumber);
    let title = ''; //string
    let artist = []; //string array, may have mutiple artists.
    let time = ''; //string, currently not used
    let tags = []; //string
    let images = []; //string, suppose to be a url
    let thumbnails = []; //string, suppose to be a url
    res.render('pug/detail.pug',{
        title:title,
        artist:artist,
        time:time,
        tags:tags,
        images:images,
        thumbnails:thumbnails
    });
});

server.listen(port);
console.log(`server open on ${port}`);