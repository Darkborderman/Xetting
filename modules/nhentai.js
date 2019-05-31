const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const request = require('request');

const nhentaiPageListMax = 25;

function search(input,begin,end){
	let result=[];
	input.split(' ').join('+');
	return new Promise(async (resolve, reject) => {
		//get the page number of begin and end
		let beginPage=Math.floor(begin/nhentaiPageListMax+1),
			endPage=Math.floor(end/nhentaiPageListMax+1);
		begin%=nhentaiPageListMax;
		end%=nhentaiPageListMax;
		let url="https://nhentai.net/search/?q="+encodeURI(input);

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
				for(let i=begin;i<=end;++i){
					let g=$('.index-container')[0].children[i].children[0];
					result.push({
						"source":"nhentai",
						"booknumber":g.href.split("/")[2],
						"thumbnail":g.firstChild.getAttribute("data-src"),
						"title":g.lastChild.textContent
					});
				}
			}
			resolve(result);
		});
	});
}
function getBook(id){
	
}

//code test area
/*
(async function (){
	console.log(await search("test",20,50));
}());
*/

module.exports={
	search:search
};


