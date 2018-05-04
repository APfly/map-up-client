'use strict'

$(document).ready(() => {

    $('#aboutPage').hide();
    // $('#searchBar').hide();

    $('#pin').on('click', () => {
        $('#pin').toggleClass('rotate');
        $('#searchBar').slideToggle(150);
        $('#discover').slideToggle(150)
     })

     $('#location-form').on('submit', () => {
        $('#map').slideDown(100);

     })
    

})
// $(document).ready(() => {
//   $('.logo2').fadeIn(1500);
//   $('.logo1').fadeOut(1500);

//   $('.logo2').on('click', () => {
//     $('.logo2').fadeOut(250);
//     $('.logoC').fadeIn(250);
//     $('#ABOUT').slideUp(100);
//     $('#BLOG').slideUp(100);
//     $('#EVENTS').slideUp(100);
//     $('.logo2').delay(200).fadeIn(200);
//     $('.logoC').delay(200).fadeOut(200);
//     $('.navBar').slideToggle(200);
//     $('.foot').fadeToggle(20);
//     $('.article-body').slideUp(300);
//   })

//   $('.lr1').on('click', () => {
//     $('#ABOUT').delay(200).slideDown(300);
//     $('#BLOG').fadeOut(200);
//     $('#EVENTS').fadeOut(200);
//     $('.foot').fadeIn(20);
//     $('.logo1').fadeIn(200);
//     $('.logo1').delay(200).fadeOut(200);
//   })

//   $('.lr2').on('click', () => {
//     $('#ABOUT').fadeOut(200);
//     $('.article-body').addClass('articleHide');
//     $('#BLOG').delay(200).slideDown(300);
//     $('#EVENTS').fadeOut(200);
//     $('.foot').fadeIn(20);
//     $('.logo1').fadeIn(200);
//     $('.logo1').delay(200).fadeOut(200);
//   })
  
//   function blogToggle( event ) {
//     var target = $( event.target );
//     target.children('.article-body').slideToggle(300);
//   }
//   $( 'header' ).click( blogToggle );

//   function blogToggleByTitle( event ) {
//     var target2 = $(event.target).closest('.blogHeader').find('.article-body');
//     target2.slideToggle(300);
//   }
//   $( 'header h1' ).click( blogToggleByTitle );


//   $('.lr3').on('click', () => {
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