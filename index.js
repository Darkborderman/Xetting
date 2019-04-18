document.getElementById("submit").addEventListener("click",()=>{
    console.log('hihi');
    $.ajax({
        type: "GET",
        url: "/download",
        data: {
            bookNumber: $(`input`)[0].value
         },
        success: function(result){
           console.log(result);
        }
       }); 
});