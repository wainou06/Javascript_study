const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDcwNWEyYmU5YjIzNDEwOGJiZDk0YWUyZmI0YzY1MCIsIm5iZiI6MTc0ODM5NDEwNi4wODUsInN1YiI6IjY4MzY2MDdhYTYzOWZjZjE3MzJiN2ZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyUEvGOYOabeUzNfyepWmVmiv2l3QTFib7WdNZQ33JE',
   },
}

// TV, series_id 값
const urlParams = new URLSearchParams(location.search)

const tvId = urlParams.get('series_id')

// TV
const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`

const mainContainer = document.querySelector('main .container')

// TV 상세정보

const getDetailtv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
      <div class="row tvcon">
      <div class="col-sm-3" style="text-align:center">
      <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%"/>
      </div>
      <div class="col-sm-6 tv-detail">
      <h2>${data.name}</h2>
      <ul class="tv-info">
      <li>원제 ${data.original_name}, ${data.original_language === 'ko' ? '한국어' : '외국어'}</li>
      <li>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</li>
      <li>최근 방영일 ${data.last_air_date}</li>
      <li>처음 방영일 ${data.first_air_date}</li>
      </ul>
      
      <p>줄거리</p>
      <p style="text-align: justify;">${data.overview}</p>
      </div>
      </div>
      `
      // 시즌, 회차 정보

      const series = data.seasons

      let colHtml = `
      <div class="row tvcon" style="margin-top:30px; ">
      <ul class="series">`

      for (let i = 0; i < series.length; i++) {
         colHtml += `
         <li class="col-sm-9 p-1">
         <a href="#">
         ${series[i].name}(평점 ${Number(series[i].vote_average) === 0 ? '미반영' : series[i].vote_average})보러가기 - ${series[i].air_date === null ? '제작 중' : series[i].air_date + ' 방영'}
         </a>
         </li>
         `
      }

      colHtml += `</ul></div>`

      mainContainer.innerHTML += rowHtml + colHtml

      const footer = document.querySelector('footer .container p')

      footer.textContent = `TMDB TV SITE`
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailtv(tvDetailUrl)
