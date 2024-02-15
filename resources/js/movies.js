$(window).on("load", function () {
  let Loading = document.getElementById("loading");
  let MainTit = document.getElementById("mainTit");
  let Section = document.querySelector("section");
  let Sectionwrap = Section.querySelector(".wrap");
 console.log(Section);
  //api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjNlMzIyMjE0YzViNmQxMTg2YmY1N2E2NTBmMzkxOSIsInN1YiI6IjY1YjMyZGIyMGVkMmFiMDE2Mzg1ZjQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XYNiH-9xbk7HHKJK-0oTXVM_LhxeGa-2A89G5obysM",
    },
  };

  //언어설정
  let language = "ko-KR";
 
  // 이미지 가져오기
  const getImageUrl = (path, width='w300') => {
    let imageUrl;
    if(path == null){
      imageUrl = `https://lh3.googleusercontent.com/proxy/bhhy7wnMPZikKMSmdLzokq6eLmQP9t-cxGElvFxZ0xPtyvAe_1uODCXZKoRNh26FlIXtg2nVS-kj8RoPMxWIVYeYaZHGhWbDKAoM8-OgoJfqkyomiyyloXYO2Rnql6rGRA`;
    }else {
      imageUrl = `https://image.tmdb.org/t/p/${width}/${path}`;
    }
    return imageUrl;
  };

  // 영화 팝업 열기
  function MoviePop(target, img, tit, overview, rdate) {
    let Img = target.querySelector(".img_mv img");
    let MoviedTit = target.querySelector(".moviedtit");
    let MoviedInfo = target.querySelector(".moviedinfo");
    let MoviedRdate = target.querySelector(".moviedrdate");
    Loading.style.display = "flex";

    $(Img).on("load", function () {
      Loading.style.display = "none";
      document.querySelector(".mask").style.display = "block";
      document.querySelector(".popup").style.display = "flex";
    });
    Img.setAttribute("src", img);
    Img.setAttribute("alt", tit);
    MoviedTit.innerText = tit;
    MoviedInfo.innerText = overview;
    MoviedRdate.innerText = rdate;
  }
  // 영화 리스트
  function MovieImg(target, img, tit) {
    let html = `
    <div class="movieimg">
      <img src=${img} alt="${tit}">
    </div>
    <p class="movietit">${tit}</p>
    `;
    return (target.innerHTML = html);
  }
  Section.addEventListener('scroll', () => { 
    console.log(Section.scrollX, Section.pageYOffset);
    console.log(Sectionwrap.scrollX, Sectionwrap.pageYOffset);
  });
  // 오늘 뜨는 영화
  for(let i=1; i<6; i++){
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=${language}&include_adult=false&page=${i}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let List = document.getElementById("allList");
        let Content = document.getElementById("dpContent");
        let movies = data.results;
  
        movies.forEach((movie, index) => {
          const resultElement = document.createElement("li");
          resultElement.addEventListener("click", function () {
            MoviePop(
              Content,
              getImageUrl(movies[index].backdrop_path, 'original'),
              movies[index].title,
              movies[index].overview,
              movies[index].release_date,
            );
          });
          MovieImg(
            resultElement,
            getImageUrl(movies[index].poster_path),
            movies[index].title
          );
          List.appendChild(resultElement);
          // console.log(movies[index]);
        });
      })
      .catch((err) => console.error(err));
  
  }
 
  //검색어 가져오기
  let SearchBox = document.getElementById("searchBox");
  let searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener('click',function(){
    let search = SearchBox.value;
    console.log(search)
    // 영화 검색
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=${language}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let List = document.getElementById("allList");
        let Content = document.getElementById("dpContent");
        let movies = data.results;
        List.replaceChildren();
        MainTit.innerText = "검색결과";
        movies.forEach((movie, index) => {
          const resultElement = document.createElement("li");
          resultElement.addEventListener("click", function () {
            MoviePop(
              Content,
              getImageUrl(movies[index].backdrop_path, 'original'),
              movies[index].title,
              movies[index].overview,
              movies[index].release_date,
            );
          });
          MovieImg(
            resultElement,
            getImageUrl(movies[index].poster_path),
            movies[index].title
          );
          List.appendChild(resultElement);
          console.log(movies[index]);

        });
      })
      .catch((err) => console.error(err));
})
});