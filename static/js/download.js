
//make lock to prevent conflict
let lock = false;
document.getElementById("download").addEventListener("click", async () => {
    if (lock === false) {
        lock = true;

        //get JSON image list, create zip
        let zip = new JSZip();
        let currentUrl = new URL(document.URL);
        let source = currentUrl.searchParams.get("source");
        let bookNumber = currentUrl.searchParams.get("booknumber");
        let images = await fetch(`api/download?source=${source}&bookNumber=${bookNumber}`);
        images = await images.json();

        //make downloading threads
        let thread=3;
        let part = (images.length / thread);
        let promisePool=[];
        for(i=0;i<=thread-1;i++){
            let array=images.slice(i*part,(i+1)*part);
            promisePool.push(download(array));
        }

        //get each images format for later save
        let fileTypes = [];
        for (let i = 0; i <= images.length - 1; i++) {
            let fileType = images[i].split(".");
            fileType = fileType[fileType.length - 1];
            fileTypes.push(fileType);
        }

        //put files to zip
        let resultPool = await Promise.all(promisePool);
        for (let i = 0; i <= resultPool.length - 1; i++) {
            for (let j = 0; j <= resultPool[i].length - 1; j++) {
                if(i * resultPool[i].length + j<=fileTypes.length-1)
                    await zip.file(`${(i * resultPool[i].length) + j+1}.${fileTypes[i * resultPool[i].length + j]}`, resultPool[i][j]);
            }
        }

        //Save file, release lock
        zip = await zip.generateAsync({ type: "blob" });
        saveAs(zip, "download.zip");
        lock = false;
    } else {
        console.log(`still generating`);
    }

});

//download file from URL string array
async function download(array) {
    let r = [];
    for (let i = 0; i <= array.length - 1; i++) {
        let fileType = array[i].split(".");
        fileType = fileType[fileType.length - 1];
        let result = await fetch(array[i],{referrer:''});
        result = await result.blob();
        r.push(result);
        console.log(`${i} finish`);
    }
    return r;
}
