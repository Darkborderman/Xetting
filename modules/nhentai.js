const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require('request');
//const { window } = new JSDOM();
//const { document } = (new JSDOM('')).window;
//global.document = document;
const {nhentaiPageListMax} = 25;

let result=[];
async function search(input,begin,end){
	result=[];
	input.split(' ').join('+');
	beginPage=begin/nhentaiPageListMax+1;
	endPage=end/nhentaiPageListMax+1;
	begin%=nhentaiPageListMax;
	end%=nhentaiPageListMax;
	let url="https://nhentai.net/search/?q="+encodeURI(input);
	if(beginPage==endPage) search_page(url,beginPage,begin,end);
	else{
		await search_page(url,beginPage,begin,nhentaiPageListMax-1);
		for(let i=begin+1;i<endPage;++i)
			await search_page(url,i,0,nhentaiPageListMax-1);
		await search_page(url,endPage,0,end);
	}
}
async function search_page(url,page,begin,end){
	url=url+"&page="+page;
	request(url,function(err,res,body){
		let window = new JSDOM(body);
		let $ = jQuery = require('jquery')(window);
		for(let i=begin;i<=end;++i){
			let g=$('.index-container').children[i].children[0];
			result.push({
				"source":"nhentai",
				"booknumber":g.pathname.split("/")[2],
				"thumbnail":g.firstChild.src,
				"title":g.lastChild.textContent
			});
		}
	});
	
}
console.log(search("test",20,50));
