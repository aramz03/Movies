$(window).on('load', function () {
  //테마 설정
  var radios = document.getElementsByName('tchgRadio');
  radios.forEach(function(radio){
    radio.addEventListener('click',function(){
      if(this.id == "lightmode"){
        document.documentElement.setAttribute('color-theme','light')
      }else if (this.id == "darkmode"){
        document.documentElement.setAttribute('color-theme','dark')
      }
    });
  })

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