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
    if (rawMeetupsObj.venue) {
      this.lon = rawMeetupsObj.venue.lon;
      this.lat = rawMeetupsObj.venue.lat;
      this.venueName = rawMeetupsObj.venue.name;
      this.address1 = rawMeetupsObj.venue.address_1;
      this.address2 = rawMeetupsObj.venue.address_2;
      this.city = rawMeetupsObj.venue.city;
      this.state = rawMeetupsObj.venue.state;
      this.zip = rawMeetupsObj.venue.zip;
    }
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
    let infoWindow = new google.maps.InfoWindow();

    let searchPoint = { lat: lat, lng: lng };


    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: searchPoint,
    });

    // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    // var beachMarker = new google.maps.Marker({
    //   position: searchPoint,
    //   map: map,
    //   icon: image
    // });

    for (let i = 0; i < Meetups.all.length; i++) {

      // var blueIcon = {
      //   url: 'http://www.clker.com/cliparts/o/t/F/J/B/k/google-maps-th.png',
      //   size: new google.maps.Size(40, 64),
      //   origin: new google.maps.Point(15, 16)
      // }

      var blueIcon = new google.maps.MarkerImage(
        "http://www.clker.com/cliparts/o/t/F/J/B/k/google-maps-th.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(31.5, 51)
      );
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(Meetups.all[i].lat, Meetups.all[i].lon),
        map: map,
        icon: blueIcon
      })

      markers.push(marker);

      markers.push(new google.maps.Marker({ position: searchPoint, map: map }));

      let info = Meetups.all[i];

      (function (marker, info) {
        google.maps.event.addListener(marker, 'click', function (e) {
          infoWindow.setContent(
            `<div>${info.name}
              <ul>
                <li> ${info.date} </li>
                <li> ${info.time} </li>
                <li> ${info.venueName} </li>
                <li> ${info.address1} ${info.city}, ${info.zip} </li>
            </div>`)
          infoWindow.open(map, marker);
        });
      })(marker, info);

    }

  }

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  module.Meetups = Meetups;

})(app);



