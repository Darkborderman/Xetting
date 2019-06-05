const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const request = require('request');

const ehentaiPageListMax = 20;
const ehentaiBaseURL = "https://e-hentai.org";
const ehentaiGalleryURL = "https://i.ehentai.net/galleries/";

function search(input,begin,end){
	let result=[];
	input.split(' ').join('+');
	return new Promise(async (resolve, reject) => {
		//get the page number of begin and end
		let beginPage=Math.floor(begin/ehentaiPageListMax),
			endPage=Math.floor(end/ehentaiPageListMax);
		begin%=ehentaiPageListMax;
		end%=ehentaiPageListMax;
		let url=ehentaiBaseURL+"/?f_search="+encodeURI(input);

		//search and combine result
		if(beginPage==endPage) result=result.concat(await searchPage(url,beginPage,begin,end));
		else{
			result=result.concat(await searchPage(url,beginPage,begin,ehentaiPageListMax-1));
			for(let i=beginPage+1;i<endPage;++i)
				result=result.concat(await searchPage(url,i,0,ehentaiPageListMax-1));
			result=result.concat(await searchPage(url,endPage,0,end));
		}
		resolve(result);
	});
}

function searchPage(url,page,begin,end){
	url=url+"&page="+page;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			//get books info one by one
			if($('.gltc tbody')[0]!==undefined){
				let books=$('.gltc tbody')[0].children;
				for(let i=begin;i<=end;++i){
					if(i>=books.length) break;
					let book=books[i+1];
					let bookUrl=book.getElementsByClassName("glname")[0].firstChild.href;
					let bookImg=book.getElementsByTagName("img")[0].getAttribute('data-src');
					if(bookImg==null) bookImg=book.getElementsByTagName("img")[0].src;
					result.push({
						"source":"ehentai",
						"booknumber":bookUrl.split('/g/')[1],
						"thumbnail":bookImg,
						"title":book.getElementsByClassName("glink")[0].textContent
					});
				}
			}
			resolve(result);
		});
	});
}
function getBook(id){
	url=ehentaiBaseURL+"/g/"+id;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			let container=$('#taglist')[0];
			if(container!==undefined){
				container=container.firstChild.firstChild
				//get artist
				let artists=[];
				let artistsTag=$('#tags')[0].children[3].children[0].children;
				for(let i=0;i<artistsTag.length;++i)
					artists.push(artistsTag[i].childNodes[0].nodeValue);

				//get thumbnails and images
				let thumbnails=[];
				let thumbnailsTag=container.children;
				for(let i=0;i<thumbnailsTag.length;++i){
					let element=thumbnailsTag[i].children[0];
					thumbnails.push(element.firstElementChild.getAttribute("data-src"));
				};
				resolve({
					"title":$("h1")[0].textContent,
					"artists":artists,
					"time":$('.gdt2')[0].textContent,
					"tags":container.getElementsByTagName('a'),
					//"images":images,
					"thumbnails":thumbnails,
					"originUrl":url
				});
			}
			else resolve(undefined);
		});
	});
}

function getBookThumbnails(){
	
}
function downloadBook(id){
	url=ehentaiBaseURL+"/g/"+id;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			let container=$('#thumbnail-container')[0];
			if(container!==undefined){
				let thumbnailsTag=container.children;
				for(let i=0;i<thumbnailsTag.length;++i){
					//get the correspond thumbnails image url
					let thumbUrl=thumbnailsTag[i]
						.children[0]
						.firstElementChild
						.getAttribute("data-src");
					let filetype=thumbUrl.substring(thumbUrl.lastIndexOf('.'));
					let galleryId=thumbUrl.split("/")[4];
					result.push(ehentaiGalleryURL+galleryId+"/"+(i+1)+filetype);
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

