const myApp = {};

myApp.userDate = $("#userDate");
myApp.imgDisplay = $(".displayImage img")
myApp.youtubeDisplay = $("iframe")
myApp.infoSectionH3 = $(".infoSection h3")
myApp.infoSectionP = $(".infoSection p")
myApp.previousDayArrow = $(".shuttleArrows:first-child"); //first child because we likely adding a forward arrow during portfolio week

myApp.key = "JltfITEhSLswBpcoq5t1OZxFECWVYYvCEvTQnrTa";
myApp.todayDate = new Date();
myApp.todaysFormattedDate
myApp.date;
myApp.newDate;
myApp.currentDisplayedDate;

const todaysDateFormat = () => {
    let todaysFormattedYear = myApp.todayDate.getFullYear();
    let todaysFormattedMonth = myApp.todayDate.getMonth() + 1;
    let todaysFormattedDay = myApp.todayDate.getDate();
    if (todaysFormattedMonth < 10) {
        todaysFormattedMonth = "0" + todaysFormattedMonth;
    }
    if (todaysFormattedDay < 10) {
        todaysFormattedDay = "0" + todaysFormattedDay;
    }
    myApp.todaysFormattedDate = `${todaysFormattedYear}-${todaysFormattedMonth}-${todaysFormattedDay}`
    myApp.userDate.attr("value", myApp.todaysFormattedDate);
} 

const displayImgOrVideo = (result) => {
    if (result.url.includes("youtube")){
        myApp.imgDisplay.addClass("displayNone");
        myApp.youtubeDisplay.removeClass("displayNone");
        myApp.youtubeDisplay.attr("src", `${result.url}`)
        myApp.youtubeDisplay.attr("alt", `${result.title}`)
    } else {
        myApp.imgDisplay.removeClass("displayNone");
        myApp.youtubeDisplay.addClass("displayNone");
        myApp.imgDisplay.attr("src", `${result.url}`)
        myApp.imgDisplay.attr("alt", `${result.title}`)
    }
}

const displayTitleAndDescrip = (result) => {
    myApp.infoSectionH3.text(`${result.title}`)
    myApp.infoSectionP.text(`${result.explanation}`)   
}

const ajaxCall = () => {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        method: "GET",
        dataType: "json",
        data: {
            api_key: myApp.key,
            date: myApp.date
        }
    }).then(function (result) {
        displayImgOrVideo(result);
        displayTitleAndDescrip(result);
    }); 
}

const userInputChange = () => {
    myApp.userDate.change(function () {
        myApp.date = myApp.userDate.val();
        myApp.userDate.attr("value", myApp.date);
        ajaxCall();
    });
}

const getAjaxWithNewDate = () => {
    //2 things after: we have to update the input value && update myApp.date for the ajax Call
    // updating myApp.date
    myApp.date = myApp.newDate
    console.log(myApp.date)
    // updating the input value
    myApp.userDate.val(myApp.date);
    ajaxCall();
}   

// when user clicks left arrow, it goes back to previous image from previous
// when clicked, the value from the date input is displayed in console log
// once arrow clicked, the input type data changes to reflect the image of the day for that selected date
const arrowImageChange = () => {
    myApp.previousDayArrow.on("click", function () {
        let date = myApp.userDate.val();
        date = date.split("-");
        let newYear = date[0];
        console.log(newYear)

        let newMonth = date[1];
        console.log(newMonth)
        let newDay = date[2];
        console.log(newDay)
        // all the if statememts for when forward or back in time
        //  NOT A LEAP YEAR CONDITIONS *********************************
        if (newYear % 4 != 0 && newYear % 100 == 0 || newYear % 400 != 0){
            console.log("not a leap")
            console.log(newYear)
            console.log(newMonth)
            //CONDITION: beginning of year 
            if (newMonth == 01 && newDay == 01){
                myApp.newDate = `${Number(newYear) - 1}-${12}-${31}`
                getAjaxWithNewDate();
            }
            //CONDITION: leap year CORRECTION --> NOT A LEAP YEAR, therefore 28 days 
            else if (newMonth == 03 && newDay == 01){
                myApp.newDate = `${newYear}-02-28`
                getAjaxWithNewDate();
            }
            //CONDITION: If the PREVIOUS month has 30 DAYS
            else if (newMonth == 01 || newMonth == 03 || newMonth == 05 || newMonth == 07 || newMonth == "08" || newMonth == 10|| newMonth == 12){
                console.log("here")
                if (newDay == 01){
                    if (newMonth < 10) {
                        newMonth = "0" + (newMonth - 1);
                    } else {
                        newMonth--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                    getAjaxWithNewDate();
                } else {
                    if (newDay <= 10) {
                        newDay = "0" + (newDay - 1);
                    } else {
                        newDay--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                    getAjaxWithNewDate();
                    console.log(myApp.newDate)
                }
            }
            //CONDITION: If the PREVIOUS month has 31 DAYS
            else if (newMonth == 02 || newMonth == 04 || newMonth == 06 || newMonth == "09" || newMonth == 11){
                if (newDay == 01){
                    if (newMonth < 10) {
                        newMonth = "0" + (newMonth - 1);
                    } else {
                        newMonth--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${31}`
                    getAjaxWithNewDate();
                } else {
                    if (newDay <= 10) {
                        newDay = "0" + (newDay - 1);
                    } else {
                        newDay--
                    }
                    myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                    getAjaxWithNewDate();
                }
            }
        }
        // given that it is a LEAP YEAR *********************************
        else if (newYear % 4 == 0 && newYear % 100 != 0 || newYear % 400 == 0){  
                console.log("not leap") 
                console.log(newMonth) 

                //CONDITION: beginning of year 
                if (newMonth == 01 && newDay == 01){
                    myApp.newDate = `${Number(newYear) - 1}-${12}-${31}`
                    getAjaxWithNewDate();
                }
                //CONDITION: leap year CORRECTION --> IT IS A LEAP YEAR, therefore 29 days  
                else if (newMonth == 03 && newDay == 01){
                    myApp.newDate = `${newYear}-${02}-${28}`
                    getAjaxWithNewDate();
                }
                //CONDITION: If the PREVIOUS month has 30 DAYS
                else if (newMonth == 01 || newMonth == 03 || newMonth == 05 || newMonth == 07 || newMonth == "08" || newMonth == 10|| newMonth == 12){
                    if (newDay == 01){
                        if (newMonth < 10) {
                            newMonth = "0" + (newMonth - 1);
                        } else {
                            newMonth--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${30}`
                        getAjaxWithNewDate();
                    } else {
                        if (newDay <= 10) {
                            newDay = "0" + (newDay - 1);
                        } else {
                            newDay--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                        getAjaxWithNewDate();
                    }
                }
                //CONDITION: If the PREVIOUS month has 31 DAYS
                else if (newMonth == 02 || newMonth == 04 || newMonth == 06 || newMonth == "09" || newMonth == 11){
                    if (newDay == 01){
                        if (newMonth < 10) {
                            newMonth = "0" + (newMonth - 1);
                        } else {
                            newMonth--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${31}`
                        getAjaxWithNewDate();
                    } else {
                        if (newDay <= 10) {
                            newDay = "0" + (newDay - 1);
                        } else {
                            newDay--
                        }
                        myApp.newDate = `${newYear}-${(newMonth)}-${newDay}`
                        getAjaxWithNewDate();
                    }
                }
        }
    });
}


myApp.init = function () {
todaysDateFormat();
ajaxCall();
userInputChange();
arrowImageChange();
};

$(function () {
    myApp.init();
})






