export default {
    props: ['resultData'],
    data() {
      return {};
    },
    template: `
      <div :id="resultData.id" class="d-flex MovieDetail text-black">
        <img :src="resultData.image" :alt="resultData.title" class="w-50">
        <div class="float-start" style="margin: 20px;">
          <h1 class="text-center">{{ resultData.title }}</h1>
          <br>
          <ul class="lead">
            <li>
              <div>Publish year: {{ resultData.year }}</div>
            </li>

            <li v-if="resultData.directorList">
              <span>Directors: </span>
              <span v-for="(director, index) in resultData.directorList" :key="director.id">
                <a :href="'#' + director.id">{{ director.name }}</a>
                <span v-if="index < resultData.directorList.length - 1">, </span>
              </span>
            </li>

            <li v-if="resultData.plot">
              <div>Description: {{ resultData.plot }}</div>
            </li>

            <li v-if="resultData.actorList">
              <span>Actors: </span>
              <span v-for="(actor, index) in resultData.actorList" :key="actor.id">
                <a :href="'#' + actor.id">{{ actor.name }}</a>
                <span v-if="index < resultData.actorList.length - 1">, </span>
              </span>
            </li>

            <li v-if="resultData.genreList">
              <span>Genres: </span>
              <span v-for="(genre, index) in resultData.genreList" :key="genre.id">
                <span :href="'#' + genre.id">{{ genre.value }}</span>
                <span v-if="index < resultData.genreList.length - 1">, </span>
              </span>
            </li>

            <li v-if="resultData.rankUpDown">
              <div>Rank Up Down: {{ resultData.rankUpDown }}</div>
            </li>

            <li v-if="resultData.crew">
              <div>Crew: {{ resultData.crew }}</div>
            </li>

            <li v-if="resultData.imDbRating">
              <div>IMDB Rating: {{ resultData.imDbRating }}</div>
            </li>

            <li v-if="resultData.imDbRatingCount">
              <div>IMDB Rating Count: {{ resultData.imDbRatingCount }}</div>
            </li>

          </ul>
        </div>
      </div>
    `,
  };
  