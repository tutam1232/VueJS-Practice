export default {
    emits:['actorClicked'],
    props: ['resultData','resultReview'],
    data() {
      return {};
    },
    template: `

        <br>
        <h1 class="text-center MovieDetail">{{ resultData.title }}</h1>
        <div :id="resultData.id" class="d-flex MovieDetail text-black">
        <img :src="resultData.image" :alt="resultData.title" class="rounded" style="width:50%;height:50%; margin-top:50px;">
        <div class="float-start" style="margin: 20px;">
          
          <br>
          <ul class="lead">
            <li>
              <div>Publish year: {{ resultData.year }}</div>
            </li>

            <li v-if="resultData.directorList">
              <span>Directors: </span>
              <span v-for="(director, index) in resultData.directorList" :key="director.id" @click="$emit('actorClicked', director.id)">
                <a :href="'#' + director.id">{{ director.name }}</a>
                <span v-if="index < resultData.directorList.length - 1">, </span>
              </span>
            </li>

            <li v-if="resultData.plot">
              <div>Description: {{ resultData.plot }}</div>
            </li>

            <li v-if="resultData.actorList" >
              <div>Actors: </div>

              <div v-for="(actor, index) in resultData.actorList" :key="actor.id" class="d-flex" @click="$emit('actorClicked', actor.id)">
                <img :src="actor.image" :alt="actor.id" style="width:50px;height:50px;">
                <div>  
                    <a :href="'#' + actor.id">{{ actor.name }}</a>
                    <div>As character: {{actor.asCharacter}}</div>
                </div>
              </div>

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

      <br>
      <h2 class="MovieDetail">Reviews</h2>

      <div v-if="resultReview" class="mt-4">
      <div v-for="(item, index) in resultReview" :key="index" class="my-3">
        <div class="card bg-white text-black ReviewCard">
          <div class="card-body">
            <div>
              <strong>Username:</strong> {{ item.username }}
            </div>

            <div>
              <strong>Title:</strong> {{ item.title }}
            </div>

            <div>
              <strong>Date:</strong> {{ item.date }}
            </div>

            <div>
              <strong>Rate:</strong> {{ item.rate }}
            </div>

            <div>
              <strong>Content:</strong>
              <span v-if="item.warningSpoilers == true" class="text-danger" data-bs-toggle="collapse" :data-bs-target="'#collapseReview' + index">
                (spoiler - click to view)
              </span>
              <span v-else>{{ item.content }}</span>
            </div>

            <div class="collapse" :id="'collapseReview' + index">
              <div class="card card-body">
                Spoiler content: {{ item.content }}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    `,
  };
  