'use strict';
var app = app || {};

(function (module) {
  $('.icon-menu').on('click', function (event) {
    $('.nav-menu').slideToggle(350);
  })

  function resetView() {
    $('.container').hide();
    $('.nav-menu').slideUp(350);
  }

  const meetupView = {};

  meetupView.initIndexPage = function (ctx, next) {

    resetView();
    $('.container').fadeIn(150);
    $('#table ul').empty();

    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml(), `<button class="save-meetup">save to my meetups</button>`));

    let saveMeetup = document.getElementsByClassName('save-meetup');
    for (let i = 0; i < saveMeetup.length; i++) {
      console.log('adding listener');
      saveMeetup[i].addEventListener('click', saveToMyMeetups);
    }
  }

  meetupView.initMyMeetupsPage = function (ctx, next) {
    $('.container').hide();    
    $('#map').hide();    
    console.log('mymeetups!');
    $('#my-meetups ul').show();
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


