window.addEventListener("load", () => {
  let BtnAcco = document.querySelectorAll('.btn_acco');

  BtnAcco.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let JsTop = this.parentNode;
      let JsBtm = JsTop.nextElementSibling;
      let pHeight = 0;
     
      // 하단 모든 p의 높이값 더하기
      JsBtm.querySelectorAll('p').forEach(function(p){
        pHeight += p.clientHeight ;
      });

      this.classList.toggle("on");
      if (this.classList.contains("on")) {
        this.querySelector("span").textContent = "닫기";
        JsBtm.classList.add("on");
        JsBtm.style.height = pHeight+'px';
      } else {
        this.querySelector("span").textContent = "열기";
        JsBtm.classList.remove("on");
        JsBtm.style.height = 0;
      }
    });
  });

});