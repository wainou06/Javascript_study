const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDcwNWEyYmU5YjIzNDEwOGJiZDk0YWUyZmI0YzY1MCIsIm5iZiI6MTc0ODM5NDEwNi4wODUsInN1YiI6IjY4MzY2MDdhYTYzOWZjZjE3MzJiN2ZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyUEvGOYOabeUzNfyepWmVmiv2l3QTFib7WdNZQ33JE',
   },
}

// 특정 쿼리 스트링 값 가져오기 (movie_id 값)
const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

// 영화
const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 영화 상세정보

const getDetailmovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
                <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9 movie-detail">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>${data.genres.map((genre) => genre.name)}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p style="text-align: justify;">${data.overview}</p>
                  </div>
               </div>
                `

      mainContainer.innerHTML += rowHtml

      // getCreditsMovie는 비동기 함수이므로 await를 붙여준다 -> getCreditsMovie 함수 아래에 실행해야 하는 코드가 있는 경우 await를 반드시 붙여야 하고 그렇지 않을 경우는 붙여도 되고 안붙여도 된다
      await getCreditsMovie(movieCreditsUrl)

      const footer = document.querySelector('footer .container p')

      footer.textContent = `TMDB MOVIE SITE`
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailmovie(movieDetailUrl)

// 출연 배우 데이터 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      let rowHtml = `<div class="row" style="margin-top:30px">`

      for (let i = 0; i < data.cast.length; i++) {
         if (i === 6) break
         // null은 false
         // profile_path가 null이면 person.png를 보여줌
         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         rowHtml += `<div class='col-sm-2 p-3'>
          <div class="card">
             <img src="${profileImg}" class="card-img-top" alt="${data.cast[i].name}">
              <div class="card-body">
                 <p class="card-text">${data.cast[i].name}</p>
              </div>
          </div>
       </div>`
      }

      rowHtml += `</div>`

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
