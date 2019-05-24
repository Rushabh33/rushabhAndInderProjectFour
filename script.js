const myApp = {};



myApp.init = function () {

myApp.key = "JltfITEhSLswBpcoq5t1OZxFECWVYYvCEvTQnrTa";
myApp.userDate = $("#userDate")
myApp.date;
myApp.today = new Date(); 



    // function dateFormat(){
    //     let today = new Date();
    //     let formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    //     myApp.userDate.val(formattedDate)
    // }

    // dateFormat();


    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        method: "GET",
        dataType: "json",
        data: {
            api_key: myApp.key,
            date: myApp.date
        }
    }).then(function (result) {
        console.log(result);
        $(".displayImage img").attr("src", `${result.url}`)
    });

    


    
};





$(function () {
    myApp.init();
    myApp.userDate.change(function(){
        myApp.date = myApp.userDate.val();
        myApp.init();
    })

})


        
                        




