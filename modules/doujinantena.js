const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const corsUrl='http://140.116.102.104:25565/';
const request = require('request');

const doujinantenaPageListMax = 10;
const doujinantenaBaseURL = "https://doujinantena.com";
const doujinantenaGalleryURL = "http://cdn.doujinantena.com";

function search(input,begin,end){
	let result=[];
	input.split(' ').join('+');
	return new Promise(async (resolve, reject) => {
		//get the page number of begin and end
		let beginPage=Math.floor(begin/doujinantenaPageListMax+1),
			endPage=Math.floor(end/doujinantenaPageListMax+1);
		begin%=doujinantenaPageListMax;
		end%=doujinantenaPageListMax;
		let url=doujinantenaBaseURL+"/list.php?category=search&id="+encodeURI(input);

		//search and combine result
		if(beginPage==endPage) result=result.concat(await searchPage(url,beginPage,begin,end));
		else{
			result=result.concat(await searchPage(url,beginPage,begin,doujinantenaPageListMax-1));
			for(let i=beginPage+1;i<endPage;++i)
				result=result.concat(await searchPage(url,i,0,doujinantenaPageListMax-1));
			result=result.concat(await searchPage(url,endPage,0,end));
		}
		resolve(result);
	});
}

function searchPage(url,page,begin,end){
	url=url+"&p="+page;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			//get books info one by one
			if($('.listtype-a')[0]!==undefined){
				let books=$('.listtype-a')[0].children[0].children;
				for(let i=begin;i<=end;++i){
					if(i>=books.length) break;
					let book=books[i].children[0];
					result.push({
						"source":"doujinantena",
						"booknumber":book.href.split("id=")[1],
						"thumbnail":book.children[0].src,
						"title":book.getElementsByClassName('booktitle')[0].textContent
					});
				}
			}
			resolve(result);
		});
	});
}
function getBook(id){
	url=doujinantenaBaseURL+"/page.php?id="+id;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			let container=$('.listtype-d')[0];
			if(container!==undefined){
				//get tags
				let tags=[];
				let tagsTag=$('.listtype-d')[0].getElementsByTagName('ul')[2].children;
				for(let i=0;i<tagsTag.length;++i)
					tags.push(tagsTag[i].children[0].textContent.split('(')[0]);
				
				resolve({
					"title":$('title')[0].textContent,
					"artists":[],
					"time":null,
					"tags":tags,
					"thumbnails":[doujinantenaGalleryURL+"/thumbnail/"+id+".jpg"],
					"originUrl":url
				});
			}
			else resolve(undefined);
		});
	});
}

function downloadBook(id){
	url=doujinantenaBaseURL+"/page.php?id="+id;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			let container=$('#maincontent div');
			if(container.length>0){
				//get page number
				let pageCnt=container[4].textContent.split(/\/|\)/)[1];
				for(let i=1;i<=pageCnt;++i){
					let pageNumStr=("00"+i).slice(-3);
					result.push(`${corsUrl}${doujinantenaGalleryURL}/contents_jpg/${id}/${pageNumStr}.jpg`);
				}
				resolve(result);
			}
			else resolve(undefined);
		});
	});
}

module.exports={
	search:search,
	getBook:getBook,
	downloadBook:downloadBook
};

