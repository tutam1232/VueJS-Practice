import dbProvider from './dbProvider.js';

export default {
    props: ['resultData'],
    data() {
      return {
        movies: [],
      };
    },
    methods: {
        async getMovie(castMovie) {
          try {
            let urlDetailMovie = `detail/movie/${castMovie.id}`;
            const movieData = await dbProvider.fetch(urlDetailMovie);

            movieData.role = castMovie.role;
            this.movies.push(movieData);

          } 
          catch (error) {
            console.log(error);
          }

        },
      },
      async mounted() {
        if (this.resultData && this.resultData.castMovies) {
          for (const castMovie of this.resultData.castMovies) {
            await this.getMovie(castMovie);
          }
        }
      },
    
    template: `
    
    <div v-if="resultData" >      
        <br>
        <h2 class="text-center">{{ resultData.name }}</h2>
        <div class="d-flex">
            <img :src="resultData.image" :alt="resultData.id" class="rounded" style="margin-right: 10px; width:50%;height:50%;">
            <ul class="lead">
                <li>Role: {{ resultData.role }}</li>
                <li>Summary: {{ resultData.summary }}</li>
                <li>Birth date: {{ resultData.birthDate }}</li>
                <li>Death date: {{ resultData.deathDate }}</li>
                <li>Awards: {{ resultData.awards }}</li>
                <li>Height: {{ resultData.height }}</li>

                <br>
                <h4>Cast movies</h4>
                <br>
                
                <div v-for="(movie, index) in movies" :key="index" >
                    <div class="d-flex" style="margin:10px;" @click="$emit('imageClicked', movie.id)">
                        <img :src="movie.image" style="width:20%;height:20%;">
                        <div>
                            <h5>{{ movie.title }}</h5>
                            <div>Year published: {{ movie.year }}</div>
                            <div>Role: {{ movie.role }}</div>
                        </div>
                    </div>
                </div>

            </ul>          

        </div>

        

    </div>
        
    `,
  };
  