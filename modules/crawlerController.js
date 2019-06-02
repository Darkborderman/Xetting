const nhentai=require(`./nhentai.js`);
const ehentai=require(`./ehentai.js`);

const Crawler={
	nhentai:{
		search:nhentai.search,
		bookDetail:nhentai.getBook,
		downloadBook:nhentai.downloadBook
	},
	ehentai:{
		search:ehentai.search,
		bookDetail:ehentai.getBook,
		downloadBook:ehentai.downloadBook
	}
};


//code test area
/*
(async function (){
	//console.log(await search("test",20,50));
	console.log(await Crawler.ehentai.search('lol',0,5));
}());
search:function(input,begin,end,option){
	return new Promise(async (resolve, reject) => {
		resolve(await nhentai.search(input,begin,end));
	});
},
*/
module.exports={
	Crawler:Crawler
};
