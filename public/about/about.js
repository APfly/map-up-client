$(document).ready(function(){
  $(".about-img").mouseover(function(){
    console.log($(this).siblings())
      $(this).siblings().children('.joke').css("display", "none");
      $(this).siblings().children('.p-line').css("display", "block");
  });

  $(".about-img").mouseout(function(){
    $(this).siblings().children('.joke').css("display", "block");
      $(this).siblings().children('.p-line').css("display", "none");
  });
});