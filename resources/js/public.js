$(function () {
  $('#header').load('../layout/header.html');
  $('#nav').load('../layout/nav.html');

  $(window).on('load', function () {
    //테마 설정
    var themeCk = document.getElementById("themeMode");
    themeCk.addEventListener("click", function () {
      if (this.checked) {
        document.documentElement.setAttribute("color-theme", "dark");
      } else {
        document.documentElement.setAttribute("color-theme", "light");
      }
      this.parentNode.classList.toggle("on");
      console.log(this.parentNode);
    });

    //nav 클릭
    $("nav li").click(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });
    //info 클릭
    $(".ib_img").click(function () {
      $(".ib_list").toggleClass("on");
    });
    //js-taplist 클릭
    $(".js-taplist li").click(function () {
      $(this).addClass("on").siblings().removeClass("on");
    });
    //팝업 닫기
    $(".js-popclose").click(function () {
      $(".mask").fadeOut();
      $(this).parents(".popup").fadeOut();
    });
  });
});