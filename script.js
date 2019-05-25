const myApp = {};

myApp.key = "JltfITEhSLswBpcoq5t1OZxFECWVYYvCEvTQnrTa";
myApp.userDate = $("#userDate");
myApp.date;
myApp.todayDate = new Date();
myApp.newDate;
myApp.todaysFormattedDate
myApp.currentDisplayedDate;

const todaysDateFormat = () => {
    let todaysFormattedYear = myApp.todayDate.getFullYear();
    let todaysFormattedMonth = myApp.todayDate.getMonth() + 1;
    let todaysFormattedDay = myApp.todayDate.getDay() - 1;

    if (todaysFormattedMonth < 10) {
        todaysFormattedMonth = "0" + todaysFormattedMonth;
    }

    if (todaysFormattedDay < 10) {
        todaysFormattedDay = "2" + todaysFormattedDay;
    }

    myApp.todaysFormattedDate = `${todaysFormattedYear}-${todaysFormattedMonth}-${todaysFormattedDay}`
    console.log(myApp.todaysFormattedDate)
    myApp.userDate.attr("value", myApp.todaysFormattedDate);
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
        $(".displayImage img").attr("src", `${result.url}`)
        $(".infoSection h3").text(`${result.title}`)
        $(".infoSection p").text(`${result.explanation}`)   
    }); 
}

const userInputChange = () => {
    myApp.userDate.change(function () {
        myApp.date = myApp.userDate.val();
        myApp.userDate.attr("value", myApp.date);
        ajaxCall();
    });
}

// when user clicks left arrow, it goes back to previous image from previous
// when clicked, the value from the date input is displayed in console log
// once arrow clicked, the input type data changes to reflect the image of the day for that selected date

const arrowImageChange = () => {
    $(".shuttleArrows:first-child").on("click", function () {
        let date = myApp.userDate.val();
        date = date.split("-");
        console.log(date);
        // all the if statememts for when forward or back in time
        let newYear = date[0];
        console.log(newYear);
        let newMonth = date[1];
        console.log(newMonth);
        let newDay = date[2];
        console.log(newDay);
        if (newYear % 4 != 0 && newYear % 100 == 0 || newYear % 400 != 0){
            
            //beginning of year CONDITION
            if (newMonth == 01 && newDay == 01){
                myApp.newDate = `${Number(newYear) - 1}-${12}-${31}`
                console.log(myApp.newDate);
                //2 things after: we have to update the input value && update myApp.date for the ajax Call
                // updating myApp.date
                myApp.date = myApp.newDate
                // updating the input value
                myApp.userDate.val("value", myApp.date);
                // get readable date format using new Date() and display as current date on html
                                    // let tempMonth = Number(newMonth) - 1
                                    // let tempDisplayedDate = new Date(newYear, tempMonth, newDay);
                                    // tempDisplayedDate = tempDisplayedDate.toString();
                                    // myApp.currentDisplayedDate = tempDisplayedDate.slice(0, 16);
                                    // console.log(myApp.currentDisplayedDate)
                                    // ajaxCall();

            }
        }
       
        // myApp.date
        // myApp.newDate // we want the back in time arrow to equal a day previous, after being filtered by our list of conditons to ensure we're getting the accurate previous date

    });
}


myApp.init = function () {
ajaxCall();
todaysDateFormat();
arrowImageChange();
userInputChange();
};


$(function () {
    myApp.init();
})






