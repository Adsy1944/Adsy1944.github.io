// Gets a list of available teams to view.
function getTeams() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.football-data.org/v2/teams/",
    "method": "GET",
    "headers": {
      "X-Auth-Token": "cee1ec9bfa2c424bab6141c97368c6cd"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
    $.each(response.teams, function(index, list) {
      console.log(list.name);
      var url = "'team.html?teamId=" + list.id + "'";
      $('#teamTable').append('<tr><td><label>' + list.name + '</label></td><td><button onclick="window.location.href=' + url + '">Select</button></td></tr>');
    });
  });
}
// --------------------------------
// Gets the team details, filling out the competion table, squad table and club details
function getTeamCompetitions(num) {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.football-data.org/v2/teams/" + num,
  "method": "GET",
  "headers": {
    "X-Auth-Token": "cee1ec9bfa2c424bab6141c97368c6cd"
  }
}
$.ajax(settings).done(function (response) {
  console.log(response);
  $('#teamHeader').append(response.name);
  $.each(response.activeCompetitions, function(index, list) {
    $('#teamCompetitions').append('<tr><td>' + list.name + '</td><td>' + list.plan + '</td><td>' + list.lastUpdated + '</td</tr>');
  })
  $.each(response.squad, function (index, list) {
    $('#teamPlayers').append('<tr><td>' + list.name + '</td><td>' + list.position + '</td><td>' + list.dateOfBirth +
    '</td><td>' + list.nationality + '</td><td>' + list.shirtNumber + '</td><td>' + list.role + '</td></tr>');
  });
});
}
// --------------------------------

// --------------------------------
// Converts URL parameters into usable variables.
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    console.log(vars);
    return vars;
}
// --------------------------------
