const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const request = require('request');

const nhentaiPageListMax = 25;

function search(input,begin,end){
	let result=[];
	input.split(' ').join('+');
	return new Promise(async (resolve, reject) => {
		let beginPage=Math.floor(begin/nhentaiPageListMax+1),
			endPage=Math.floor(end/nhentaiPageListMax+1);
		begin%=nhentaiPageListMax;
		end%=nhentaiPageListMax;
		let url="https://nhentai.net/search/?q="+encodeURI(input);
		if(beginPage==endPage) await search_page(url,beginPage,begin,end);
		else{
			result=result.concat(await search_page(url,beginPage,begin,nhentaiPageListMax-1));
			for(let i=beginPage+1;i<endPage;++i)
				result=result.concat(await search_page(url,i,0,nhentaiPageListMax-1));
			result=result.concat(await search_page(url,endPage,0,end));
		}
		resolve(result);
	});
}

function search_page(url,page,begin,end){
	url=url+"&page="+page;
	return new Promise((resolve, reject) => {
		request(url,function(err,res,body){
			let result=[];
			let {window} = new JSDOM(body);
			let document = window.window;
			let $ = jQuery = require('jquery')(window);

			for(let i=begin;i<=end;++i){

				let g=$('.index-container')[0].children[i].children[0];
				result.push({
					"source":"nhentai",
					"booknumber":g.href.split("/")[2],
					"thumbnail":g.firstChild.src,
					"title":g.lastChild.textContent
				});
			}
			resolve(result);
		});
	});
}
/*
(async function (){
	console.log(await search("test",20,50));
}());
*/
