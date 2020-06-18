var totalCases = null;
var totalDeaths = null;

//Gets cumulative totals
function getTotals() {
  var date = null;
  var settingsToday = {
    "async": true,
	"crossDomain": true,
	"url": "https://covid-19-data.p.rapidapi.com/country/code?format=json&code=gb",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9"
       }
     }
  $.ajax(settingsToday).done(function(response) {
    $('#caseTotal').append(response[0].confirmed);
    totalCases = response[0].confirmed;
    $('#deathTotal').append(response[0].deaths);
    totalDeaths = response[0].deaths;
    date = response[0].lastChange;
    setTimeout(function() {getDay(date)},1500);
  });
}

function getDay(date){
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);
  var dailyCases = null;
  var dailyDeaths = null;
  var result = null;
  var settingsDate = {
  "async": true,
  "crossDomain": true,
  "url": "https://covid-19-data.p.rapidapi.com/report/country/code?format=json&date-format=YYYY-MM-DD&date=" + backDate(newDate) + "&code=gb",
  "method": "GET",
  "headers": {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "c6f23c4c02mshb135ec8895eeb2fp156352jsna8e730d46ed9"
     }
  }
  $.ajax(settingsDate).done(function(response) {
    console.log(response);
    dailyCases = response[0].provinces[0].confirmed;
    $('#dailyCases').append(totalCases - dailyCases);
    dailyDeaths = response[0].provinces[0].deaths;
    $('#dailyDeaths').append(totalDeaths - dailyDeaths);
    $('#date').append(datify(date));
  });
}


function getYesterday() {
  var settingsYesterday = {
	   "async": true,
	   "crossDomain": true,
	   "url": "https://covid-19-data.p.rapidapi.com/report/country/code?format=json&date-format=YYYY-MM-DD&date=" + backDate(dayTwo) + "&code=gb",
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
    finalDeaths = deathTotal - deathDaily;
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
