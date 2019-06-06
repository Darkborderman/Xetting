# Promise 和 await,async
要東西時怎麼吐都是null，才發現先吐出東西才要到
Promise 用來保證事情做完了，才會吐出來，寫法如下
function fetch(cb) {
	return new Promise(function(resolve, reject) {
		...
		resolve(return_value);
	});
}
懶，寫成arrow function
function fetch(cb) {
	return new Promise((resolve, reject)=>{
		...
		resolve(return_value);
	});
}
但是搜尋往往不只一頁，因此會要了多筆資料，為了確保順序，餵狗後了解用await 和async來非同步
簡單講就是接力賽，async表示這是一場接力賽，await是接力賽跑員，await一定要在async function中
async function(){
	await DoA();
	await DoB();
}
在arrow function像這樣
async()=>{
	await DoA();
	await DoB();
}
大概的概念是這樣
