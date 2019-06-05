const nhentai=require(`./nhentai.js`);
//const ehentai=require(`./ehentai.js`);
const doujinantena=require(`./doujinantena.js`);

const Crawler={
	nhentai:{
		search:nhentai.search,
		bookDetail:nhentai.getBook,
		downloadBook:nhentai.downloadBook
	},
	doujinantena:{
		search:doujinantena.search,
		bookDetail:doujinantena.getBook,
		downloadBook:doujinantena.downloadBook
	}
};


//code test area
/*
(async function (){
	//console.log(await search("test",20,50));
	console.log(await Crawler.doujinantena.downloadBook('c91af14205ccffc2189a0e654197ed0d'));
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
