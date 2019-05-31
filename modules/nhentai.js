const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const request = require('request');

const nhentaiPageListMax = 25;
const nhentaiBaseURL = "https://nhentai.net";

function search(input,begin,end){
	let result=[];
	input.split(' ').join('+');
	return new Promise(async (resolve, reject) => {
		//get the page number of begin and end
		let beginPage=Math.floor(begin/nhentaiPageListMax+1),
			endPage=Math.floor(end/nhentaiPageListMax+1);
		begin%=nhentaiPageListMax;
		end%=nhentaiPageListMax;
		let url=nhentaiBaseURL+"/search/?q="+encodeURI(input);

		//search and combine result
		if(beginPage==endPage) result=result.concat(await searchPage(url,beginPage,begin,end));
		else{
			result=result.concat(await searchPage(url,beginPage,begin,nhentaiPageListMax-1));
			for(let i=beginPage+1;i<endPage;++i)
				result=result.concat(await searchPage(url,i,0,nhentaiPageListMax-1));
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
			if($('.index-container')[0]!==undefined){
				let books=$('.index-container')[0].children;
				for(let i=begin;i<=end;++i){
					if(i>=books.length) break;
					let book=books[i].children[0];
					result.push({
						"source":"nhentai",
						"booknumber":book.href.split("/")[2],
						"thumbnail":book.firstChild.getAttribute("data-src"),
						"title":book.lastChild.textContent
					});
				}
			}
			resolve(result);
		});
	});
}
function getBook(id){
	url=nhentaiBaseURL+"/g/"+id;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			//init jquery
			let result=[];
			let {window} = new JSDOM(body);
			let $ = jQuery = require('jquery')(window);

			if($('#thumbnail-container')[0]!==undefined){
				//get artist
				let artists=[];
				let artistsTag=$('#tags')[0].children[3].children[0].children;
				for(let i=0;i<artistsTag.length;++i)
					artists.push(artistsTag[i].childNodes[0].nodeValue);
				//get tags
				let tags=[];
				let tagsTag=$('#tags')[0].children[2].children[0].children;
				for(let i=0;i<tagsTag.length;++i)
					tags.push(tagsTag[i].childNodes[0].nodeValue);

				//get thumbnails and images
				let thumbnails=[];
				let thumbnailsTag=$('#thumbnail-container')[0].children;
				for(let i=0;i<thumbnailsTag.length;++i){
					let element=thumbnailsTag[i].children[0];
					//images.push(nhentaiBaseURL+element.href);
					thumbnails.push(element.firstElementChild.getAttribute("data-src"));
				};
				resolve({
					"title":$("#info h1")[0].textContent,
					"artists":artists,
					"time":$('time')[0].textContent,
					"tags":tags,
					//"images":images,
					"thumbnails":thumbnails,
					"origionUrl":url
				});
			}
			else resolve(undefined);
		});
	});
}


module.exports={
	search:search,
	getBook:getBook,
};


