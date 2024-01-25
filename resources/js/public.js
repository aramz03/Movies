$(window).on('load', function () {
  //nav 클릭
  $('nav li').click(function () {
    $(this).addClass("on").siblings().removeClass("on");
  });
  //info 클릭
  $('.ib_img').click(function () {
    $('.ib_list').toggleClass('on');
  });
  //js-taplist 클릭
  $('.js-taplist li').click(function () {
    $(this).addClass("on").siblings().removeClass("on");
  });
});