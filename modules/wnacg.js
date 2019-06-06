const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const corsUrl='http://140.116.102.104:25565/';
const request = require('request');

const wnacgPageListMax = 12;
const wnacgBaseURL = "https://wnacg.org";
const wnacgMobileURL = "https://m.wnacg.org";

function search(input,begin,end){
	let result=[];
	return new Promise(async (resolve, reject) => {
		//get the page number of begin and end
		let beginPage=Math.floor(begin/wnacgPageListMax+1),
			endPage=Math.floor(end/wnacgPageListMax+1);
		begin%=wnacgPageListMax;
		end%=wnacgPageListMax;

		//search and combine result
		if(beginPage==endPage) result=result.concat(await searchPage(input,beginPage,begin,end));
		else{
			result=result.concat(await searchPage(input,beginPage,begin,wnacgPageListMax-1));
			for(let i=beginPage+1;i<endPage;++i)
				result=result.concat(await searchPage(input,i,0,wnacgPageListMax-1));
			result=result.concat(await searchPage(input,endPage,0,end));
		}
		resolve(result);
	});
}

function searchPage(input,page,begin,end){
	url=`${wnacgBaseURL}/albums-index-page-${page}-sname-${input}.html`;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);
			
			let container=$('ul.cc')[0];
			if(container!==undefined){
				let books=container.children;
				//get books info one by one
				for(let i=begin;i<=end;++i){
					if(i>=books.length) break;
					let book=books[i].children[0].children[0];
					result.push({
						"source":"wnacg",
						"booknumber":book.href.split(/-|\./)[3],
						"thumbnail":"https:"+book.children[0].src,
						"title":book.title
					});
				}
			}
			resolve(result);
		});
	});
}
function getBook(id){
	let url=`${wnacgBaseURL}/photos-index-aid-${id}.html`;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			let container=$('#bodywrap')[0];
			if(container!==undefined){
				//get tags
				let tags=[];
				let tagsTag=$('.tagshow');
				for(let i=0;i<tagsTag.length;++i)
					tags.push(tagsTag[i].text);

				//get thumbnails
				let thumbnails=[];
				let thumbnailsTag=$('ul.cc img');
				for(let i=0;i<thumbnailsTag.length;++i){
					thumbnails.push("https:"+thumbnailsTag[i].src);
				};
				resolve({
					"title":$('h2')[0].textContent,
					"artists":[],
					"time":$('.info_col')[0].textContent,
					"tags":tags,
					"thumbnails":thumbnails,
					"originUrl":url
				});
			}
			else resolve(undefined);
		});
	});
}

function downloadBook(id){
	url=`${wnacgMobileURL}/photos-gallery-aid-${id}.html`;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//find the img list line and cut it
			let attrText=body.split("imglist =")[1].split(";\");")[0];
			//use regular expression cut string between "//"(contain in string) and "\"(not contain in string) 
			let re=/\/\/.*?(?=\\)/gs,
				matche,
				result=[];
			while(match=re.exec(attrText)){
				result.push(`${corsUrl}https:${match[0]}`);
			}
			resolve(result);
		});
	});
}

module.exports={
	search:search,
	getBook:getBook,
	downloadBook:downloadBook
};

