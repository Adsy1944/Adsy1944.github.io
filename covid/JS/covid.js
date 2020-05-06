var today = new Date();
today.setDate(today.getDate()-2);
var caseTotal = null;
var deathTotal = null;
var caseDaily = null;
var deathDaily = null;
var finalCase = null;
var finalDeaths = null;

//Gets cumulative totals
function getTotals() {
  var settingsToday = {
    "async" : true,
    "crossDomain" : true,
    "url" : "https://covid-19-data.p.rapidapi.com/country?format=json&name=uk",
    "method" : "GET",
    "headers" : {
      "x-rapidapi-host" : "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key" : "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9"
    }
  }
  $.ajax(settingsToday).done(function(response) {
    console.log(response);
    $('#caseTotal').append(response[0].confirmed);
    caseTotal = response[0].confirmed;
    $('#deathTotal').append(response[0].deaths);
    deathTotal = response[0].deaths;
  });
}

function getYesterday() {
  console.log("getYesterday");
  var settingsYesterday = {
	   "async": true,
	   "crossDomain": true,
	   "url": "https://covid-19-data.p.rapidapi.com/report/country/code?format=json&date-format=YYYY-MM-DD&date=" + backDate(today) + "&code=gb",
	   "method": "GET",
	   "headers": {
		     "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		     "x-rapidapi-key": "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9"
	      }
      }
  $.ajax(settingsYesterday).done(function(response) {
    caseDaily = response[0].provinces[0].confirmed;
    deathDaily = response[0].provinces[0].deaths;
    finalCase = caseTotal - caseDaily;
    console.log("finalCase: " + finalCase);
    finalDeaths = deathTotal - deathDaily;
    console.log("finalDeaths: " + finalDeaths);
    $('#dailyCases').append(finalCase);
    $('#dailyDeaths').append(finalDeaths);
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
