let express=require('express');
let server=express();

let directory=`${__dirname}/`;
let nhentai=require(`${directory}/nhentai.js`);
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

const port=3000;

server.use('/', express.static(__dirname + '/'));

server.get('/', function(req, res) {
    console.log(nhentai.download);
    res.sendFile(`${__dirname}/index.html`);

});

server.get('/download',function(req,res){
    console.log(req.query.bookNumber);
    let thread=2;
    let pageinfo=nhentai.getPages(`https://nhentai.net/g/${req.query.bookNumber}/`);

    pageinfo.then((resolve,reject)=>{
        console.log(resolve);
        let page=resolve;
        for(let i=0;i<=thread-1;i++){}
        nhentai.download(page,req.query.bookNumber,1,Math.floor(page.pageNumber/2));
        nhentai.download(page,req.query.bookNumber,Math.floor(page.pageNumber/2)+1,page.pageNumber);
    });
});

server.listen(port);
console.log(`server open on ${port}`);