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

  Meetups.loadAll = rows => {
    console.log("loadAll()");
    Meetups.all = JSON.parse(rows.text).events.sort((a, b) => b.title - a.title).map(meetup => new Meetups(meetup)).filter(meetup => meetup.lat);
    return Meetups.all;
  }


  // Meetups.initSearch = callback =>
  //   $.get(`${ENV.apiUrl}/meetup/init_search`)
  //     .then(Meetups.loadAll)
  //     .then(callback)
  //     // .then(console.log(Meetups.all))
  //     .catch(errorCallback);

  Meetups.newSearch = (ctx) =>
    $.get(`${ENV.apiUrl}/meetup/new_search/${ctx.lat} ${ctx.lng}`)
      .then(Meetups.loadAll)
      .then(() => initMap(ctx.lat, ctx.lng))
      .then(app.meetupView.initIndexPage)
      .catch(errorCallback);

  let locationForm = document.getElementById('location-form');
  locationForm.addEventListener('submit', geoCode);

  function geoCode(e) {
    let location = document.getElementById('location-input').value;
    e.preventDefault();
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyAVGGzvV04jCERkeyLvyAfLhyw_blWCzZU'
      }
    })
      .then(function (response) {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let searchPoint = { lat: lat, lng: lng };
        let geometryOutput = `
          <ul>
          <li><strong>Latitude</strong>: ${lat}</li>
          <li><strong>Longitude</strong>: ${lng}</li>    
          </ul>
        `;
        document.getElementById('geometry').innerHTML = geometryOutput;
        console.log("newSearch()");
        Meetups.newSearch(searchPoint);
      })

  }

  function initMap(lat, lng) {

    console.log("initMap()");


    let markers = [];

    let searchPoint = { lat: lat, lng: lng };

    // Meetups.newSearch(searchPoint, app.meetupView.initIndexPage)

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: searchPoint
    });



    for (let i = 0; i < Meetups.all.length; i++) {
      console.log(Meetups.all[i])
      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(Meetups.all[i].lat, Meetups.all[i].lon),
        map: map

      })

      );

      markers.push(new google.maps.Marker({ position: searchPoint, map: map }));


    }

  }

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  module.Meetups = Meetups;

})(app);

  //////////////////////////////////////////////////////////////////////////////

//   var locations = [
//     {lat: 47.606100, lng: -122.330000},
//     {lat: 47.506200, lng: -122.230000},
//     {lat: 47.406300, lng: -122.130000},
//     {lat: 47.306400, lng: -122.030000}
// ]

// function initMap() {

//     var seattle = {lat: 47.606, lng: -122.330};

//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: seattle,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });




//     var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//     var pinDrop;

//     for ( let i= 0 ; i < app.Meetups.all.length ; i++ ) { 
//         pinDrop = new google.maps.Marker({
//         position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
//         map : map,
//         label: labels [i % labels.length],
//         });
//     }
//     }//close initMap

  //////////////////////////////////////////////////////////////////////////////




