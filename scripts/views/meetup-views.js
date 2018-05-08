'use strict';
var app = app || {};

(function (module) {
  $('.icon-menu').on('click', function (event) {
    $('.nav-menu').slideToggle(350);
  })

  const meetupView = {};

  meetupView.initIndexPage = function (ctx) {
    disHomepage();

    if (app.mapView.lastSearchPoint.length && app.mapView.lastSearchPoint === ctx) {
      console.log('recycling the previous table');
      $('#table ul').show();
    }
    else {
      $('#table ul').empty();
      app.Meetups.all.forEach(function (item, i) {
        if (app.Meetups.saved.some(meetup => meetup.link === item.link)) {
          console.log('found a match:', item.name);
          return $('#table ul').append(item.toHtml()) + $(`#table ul li:eq(${i})`).append(`<p class="added-note">added to my meetups &#10003</p>`) + $(`#table ul li:eq(${i}) button`).hide();
        }
        else {
          return $('#table ul').append(item.toHtml());
        }
      });
    }


    $('.save-meetup').click(function saveToMyMeetups(event) {
      event.preventDefault();
      if (app.Meetups.saved.some(meetup => meetup.link === app.Meetups.all[$(this).closest('li').index()].link)) {
        console.log('I don\'t know how you managed to click this, but you already have this meetup.');
      }
      else {
        app.Meetups.saved.push(app.Meetups.all[$(this).closest('li').index()]);
        console.log('unique entry added:', app.Meetups.all[$(this).closest('li').index()].name);
      }
      var saveMeetups = JSON.stringify(app.Meetups.saved);
      localStorage.setItem('saved-meetups', saveMeetups);
      $(this).hide();
      $(this).closest('li').append(`<p class="added-note">added to my meetups &#10003</p>`);
    });
  }

  meetupView.initMyMeetupsPage = function (ctx, next) {
    disMyMeetups();
    $('#table ul').empty();
    $('#myMeetUps ul').empty();
    app.Meetups.saved.sort((a, b) => b.date - a.date).forEach(item => $('#myMeetUps ul').append(item.toHtml()));
    $('.save-meetup').addClass('delete-meetup').removeClass('save-meetup');
    $('.delete-meetup').text('delete from my meetups');

    $('.delete-meetup').click(function saveToMyMeetups(event) {
      event.preventDefault();
      console.log($(this).closest('li').index());
      let deleteIndex = $(this).closest('li').index();
      console.log('deleting the following Meetup:', app.Meetups.saved[$(this).closest('li').index()].name);
      app.Meetups.saved = $.grep(app.Meetups.saved, function (value) {
        return value != app.Meetups.saved[deleteIndex];
      });
      console.log('current saved Meetups array:', app.Meetups.saved);
      $(this).closest('li').remove();
    });
  }
  module.meetupView = meetupView;
})(app)


