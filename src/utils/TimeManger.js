export const getCurrentDateAndTime = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = date + "-" +  month +  "-" + year + "" + ", " + hours + ":" + minutes + " " + ampm;
    return strTime;
};
