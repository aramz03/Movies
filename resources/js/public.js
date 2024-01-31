$(function () {
  $('#header').load('../layout/header.html');
  $('#nav').load('../layout/nav.html');



  $(window).on('load', function () {
    //테마 설정
    var themeCk = document.getElementById('themeMode');
    themeCk.addEventListener('click', function () {
      if (this.checked) {
        document.documentElement.setAttribute('color-theme', 'dark');
      } else {
        document.documentElement.setAttribute('color-theme', 'light');
      }
      this.parentNode.classList.toggle('on')
      console.log(this.parentNode)
    });

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

    //ajax
    // $.ajax({
    //   type: 'post', // 타입 (get, post, put 등등)    
    //   url: '/test', // 요청할 서버url    
    //   async: true, // 비동기화 여부 (default : true)    
    //   headers: { // Http header      
    //     "Content-Type": "application/json",
    //     "X-HTTP-Method-Override": "POST"
    //   },
    //   dataType: 'text', // 데이터 타입 (html, xml, json, text 등등)    
    //   data: JSON.stringify({ // 보낼 데이터 (Object , String, Array)      
    //     "no": no,
    //     "name": name,
    //     "nick": nick
    //   }),
    //   success: function (result) { // 결과 성공 콜백함수        
    //     console.log(result);
    //   },
    //   error: function (request, status, error) { // 결과 에러 콜백함수        
    //     console.log(error)
    //   }
    // })

    //api
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjNlMzIyMjE0YzViNmQxMTg2YmY1N2E2NTBmMzkxOSIsInN1YiI6IjY1YjMyZGIyMGVkMmFiMDE2Mzg1ZjQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XYNiH-9xbk7HHKJK-0oTXVM_LhxeGa-2A89G5obysM",
      },
    };
    let language = 'ko-KR'
    const getImageUrl = (path, size = 400) => {
      return `https://image.tmdb.org/t/p/w${size}/${path}`;
    };

    function MovieImg(target, img, tit) {
      return (target.innerHTML = `
          <div class="movieimg">
            <img src=${img} alt="${tit}">
          </div>
          <p class="movietit">${tit}</p>
        `);
    }

    fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=${language}&include_image_language=${language}`,
        options
      )
      .then((response) => response.json())
      .then((data) => {
        let list = document.getElementById("allList");
        let movies = data.results;

        movies.forEach((movie, index) => {
          const resultElement = document.createElement("li");
          MovieImg(
            resultElement,
            getImageUrl(movies[index].poster_path),
            movies[index].title
          );
          list.appendChild(resultElement);
        });
      })
      .catch((err) => console.error(err));

  });
});