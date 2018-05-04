/* new map-view.js */

'use strict';
var app = app || {};

(function (module) {
  const mapView = {};
  let locationForm = document.getElementById('location-form');
  locationForm.addEventListener('submit', geoCode);
  mapView.initGeoCode = () => {
    let location = 'seattle';
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
        app.Meetups.newSearch(searchPoint);
        disHomepage();
      })
  }
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
        app.Meetups.newSearch(searchPoint);
      })
  }
  mapView.initMap = (lat, lng) => {
    let markers = [];
    let infoWindow = new google.maps.InfoWindow();

    let searchPoint = { lat: lat, lng: lng };


    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: searchPoint,
    });

    for (let i = 0; i < app.Meetups.all.length; i++) {
      var blueIcon = new google.maps.MarkerImage(
        "http://www.clker.com/cliparts/o/t/F/J/B/k/google-maps-th.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(31.5, 51)
      );

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(app.Meetups.all[i].lat, app.Meetups.all[i].lon),
        map: map,
        icon: blueIcon
      })

      markers.push(marker);

      markers.push(new google.maps.Marker({ position: searchPoint, map: map }));

      let info = app.Meetups.all[i];

      function regTime() {
        let stringTime = info.time.toString();
        let array = stringTime.split(':');
        // let minute = array[1];
        let hour = parseInt(array[0]);
        let hourString = array[0];

        if (hour > 12) {
          let newHour = hour - 12;
          array.shift([0]);
          array.unshift(newHour);
          'PM'
          array[1] += 'PM'
        }
        if (hour < 12) {
          let num = hourString.charAt(1);
          array.shift([0]);
          array.unshift(num);
          array[1] += 'AM';
        }

        let newTime = array.join(':');
        return newTime;
      }

      function zipCode() {
        if (info.zip === undefined) {
          info.zip = '';
        } else {
          info.zip;
        }
        return info.zip;
      }

      (function (marker, info) {
        google.maps.event.addListener(marker, 'click', function (e) {
          infoWindow.setContent(
            `<div id="infobox">
              <p><a href=${info.link}>${info.name}
              <a></p>
              <ul class="infolist">
                  <li class="list-item"> <strong>Date:</strong> ${info.date} </li>
                  <li class="list-item"> <strong>Time:</strong> ${regTime()} </li>
                  <li class="list-item"> <strong>Venue name:</strong> ${info.venueName} </li>
                  <li class="list-item"> <strong>Address:</strong> ${info.address1} ${info.city} ${zipCode()} </li>
                </ul>
            </div>`)
          infoWindow.open(map, marker);
        });
      })(marker, info);

    }

  }
  module.mapView = mapView;

})(app);