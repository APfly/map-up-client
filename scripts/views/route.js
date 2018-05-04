page('/', disHomepage);
page('/about', disAbout);

page('/mymeetups', ctx => app.meetupView.initMyMeetupsPage())//disMyMeetups()
//disMyMeetups() called here^

var pinIsDown = true;

function turnDialUP() {
  $('#pin').addClass('rotate');
  $('#pinLeft').addClass('rotateL');
  $('#searchBar').slideUp(150);
  $('#nav').slideDown(150);
  pinIsDown = false;
}

function turnDialDOWN() {
  $('#pin').removeClass('rotate');
  $('#pinLeft').removeClass('rotateL');
  $('#searchBar').slideDown(150);
  $('#nav').slideUp(150);
  $('#myMeetUps').hide();
  $('#aboutPage').hide();

  pinIsDown = true;
}

$('#location-form').on('submit', () => {
  $('#map').slideDown();
  $('#emeryIsBadAtNamingVariables').show();
  $('.homeNav').hide();
})

function pageReset() {
  pinDown = true;
  $('#aboutPage').hide();
  $('#myMeetUps').hide();
  $('#map').slideDown(250);
  $('#emeryIsBadAtNamingVariables').slideDown(250);
}

function disHomepage() {
  pageReset();
  $('.homeNav').hide();
  turnDialDOWN();
}

function disAbout() {
  $('#searchBar').hide();
  $('#nav').show();
  $('#myMeetUps').hide();
  $('#map').hide();
  $('#aboutPage').slideDown(250);
  $('#emeryIsBadAtNamingVariables').hide();
  $('.homeNav').show();

}

function disMyMeetups() {
  $('#searchBar').hide();
  $('#nav').show();
  $('#myMeetUps').slideDown(250);
  $('#map').hide();
  $('#aboutPage').hide();
  $('#emeryIsBadAtNamingVariables').hide();
  $('.homeNav').show();
}

page();
