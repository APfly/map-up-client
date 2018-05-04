'use strict';
var app = app || {};

(function (module) {
  $('.icon-menu').on('click', function (event) {
    $('.nav-menu').slideToggle(350);
  })

  $('#table ul li + .save-meetup').css('border', '1px solid #fff');

  const meetupView = {};

  meetupView.initIndexPage = function (ctx, next) {
    $('#location-input').val('');
    $('#table ul').empty();
    $('#my-meetups ul').empty();
    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml(), `<button class="save-meetup">save to my meetups</button>`));

    let saveMeetup = document.getElementsByClassName('save-meetup');
    for (let i = 0; i < saveMeetup.length; i++) {
      console.log('adding listener');
      saveMeetup[i].addEventListener('click', saveToMyMeetups);
    }
  }

  meetupView.initMyMeetupsPage = function (ctx, next) {

    disMyMeetups();
    $('#table ul').empty();
    $('#myMeetUps ul').empty();
    app.Meetups.saved.forEach(item => $('#myMeetUps ul').append(item.toHtml()));
  }

  function saveToMyMeetups(event) {
    event.preventDefault();
    console.log('saving the following:', $(this).prev())
    console.log(app.Meetups.all[$(this).prev().index() / 2].link);
    if (app.Meetups.saved.some(meetup => meetup.link === app.Meetups.all[$(this).prev().index() / 2].link)) {
      console.log('you already have that meetup');
    }
    else {
      app.Meetups.saved.push(app.Meetups.all[$(this).prev().index() / 2]);
      console.log('unique entry added');
    }
    var saveMeetups = JSON.stringify(app.Meetups.saved);
    localStorage.setItem('saved-meetups', saveMeetups);
    $(this).hide();
  }


  module.meetupView = meetupView;
})(app)


