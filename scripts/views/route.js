page('/'
  , ctx => app.Meetups.initSearch(ctx), () => app.meetupView.initIndexPage(), disHomepage);
page('/about', disAbout);

function disHomepage() {
  console.log('home')
  $('#mainPage').fadeIn(250);
  $('#aboutPage').hide(250);
}

function disAbout() {
  console.log('about')
  $('#mainPage').fadeOut(250);
  $('#aboutPage').fadeIn(250);
}





// $('.lr3').on('click', () => {
//     $('#ABOUT').fadeOut(200);
//     $('#BLOG').fadeOut(200);
//     $('#EVENTS').delay(200).slideDown(300);
//     $('.foot').fadeIn(20);

//     $('.logo1').fadeIn(200);
//     $('.logo1').delay(200).fadeOut(200);
//   })

//   $('#aboutLink').on('mouseenter', () => {
//     $('#aboutLink').addClass('.localhover');
//   })

//   $('#blogLink').on('mouseenter', () => {
//     $('#blogLink').addClass('.localhover');
//   })

//   $('#eventsLink').on('mouseenter', () => {
//     $('#eventsLink').addClass('.localhover');
//   })

// })


page('/mymeetups', ctx => app.meetupView.initMyMeetupsPage())
page();
