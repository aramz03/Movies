window.addEventListener("load", function () {
  let MainTit = document.getElementById("mainTit");
  let BtnMore = document.querySelector(".btn_more");
  let i = 1;
  let Loading = document.getElementById("loading");
  Loading.style.display = "flex";

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
  const getImageUrl = (path, width = "w300") => {
    let imageUrl;
    if (path == null) {
      imageUrl = `../../resources/images/img_noimg.png`;
    } else {
      imageUrl = `https://image.tmdb.org/t/p/${width}/${path}`;
    }
    return imageUrl;
  };

  // 영화 팝업 열기
  function MoviePop(target, img, avg, tit, orgtit, overview, rdate, actor, genre, keyword) {
    let Img = target.querySelector(".img_mv img");
    let MoviedAvg = target.querySelector(".moviedavg");
    let MoviedTit = target.querySelector(".moviedtit");
    let MoviedInfo = target.querySelector(".moviedinfo");
    let MoviedRdate = target.querySelector(".moviedrdate");
    let MoviedActor = target.querySelector(".moviedactor");
    let MoviedGenre = target.querySelector(".moviedgenre");
    let MoviedKeyword = target.querySelector(".moviedkeyword");
    Loading.style.display = "flex";
 
    $(Img).on("load", function () {
      Loading.style.display = "none";
      document.querySelector(".mask").style.display = "block";
      document.querySelector(".popup").style.display = "flex";
      document.querySelector(".popup").setAttribute("tabindex", 0);
      document.querySelector(".popup").focus();
    });
    Img.setAttribute("src", img);
    Img.setAttribute("alt", tit);
    MoviedAvg.innerText = avg.toFixed(1);
    MoviedTit.innerHTML = `${tit} <span>(${orgtit})</span>`;
    MoviedInfo.innerText = overview;
    MoviedRdate.innerText = rdate;
    MoviedActor.innerText = actor;
    MoviedGenre.innerText = genre;
    MoviedKeyword.innerText = keyword;
  }
  // 영화 리스트
  function MovieImg(target, img, tit) {
    let html = `
    <a href="#">
      <div class="movieimg">
        <img src=${img} alt="${tit}">
      </div>
      <p class="movietit">${tit}</p>
    </a>
    `;
    return (target.innerHTML = html);
  }

  // 지금 인기 영화 (전체보기)
  function AllMovie() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=${language}&include_adult=false&page=${i}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let List = document.getElementById("allList");
        let Content = document.getElementById("dpContent");
        let movies = data.results;

        Promise.all(
          movies.map((movie) =>
            Promise.all([DetailMovie(movie.id), KeywordMovie(movie.id), ActorMovie(movie.id)])
          )
        )
          .then((DetailArray) => {
            movies.forEach((movie, index) => {
              const resultElement = document.createElement("li");
              const genre = DetailArray[index][0];
              const keyword = DetailArray[index][1];
              const actor = DetailArray[index][2];
              let keywordRE;
              let genreRE;
              let actorRE = actor.join(',').replace(/,/g, ', ');

              console.log(actorRE);
              if (genre.length === 0) {
                genreRE = "없음"
             } else {
                genreRE = genre.join(',').replace(/,/g, ', ');
             }
              if (keyword.length === 0) {
                 keywordRE = "없음"
              } else {
                 keywordRE = keyword.join(',').replace(/,/g, ', ');
              }
              resultElement.addEventListener("click", function () {
                MoviePop(
                  Content,
                  getImageUrl(movie.backdrop_path, "original"),
                  movie.vote_average,
                  movie.title,
                  movie.original_title,
                  movie.overview,
                  movie.release_date,
                  actorRE,
                  genreRE,
                  keywordRE
                );
              });
              MovieImg(
                resultElement,
                getImageUrl(movie.poster_path),
                movie.title
              );
              List.appendChild(resultElement);
              Loading.style.display = "none";

              // console.log(movies[index]);
            });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  // 영화 검색
  function SrhMovie(search) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=${language}&page=${i}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let List = document.getElementById("allList");
        let Content = document.getElementById("dpContent");
        let movies = data.results;
        List.replaceChildren();
        MainTit.innerText = "검색결과";
      
        Promise.all(
          movies.map((movie) =>
            Promise.all([DetailMovie(movie.id), KeywordMovie(movie.id), ActorMovie(movie.id)])
          )
        )
          .then((DetailArray) => {
            movies.forEach((movie, index) => {
              const resultElement = document.createElement("li");
              const genre = DetailArray[index][0];
              const keyword = DetailArray[index][1];
              const actor = DetailArray[index][2];
              let keywordRE;
              let genreRE;
              let actorRE = actor.join(',').replace(/,/g, ', ');

              console.log(actorRE);
              if (genre.length === 0) {
                genreRE = "없음"
             } else {
                genreRE = genre.join(',').replace(/,/g, ', ');
             }
              if (keyword.length === 0) {
                 keywordRE = "없음"
              } else {
                 keywordRE = keyword.join(',').replace(/,/g, ', ');
              }
              resultElement.addEventListener("click", function () {
                MoviePop(
                  Content,
                  getImageUrl(movie.backdrop_path, "original"),
                  movie.vote_average,
                  movie.title,
                  movie.original_title,
                  movie.overview,
                  movie.release_date,
                  actorRE,
                  genreRE,
                  keywordRE
                );
              });
              MovieImg(
                resultElement,
                getImageUrl(movie.poster_path),
                movie.title
              );
              List.appendChild(resultElement);
              Loading.style.display = "none";

              // console.log(movies[index]);
            });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  // 영화 장르
  function DetailMovie(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=${language}`, options)
        .then((response) => response.json())
        .then((data) => {
          let genres = data.genres;
          const genre = genres.map((genre) => genre.name);
          resolve(genre);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
  // 영화 키워드
  function KeywordMovie(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/keywords`, options)
        .then((response) => response.json())
        .then((data) => {
          let keywords = data.keywords;
          const keyword = keywords.map((keyword) => keyword.name);
          resolve(keyword);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
  // 영화 출연진
  function ActorMovie(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let actors = data.cast;

          const actorNames = actors
            .filter((actor) => actor.known_for_department === "Acting")
            .map((actor) => actor.name).slice(0, 5);
            console.log(actors);

          resolve(actorNames);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
  // BtnMore.addEventListener('click', function () {
  //   i++;
  //   AllMovie();
  //   console.log(i);
  // });

  //검색어 가져오기
  let SearchBox = document.getElementById("searchBox");
  let searchBtn = document.getElementById("searchBtn");
  SearchBox.addEventListener("keypress", function (e) {
    let search = SearchBox.value;
    if (e.keyCode == 13) {
      e.preventDefault();
      Loading.style.display = "flex";
      SrhMovie(search);
    }
  });
  searchBtn.addEventListener("click", function () {
    let search = SearchBox.value;
    Loading.style.display = "flex";
    SrhMovie(search);
  });

  AllMovie();
});
