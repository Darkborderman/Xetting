let result=await fetch('https://i.nhentai.net/galleries/806/23.jpg');
result = await result.blob();
let zip=new JSZip();
await zip.file("test.jpg",result)
let x= await zip.generateAsync({type:"blob"})
saveAs(x,"download.zip")