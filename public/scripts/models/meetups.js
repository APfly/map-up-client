'use strict';

var app = app || {};

const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
// ENV.productionApiUrl = 'https://apfly-map-up.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;



(function (module) {
  $.get(`${ENV.apiUrl}/meetup/upcoming_events`)
    .then(data => console.log('data back from server: ', JSON.parse(data.text)))
    .catch(error => console.log(error.message));
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Meetups(rawMeetupsObj) {
    console.log('test');
    Object.keys(rawMeetupsObj).forEach(key => this[key] = rawMeetupsObj[key]);
  }

  Meetups.prototype.toHtml = function () {
    let template = Handlebars.compile($('#meetups-list-template').text());
    console.log('inside meetup proto');
    return template(this);
  };
  console.log('testing 1-2-3');
  Meetups.all = [];
  Meetups.loadAll = rows => Meetups.all = JSON.parse(rows.text).events.sort((a, b) => b.title - a.title).map(meetup => new Meetups(meetup));
  Meetups.fetchAll = callback =>
    $.get(`${ENV.apiUrl}/meetup/upcoming_events`)
      // .then(console.log('test'))
      .then(Meetups.loadAll)
      .then(callback)
      .catch(errorCallback);

  // Meetups.fetchOne = (ctx, callback) =>
  //   $.get(`${ENV.apiUrl}/api/v1/meetups/${ctx.params.meetup_id}`)
  //     .then(results => ctx.meetup = results[0])
  //     .then(callback)
  //     .catch(errorCallback);

  // Meetups.create = meetup =>
  //   $.post(`${ENV.apiUrl}/api/v1/meetups`, meetup)
  //     .then(() => page('/'))
  //     .catch(errorCallback);

  // Meetups.update = (meetup, meetupId) =>
  //   $.ajax({
  //     url: `${ENV.apiUrl}/api/v1/meetups/${meetupId}`,
  //     method: 'PUT',
  //     data: meetup,
  //   })
  //     .then(() => page(`/meetups/${meetupId}`))
  //     .catch(errorCallback);

  // Meetups.destroy = id =>
  //   $.ajax({
  //     url: `${ENV.apiUrl}/api/v1/meetups/${id}`,
  //     method: 'DELETE',
  //   })
  //     .then(() => page('/'))
  //     .catch(errorCallback);

  // // COMMENT: Where is this method invoked? What is passed in as the 'book' argument when invoked? What callback will be invoked after Book.loadAll is invoked?
  // Meetups.find = (meetup, callback) =>
  //   $.get(`${ENV.apiUrl}/api/v1/meetups/find`, meetup)
  //     .then(Meetups.loadAll)
  //     .then(callback)
  //     .catch(errorCallback);

  // // COMMENT: Where is this method invoked? How does it differ from the Book.find method, above?
  // Meetups.findOne = isbn =>
  //   $.get(`${ENV.apiUrl}/api/v1/meetups/find/${isbn}`)
  //     .then(Meetups.create)
  //     .catch(errorCallback);

  module.Meetups = Meetups;
})(app);

