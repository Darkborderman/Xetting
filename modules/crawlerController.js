const nhentai=require(`./nhentai.js`);
//const ehentai=require(`./ehentai.js`);
const doujinantena=require(`./doujinantena.js`);
const wnacg=require(`./wnacg.js`);

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
	},
	wnacg:{
		search:wnacg.search,
		bookDetail:wnacg.getBook,
		downloadBook:wnacg.downloadBook
	}
};


//code test area
/*
(async function (){
	console.log(await Crawler.wnacg.search("lol",0,15));
	console.log(await Crawler.wnacg.bookDetail('76850'));
	console.log(await Crawler.wnacg.downloadBook('76850'));
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
