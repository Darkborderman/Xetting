let lock=false;
document.getElementById("download").addEventListener("click",async ()=>{
    if(lock===false){
        lock=true;
        //get image array json
        let currentUrl=new URL(document.URL);
        let source=currentUrl.searchParams.get("source");
        let bookNumber=currentUrl.searchParams.get("booknumber");
        let imageArray=await fetch(`api/download?source=${source}&bookNumber=${bookNumber}`);
        imageArray=await imageArray.json();
    
        let zip=new JSZip();
        //fetching each other file
        for(let i=0;i<=imageArray.length-1;i++){
    
            let fileType=imageArray[i].split(".");
            fileType=fileType[fileType.length-1];
            let result=await fetch(imageArray[i]);
            result=await result.blob();
            await zip.file(`${i}.${fileType}`,result);
            console.log(`${i} finish`);
        }
        zip = await zip.generateAsync({type:"blob"});
        saveAs(zip,"download.zip");
        lock=false;
    }else{
        console.log(`still generating`);
    }

});