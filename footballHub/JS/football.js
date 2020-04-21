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
      var url = "'teamMenu.html?teamId=" + list.id + "'";
      $('#teamTable').append('<tr><td><button class="btn btn-lg btn-danger" style="width: 350px;" onclick="window.location.href=' + url + '">' + list.name + '</button></td></tr>');
    });
  });
}
// --------------------------------
// Gets the team details, filling out the competion table, squad table and club details
function getTeamPlayers(num) {
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
  $.each(response.squad, function (index, list) {
    $('#teamPlayers').append('<tr><td>' + list.name + '</td><td>' + nullify(list.position) + '</td><td>' + datify(list.dateOfBirth) +
    '</td><td>' + list.nationality + '</td><td>' + nullify(list.shirtNumber) + '</td><td>' + nullify(list.role) + '</td></tr>');
  });
});
}
// --------------------------------
// Gets the team competitions
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
  $.each(response.activeCompetitions, function (index, list) {
    $('#competitions').append('<tr><td>' + list.name + '</td><td>' + list.plan + '</td><td>' + datify(list.lastUpdated)
    + '</td></tr>');
  });
    $('#info').append("<tr><td>Name</td><td>" + response.name
  + "</td><td rowspan='9'><img src='" + response.crestUrl + "'>"
  + "</td></tr>"
  + "<tr><td>Address</td><td>" + response.address + "</td></tr>"
  + "<tr><td>Telephone</td><td>" + response.phone + "</td></tr>"
  + "<tr><td>Email</td><td>" + response.email + "</td></tr>"
  + "<tr><td>Website</td><td>" + response.website + "</td></tr>"
  + "<tr><td>Venue</td><td>" + response.venue + "</td></tr>"
  + "<tr><td>Club Colours</td><td>" + response.clubColors + "</td></tr>"
  + "<tr><td>Founded</td><td>" + response.founded + "</td></tr>"
  + "<tr><td>Last Updated</td><td>" + datify(response.lastUpdated) + "</td></tr>");
  //})
});
}
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


function getTeamMatches(num) {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.football-data.org/v2/teams/" + num + "/matches/",
  "method": "GET",
  "headers": {
    "X-Auth-Token": "cee1ec9bfa2c424bab6141c97368c6cd"
  }
}
$.ajax(settings).done(function (response) {
  console.log(response);
  $('#matches');
  $.each(response.matches, function (index, list) {
    console.log(list.competition.name);
    $('#matches').append("<tr><td>" + datify(list.utcDate) + "</td><td>" + list.homeTeam.name
  + "</td><td>" + list.awayTeam.name + "</td><td>" + nullify(list.score.fullTime.homeTeam)
  + " - " + nullify(list.score.fullTime.awayTeam) + "</td><td>" + list.competition.name
  + "</td><td>" + list.status + "</td></tr>");
  });
});
}
// --------------------------------
//Replaces null values with strings showing ---
function nullify(string) {
  if (string == null) {
    string = "---";
  }
  return string;
}

// --------------------------------
//Formats a JSON date to display correctly
function datify(jsonDate) {
    var date = new Date(jsonDate);
    var newDate = date.getDate() + "/" + (date.getMonth()+1) + "/"
    + date.getFullYear();
    return newDate;
}

// --------------------------------
//
function getCompetition(num) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.football-data.org/v2/competitions/" + num,
    "method": "GET",
    "headers": {
      "X-Auth-Token": "cee1ec9bfa2c424bab6141c97368c6cd"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
    $('#title').append(response.name);
  });


}
