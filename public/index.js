document.getElementById("nhentai").addEventListener("click",()=>{
    $.ajax({
        type: "GET",
        url: "/nhentai",
        data: {
            bookNumber: $('input[name=nhentai]').val()
         },
        success: function(result){
           console.log(result);
        }
       }); 
});
document.getElementById("doujinantena").addEventListener("click",()=>{
    $.ajax({
        type: "GET",
        url: "/doujinantena",
        data: {
            bookNumber: $('input[name=doujinantena]').val()
         },
        success: function(result){
           console.log(result);
        }
       }); 
});