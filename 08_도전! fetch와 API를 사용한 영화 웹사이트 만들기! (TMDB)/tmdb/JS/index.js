const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDcwNWEyYmU5YjIzNDEwOGJiZDk0YWUyZmI0YzY1MCIsIm5iZiI6MTc0ODM5NDEwNi4wODUsInN1YiI6IjY4MzY2MDdhYTYzOWZjZjE3MzJiN2ZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gyUEvGOYOabeUzNfyepWmVmiv2l3QTFib7WdNZQ33JE',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayigMovies = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = '' // 모든 row를 담을 변수

      // card 5행 4열
      // results.length = 20
      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">' // 하나의 row를 담을 변수

         for (let j = 0; j < 4; j++) {
            const index = i + j
            // if (index >= results.length) break // results 배열을 벗어나면 중단

            const movie = results[index]
            // console.log(movie)

            rowHtml += `
                <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="#">
                           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}</p>
                        </div>
                     </div>
                </div>
                `
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}

getPlayigMovies(url)
