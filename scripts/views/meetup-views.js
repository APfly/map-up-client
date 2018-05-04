'use strict';
var app = app || {};

(function (module) {
  $('.icon-menu').on('click', function (event) {
    $('.nav-menu').slideToggle(350);
  })

  function resetView() {
    $('.container').hide();
    $('.nav-menu').slideUp(350);
    $('#table ul').empty();
    $('#my-meetups ul').empty();
  }

  const meetupView = {};

  meetupView.initIndexPage = function (ctx, next) {
    console.log(ctx);
    resetView();
    $('#map').show();
    $('.container').fadeIn(150);
    $('.searchbar-items').show();
    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml(), `<button class="save-meetup">save to my meetups</button>`));

    let saveMeetup = document.getElementsByClassName('save-meetup');
    for (let i = 0; i < saveMeetup.length; i++) {
      console.log('adding listener');
      saveMeetup[i].addEventListener('click', saveToMyMeetups);
    }
  }

  meetupView.initMyMeetupsPage = function (ctx, next) {
    resetView();
    $('#map').hide();
    // $('.container').hide();
    // $('#map').hide();
    $('.searchbar-items').hide();
    $('.container').fadeIn(150);

    // $('#my-meetups ul').show();
    app.Meetups.saved.forEach(item => $('#my-meetups ul').append(item.toHtml()));
  }

  function saveToMyMeetups(event) {
    event.preventDefault();
    console.log('saving the following:', $(this).prev())
    app.Meetups.saved.push(app.Meetups.all[$(this).prev().index() / 2])

    $(this).hide();
  }


  module.meetupView = meetupView;
})(app)


