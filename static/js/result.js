let descriptions=document.querySelectorAll(".component-description");
let titles=[];
for(let i=0;i<=descriptions.length-1;i++){
    titles.push(descriptions[i].innerText);
    if(descriptions[i].innerText.length>=15){
        descriptions[i].innerText=descriptions[i].innerText.substring(0,15)+'...';
    }
    console.log(titles[i]);

}
let components=document.querySelectorAll(".component");
for(let i=0;i<=components.length-1;i++){
    components[i].addEventListener('mouseover',function(){
        descriptions[i].innerText=titles[i];
    });

    components[i].addEventListener('mouseleave',function(){
        if(descriptions[i].innerText.length>=15){
            descriptions[i].innerText=descriptions[i].innerText.substring(0,15)+'...';
        }
    });
}

let currentUrl = new URL(document.URL);
let page = currentUrl.searchParams.get("page");
if(page==null|page==NaN) page=1;
else page=parseInt(page);
let query = currentUrl.searchParams.get("query");

document.getElementById("prev").addEventListener("click",function(){
    document.location=`${currentUrl.origin}/result?query=${query}&page=${page-1}`;
});
document.getElementById("next").addEventListener("click",function(){
    document.location=`${currentUrl.origin}/result?query=${query}&page=${page+1}`;
});