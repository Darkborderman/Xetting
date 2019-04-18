const jsdom=require('jsdom'),
	fs = require('fs'),
	request=require('request');
const { JSDOM } = jsdom;

function getImage(website){ 
	request(website, function(error, response, body) {
		let {document}=(new JSDOM(body)).window;
		let array=document.getElementById('gdt').getElementsByTagName('a');

		let dir = './output/'+document.getElementById('gn').innerHTML+'/';
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);

		for(let i=0;i<array.length;++i){
			request(array[i].href,function(error,response,body){
				let {document}=(new JSDOM(body)).window;
				let url=document.getElementById('img').src;
				request.head(url, function(err, res, body){
					request(url).pipe(fs.createWriteStream(dir+i+'.jpg')).on('close',function(){
						console.log('saved '+dir+i+'.jpg');
					});
				});
			});
		}
	});
}
if(process.argv.length<3){
	console.log('usage: node request.js ehentai_website');
	console.log('example: node '+__filename+' https://e-hentai.org/g/618395/0439fa3666/');
}
else{
	getImage(process.argv[2]);
}
