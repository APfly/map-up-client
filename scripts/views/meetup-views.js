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

    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml()));
  }
  module.meetupView = meetupView;
})(app)

