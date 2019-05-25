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
        // given that it's NOT A LEAP YEAR
        if (newYear % 4 != 0 && newYear % 100 == 0 || newYear % 400 != 0){
        // The rest of this code is the same for both leap and nonleap, except for the leap conditon    
            //CONDITION: beginning of year 
            if (newMonth == 01 && newDay == 01){
                myApp.newDate = `${Number(newYear) - 1}-${12}-${31}`
                console.log(myApp.newDate);
                //2 things after: we have to update the input value && update myApp.date for the ajax Call
                // updating myApp.date
                myApp.date = myApp.newDate
                // updating the input value
                myApp.userDate.val(myApp.date);
                ajaxCall();
            }
            //CONDITION: leap --> NOT A LEAP YEAR: read comment at the beginning of the first if statement 
            else if (newMonth == 03 && newDay == 01){
                myApp.newDate = `${newYear}-02-28`
                console.log(myApp.newDate);
                //2 things after: we have to update the input value && update myApp.date for the ajax Call
                // updating myApp.date
                myApp.date = myApp.newDate

                // updating the input value
                console.log(myApp.userDate)
                myApp.userDate.val(myApp.date);
                // myApp.userDate.attr("value", myApp.date);
                ajaxCall();
            }
            else if (newMonth == 01 || newMonth == 03 || newMonth == 05 || newMonth == 07 || newMonth == "08" || newMonth == 10|| newMonth == 12){
                if (newDay == 01){
                    if (newMonth < 10) {
                        newMonth = "0" + (newMonth - 1);
                    } else {
                        newMonth--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                    console.log(myApp.newDate)
                    myApp.date = myApp.newDate
                    myApp.userDate.val(myApp.date);
                    ajaxCall();
                } else {
                    if (newDay <= 10) {
                        newDay = "0" + (newDay - 1);
                    } else {
                        newDay--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                    console.log(myApp.newDate)
                    myApp.date = myApp.newDate
                    myApp.userDate.val(myApp.date);
                    ajaxCall();
                }
            }
            else if (newMonth == 02 || newMonth == 04 || newMonth == "09" || newMonth == 11){
                if (newDay == 01){
                    if (newMonth < 10) {
                        newMonth = "0" + (newMonth - 1);
                    } else {
                        newMonth--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                    console.log(myApp.newDate)
                    myApp.date = myApp.newDate
                    myApp.userDate.val(myApp.date);
                    ajaxCall();
                } else {
                    if (newDay <= 10) {
                        newDay = "0" + (newDay - 1);
                    } else {
                        newDay--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                    console.log(myApp.newDate)
                    myApp.date = myApp.newDate
                    myApp.userDate.val(myApp.date);
                    ajaxCall();
                }
            }
        }
        // given that it is a LEAP YEAR
        else if (newYear % 4 == 0 && newYear % 100 != 0 || newYear % 400 == 0){
            // The rest of this code is the same for both leap and nonleap, except for the leap conditon    
                //CONDITION: beginning of year 
                if (newMonth == 01 && newDay == 01){
                    myApp.newDate = `${Number(newYear) - 1}-${12}-${31}`
                    console.log(myApp.newDate);
                    //2 things after: we have to update the input value && update myApp.date for the ajax Call
                    // updating myApp.date
                    myApp.date = myApp.newDate
                    // updating the input value
                    myApp.userDate.val(myApp.date);
                    ajaxCall();
                }
                //CONDITION: leap --> NOT A LEAP YEAR: read comment at the beginning of the first if statement 
                else if (newMonth == 03 && newDay == 01){
                    myApp.newDate = `${newYear}-${02}-${28}`
                    console.log(myApp.newDate);
                    //2 things after: we have to update the input value && update myApp.date for the ajax Call
                    // updating myApp.date
                    myApp.date = myApp.newDate
    
                    // updating the input value
                    console.log(myApp.userDate)
                    myApp.userDate.val(myApp.date);
                    // myApp.userDate.attr("value", myApp.date);
                    ajaxCall();
                }
                else if (newMonth == 01 || newMonth == 03 || newMonth == 05 || newMonth == 07 || newMonth == "08" || newMonth == 10|| newMonth == 12){
                    if (newDay == 01){
                        if (newMonth < 10) {
                            newMonth = "0" + (newMonth - 1);
                        } else {
                            newMonth--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                        console.log(myApp.newDate)
                        myApp.date = myApp.newDate
                        myApp.userDate.val(myApp.date);
                        ajaxCall();
                    } else {
                        if (newDay <= 10) {
                            newDay = "0" + (newDay - 1);
                        } else {
                            newDay--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                        console.log(myApp.newDate)
                        myApp.date = myApp.newDate
                        myApp.userDate.val(myApp.date);
                        ajaxCall();
                    }
                }
                else if (newMonth == 02 || newMonth == 04 || newMonth == "09" || newMonth == 11){
                    if (newDay == 01){
                        if (newMonth < 10) {
                            newMonth = "0" + (newMonth - 1);
                        } else {
                            newMonth--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                        console.log(myApp.newDate)
                        myApp.date = myApp.newDate
                        myApp.userDate.val(myApp.date);
                        ajaxCall();
                    } else {
                        if (newDay <= 10) {
                            newDay = "0" + (newDay - 1);
                        } else {
                            newDay--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                        console.log(myApp.newDate)
                        myApp.date = myApp.newDate
                        myApp.userDate.val(myApp.date);
                        ajaxCall();
                    }
                }
            }
       
        // myApp.date
        // myApp.newDate // we want the back in time arrow to equal a day previous, after being filtered by our list of conditons to ensure we're getting the accurate previous date

    });
}


myApp.init = function () {
ajaxCall();
todaysDateFormat();
userInputChange();
arrowImageChange();
};


$(function () {
    myApp.init();
})






