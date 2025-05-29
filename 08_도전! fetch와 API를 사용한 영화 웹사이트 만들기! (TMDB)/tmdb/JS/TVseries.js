const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDcwNWEyYmU5YjIzNDEwOGJiZDk0YWUyZmI0YzY1MCIsIm5iZiI6MTc0ODM5NDEwNi4wODUsInN1YiI6IjY4MzY2MDdhYTYzOWZjZjE3MzJiN2ZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyUEvGOYOabeUzNfyepWmVmiv2l3QTFib7WdNZQ33JE',
   },
}

const url = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=3&with_original_language=ko'

const getPopularTv = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      // card 2행 10열
      // results.length = 20
      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 2; j++) {
            const index = i + j

            const tv = results[index]

            rowHtml += `
             <div class="col-sm-6 p-3">
                     <div class="card" id="tv-card">
                        <a href="detail.html?series_id=${tv.id}">
                           <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.name}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${tv.name}</p>
                           <p class="card-text average">${Number(tv.vote_average) === 0 ? '미반영' : tv.vote_average.toFixed(1) + '점'}</p>
                           <p class="card-text">줄거리</p>
                           <p class="card-text overview">${tv.overview}</p>
                        </div>
                     </div>
                </div>
             `
            console.log(tv)
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러발생:', error)
   }
}

getPopularTv(url)
