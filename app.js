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
const { Crawler }=require('./modules/crawlerController.js');
const { Logo }= require('./modules/Logo.js');

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

    req.query.source= req.query.source == undefined ? "nhentai": req.query.source;
    req.query.page= req.query.page == undefined ? 1 : req.query.page;
    if(req.query.page < 1) {
        req.query.page = 1;
    }
    let querypage = nhentaiPageListMax*(req.query.page - 1);
    console.log(querypage);
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
    let result = await nhentai.getBook(req.query.booknumber);
    console.log(result);
    if(result === undefined) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("Oops, there might be something wrong.");
        res.end();
    }
    else {
        res.render('pug/detail.pug',{
            title:result.title,
            artists:result.artists,
            time:result.time,
            tags:result.tags,
            thumbnails:result.thumbnails,
            originUrl:result.originUrl
        });
    }
});

server.get('/api/download',async function(req,res){
    let source=req.query.source;
    let bookNumber=req.query.bookNumber;
    console.log(source);
    console.log(bookNumber);
    let result=await Crawler.nhentai.downloadBook(parseInt(bookNumber));
    console.log(result);
    res.json(result);
});

server.get('/api/',async function(req,res){
    
    let logo=Logo[Math.floor(Math.random()*2)];
    let slogan=`Xetting-Crawler of some image host sites`;
    res.status(200).send(logo+'\n'+slogan+'\n');
});

server.listen(port);
console.log(`server open on ${port}`);