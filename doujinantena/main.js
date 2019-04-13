const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request=require('request');
const fs=require('fs');

//get html argument
//if not enough just return
//uh.. I write a monster

if(process.argv.length<=2){
    console.log("not enough arguments");
    return;
} 
else{

    let web='doujinantena';
    let bookNumber=process.argv[2];
    let dir=createDir(web,bookNumber);
    //let page=getPages(`https://nhentai.net/g/${bookNumber}/`);
    let page=getPages(`http://doujinantena.com/page.php?id=${bookNumber}`);

    page.then(function(resolve,reject){
        console.log(resolve);
        downloadImage(resolve.galleryNumber,resolve.pageNumber,resolve.filetype,dir);
    });
}

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

            let pagesElement=document.getElementsByClassName('notice');
            let rawString=pagesElement[0].nextElementSibling.innerHTML;
            let filterPatt=/[(/)]/g;
            let pagesString = rawString.split(filterPatt);
            console.log(pagesString);
            let pages=parseInt(pagesString[2]);
            
            /*let galleryElement=document.getElementsByClassName("gallerythumb")[2].childNodes[1].attributes["data-src"].value;
            let test=galleryElement.split('galleries/')[1];
            test=test.split('/')[0];
            let galleryNumber=parseInt(test);*/

            let galleryElement = pagesElement[0].nextElementSibling.nextElementSibling.childNodes[1].attributes["href"].value;
            let galleryDirectories = galleryElement.split('/');
            let galleryNumber = galleryDirectories[4];

            let filetype = '.jpg';

            //get
            let Package={
                galleryNumber:galleryNumber,
                pageNumber:pages,
                filetype:filetype,
            };

            /*let galleryElementArray=document.getElementsByClassName("gallerythumb");
            
            for(let i=0;i<=pages-1;i++)
            {
                let element=galleryElementArray[i].childNodes[1].attributes["data-src"].value;
                element.split('.');
                Package.filetype[i]=element.split('.')[3];
            }*/

            resolve(Package);
        });
    });
}

function downloadImage(number,pages,type,targetDir){

    for(let i=1;i<=pages;i++)
    {
        //need to adjust array iterate
        //i from 1-25, type from 0-24
        //let uri=`https://i.nhentai.net/galleries/${number}/${i}.${type[i-1]}`;
        let page = i.toString().padStart('3','0');
        let uri=`http://cdn.doujinantena.com/contents_jpg/${number}/${page}.${type}`;
        request(uri).pipe(fs.createWriteStream(`${targetDir}/${page}.jpg`)).on('close',function(){
            console.log(page + 'done');
        });
    }
}
