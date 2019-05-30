let express=require('express');
let server=express();

let directory=`${__dirname}/`;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

const nhentai=require(`./modules/nhentai.js`);
const doujinantena=require(`./modules/doujinantena.js`);

const port=3000;

server.set("view engine", "pug");
server.use(express.static('dist'));

server.get('/', function(req, res) {
    console.log(req);
    res.sendFile(`${__dirname}/dist/test.html`);
});

server.get('/result',function(req,res){
    res.render(`${__dirname}/dist/result.pug`,{
        result:3,
    });
});

server.get('/nhentai',function(req,res){
    console.log(req);
    let thread=2;
    let pageinfo=nhentai.getPages(`https://nhentai.net/g/${req.query.bookNumber}/`);
    pageinfo.then((resolve,reject)=>{
        console.log(resolve);
        let page=resolve;
        nhentai.download(page,req.query.bookNumber,1,Math.floor(page.pageNumber/2));
        nhentai.download(page,req.query.bookNumber,Math.floor(page.pageNumber/2)+1,page.pageNumber);
    });
});

server.get('/doujinantena',function(req,res){
    let thread=2;
    let pageinfo=doujinantena.getPages(`http://doujinantena.com/page.php?id=${req.query.bookNumber}&p=1`);

    pageinfo.then((resolve,reject)=>{
        console.log(resolve);
        let page=resolve;
        doujinantena.download(page,req.query.bookNumber);
    });
});

server.listen(port);
console.log(`server open on ${port}`);