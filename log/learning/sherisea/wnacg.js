const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

//Create comic directory
function createDir(mainDir,targetDir){

    if (!fs.existsSync(`./${mainDir}/`)){
        fs.mkdirSync(`./${mainDir}/`);
    }
    if (!fs.existsSync(`./${mainDir}/${targetDir}/`)){
        fs.mkdirSync(`./${mainDir}/${targetDir}/`);
    }
    return `./${mainDir}/${targetDir}`;
}

function getPages(uri){
    return new Promise(function(resolve,reject){
        request(uri, function(err, res, body){

            console.log('get pages');
            let html=new JSDOM(body);
            let document=html.window.document;
            let imageElement=document.getElementsByTagName('img');
            let pages=document.getElementsByTagName('img').length;
            for(let i=0;i<pages-1;i++){
                let resource="https:"+imageElement[i].getAttribute('src');
                request(resource).pipe(fs.createWriteStream(`./${page}.jpg`)).on('close',function(){
                    console.log(`${page} done`);
                });
            }
        });
    });
}
if(process.argv.length<3){
	console.log('usage: node request.js wnacg_website');
}
else{
	let bookname ='https://m.wnacg.net/photos-slide-aid-'+process.argv[2]+'.html';
	getPages(bookname);
}
