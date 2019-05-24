const myApp = {};

myApp.key = "JltfITEhSLswBpcoq5t1OZxFECWVYYvCEvTQnrTa";
myApp.userDate = $("#userDate");
myApp.date;
myApp.todayDate = new Date();


const todaysDateFormat = () => {
    let todaysFormattedYear = myApp.todayDate.getFullYear();
    let todaysFormattedMonth = myApp.todayDate.getMonth();
    let todaysFormattedDay = myApp.todayDate.getDay();
    let todaysFormattedDate = `${todaysFormattedYear}-${todaysFormattedMonth}-${todaysFormattedDay}`
    console.log(todaysFormattedDate)
    myApp.userDate.val("2019-1-4");
} 

const ajaxCall = function () {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        method: "GET",
        dataType: "json",
        data: {
            api_key: myApp.key,
            date: myApp.date
        }
    }).then(function (result) {
        // console.log(result);
        $(".displayImage img").attr("src", `${result.url}`)
        $(".infoSection h3").text(`${result.title}`)
        $(".infoSection p").text(`${result.explanation}`)
        
    }); 
}

const userInputChange = () => {
    myApp.userDate.change(function () {
        myApp.date = myApp.userDate.val();
        ajaxCall();
    });
}

// when user clicks left arrow, it goes back to previous image from previous
// when clicked, the value from the date input is displayed in console log
// once arrow clicked, the input type data changes to reflect the image of the day for that selected date

const arrowImageChange = () => {
    $(".shuttleArrows:first-child").on("click", function () {
        myApp.date = myApp.userDate.val(); //make this the previous day from the existing user value
    });
}





myApp.init = function () {
ajaxCall();
userInputChange();
arrowImageChange();
todaysDateFormat();

};


$(function () {
    myApp.init();
})






