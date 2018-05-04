/* new meetups.js */
'use strict';

var app = app || {};

const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://apfly-map-up.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  function Meetups(rawMeetupsObj) {
    if (rawMeetupsObj.venueName) {
      this.name = rawMeetupsObj.name;
      this.date = rawMeetupsObj.date;
      this.time = rawMeetupsObj.time;
      this.link = rawMeetupsObj.link;
      this.lon = rawMeetupsObj.lon;
      this.lat = rawMeetupsObj.lat;
      this.venueName = rawMeetupsObj.venueName;
      this.address1 = rawMeetupsObj.address1;
      this.address2 = rawMeetupsObj.address2;
      this.city = rawMeetupsObj.city;
      this.state = rawMeetupsObj.state;
      this.zip = rawMeetupsObj.zip;
    }
    else {
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
  }

  Meetups.prototype.toHtml = function () {
    let template = Handlebars.compile($('#meetups-list-template').text());
    return template(this);
  };

  Meetups.all = [];
  Meetups.saved = [];

  Meetups.loadAll = rows => {
    Meetups.all = JSON.parse(rows.text).events.sort((a, b) => b.title - a.title).map(meetup => new Meetups(meetup)).filter(meetup => meetup.lat);
    return Meetups.all;
  }


  function localStorageCheck() {
    var savedMeetupsAsString = localStorage.getItem('saved-meetups');
    let usableSavedMeetups = JSON.parse(savedMeetupsAsString);
    if (usableSavedMeetups && usableSavedMeetups.length) {
      Meetups.saved = usableSavedMeetups.map(meetup => new Meetups(meetup));
      console.log('loaded from local storage');
    } else {
      console.log('starting from scratch');
    }
  }
  localStorageCheck();

  Meetups.newSearch = (ctx) =>
    $.get(`${ENV.apiUrl}/meetup/new_search/${ctx.lat} ${ctx.lng}`)
      .then(Meetups.loadAll)
      .then(() => app.mapView.initMap(ctx.lat, ctx.lng))
      .then(app.meetupView.initIndexPage)
      .catch(errorCallback);

  function errorCallback(err) {
    console.error(err);
  }

  module.Meetups = Meetups;

})(app);