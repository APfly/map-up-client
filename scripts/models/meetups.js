'use strict';

var app = app || {};

const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
// ENV.productionApiUrl = 'https://apfly-map-up.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  function Meetups(rawMeetupsObj) {
    this.name = rawMeetupsObj.name;
    this.date = rawMeetupsObj.local_date;
    this.time = rawMeetupsObj.local_time;
    this.link = rawMeetupsObj.link;
    this.lon = rawMeetupsObj.group.lon;
    this.lat = rawMeetupsObj.group.lat;
  }

  Meetups.prototype.toHtml = function () {
    let template = Handlebars.compile($('#meetups-list-template').text());
    return template(this);
  };

  Meetups.all = [];
  Meetups.loadAll = rows => Meetups.all = JSON.parse(rows.text).events.sort((a, b) => b.title - a.title).map(meetup => new Meetups(meetup));

  Meetups.initSearch = callback =>
    $.get(`${ENV.apiUrl}/meetup/init_search`)
      .then(Meetups.loadAll)
      .then(callback)
      .then(console.log(Meetups.all))
      .catch(errorCallback);

  Meetups.newSearch = (ctx, callback) =>
    $.get(`${ENV.apiUrl}/meetup/new_search/${ctx.lat} ${ctx.lng}`)
      .then(Meetups.loadAll)
      .then(callback)
      .then(console.log(Meetups.all))
      .catch(errorCallback);

  var locationForm = document.getElementById('location-form');
  locationForm.addEventListener('submit', geoCode);

  function geoCode(e) {
    var location = document.getElementById('location-input').value;
    e.preventDefault();
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyAVGGzvV04jCERkeyLvyAfLhyw_blWCzZU'
      }
    })
      .then(function (response) {
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var geometryOutput = `
    <ul>
    <li><strong>Latitude</strong>: ${lat}</li>
    <li><strong>Longitude</strong>: ${lng}</li>    
    </ul>
    `;
        document.getElementById('geometry').innerHTML = geometryOutput;
        initMap(lat, lng)
      })
    initMap(lat, lng);
  }

  function initMap(lat, lng) {
    var uluru = { lat: lat, lng: lng };
    var location = uluru;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
    Meetups.newSearch(uluru, app.meetupView.initIndexPage)
  }

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  module.Meetups = Meetups;
})(app);

