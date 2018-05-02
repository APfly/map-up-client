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
<<<<<<< HEAD
    // resetView();
    // $('.book-view').show();
    // $('#book-list').empty();
    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml()));
    next()
=======
    resetView();
    $('.container').show();
    $('#table ul').empty();
    console.log(ctx);
    console.log(next);
    app.Meetups.all.forEach(item => $('#table ul').append(item.toHtml()));
>>>>>>> 80bc62ce240a06363fcc0e633d9e62b468649543
  }

  // meetupView.initDetailPage = function (ctx, next) {
  //   resetView();
  //   $('.detail-view').show();
  //   $('.book-detail').empty();
  //   let template = Handlebars.compile($('#book-detail-template').text());
  //   $('.book-detail').append(template(ctx.book));

  //   $('#update-btn').on('click', function () {
  //     page(`/books/${$(this).data('id')}/update`);
  //   });

  //   $('#delete-btn').on('click', function () {
  //     module.Book.destroy($(this).data('id'));
  //   });
  //   next()
  // }

  module.meetupView = meetupView;
})(app)

