const nhentai=require(`./nhentai.js`);

function search(input,begin,end,option){
	return new Promise(async (resolve, reject) => {
		resolve(await nhentai.search(input,begin,end));
	});
}
function bookDetail(source,booknumber){
	return new Promise(async (resolve, reject) => {
		switch(source){
			case "nhentai":resolve(nhentai.getBook(booknumber));
		}
	});
}

//code test area
(async function (){
	console.log(await search("test",20,50));
}());
module.exports={
	search:search
};
