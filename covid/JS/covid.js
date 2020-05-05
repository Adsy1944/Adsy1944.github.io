//Gets cumulative totals
function getTotals() {
  var settings = {
    "async" : true,
    "crossDomain" : true,
    "url" : "https://covid-19-data.p.rapidapi.com/country?format=json&name=uk",
    "method" : "GET",
    "headers" : {
      "x-rapidapi-host" : "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key" : "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9"
    }
  }
  $.ajax(settings).done(function(response) {
    console.log(response);
    $('#caseTotal').append(response[0].confirmed);
    $('#deathTotal').append(response[0].deaths);
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
