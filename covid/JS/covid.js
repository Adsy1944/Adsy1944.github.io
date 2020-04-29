function getDailyCase1() {
  var date = new Date();
  date.setDate(date.getDate()-1);
  console.log(backDate(date));
  var settings = {
    "async" : true,
    "crossDomain" : true,
    "method" : "GET",
    "url" : "https:\//covid-19-data.p.rapidapi.com/report/country/code?format=json&date-format=YYYY-MM-DD&date=" + backDate(date) + "&code=gb",
    "headers" : {
      "X-RapidAPI-Key" : "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9",
      "x-rapidapi-host" : "covid-19-data.p.rapidapi.com"
    }
  }
  $.ajax(settings).done(function (response) {
    $.each(response.provinces, function(index, list) {
      if (list.province == "UK") {
        $('#caseData1').append(list.confirmed);
        console.log("list: /n" + list.confirmed)
        $('#caseDate1').append(datify(date));
        console.log(date);
      }
    });
  });
}
// --------------------------------
//
function backDate(date) {
  var newDate = date.getFullYear() + "-";
  if ((date.getMonth()+1) < 10) {
    newDate += "0" + (date.getMonth()+1)
  }
  else {
    newDate += (date.getMonth()+1)
  }
  newDate += "-" + date.getDate();
  return newDate;
}

// --------------------------------
//Formats a JSON date to display correctly
function datify(jsonDate) {
    var date = new Date(jsonDate);
    var newDate = date.getDate() + "/" + (date.getMonth()+1) + "/"
    + date.getFullYear();
    return newDate;
}
