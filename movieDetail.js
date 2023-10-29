export default {
    props: ['resultData'],
    data() {
      return {
      };
    },
   
    template: `
    <div :id="resultData.id" class="d-flex">
        
        <img :src="resultData.image" alt="resultData.title" class="w-50">
        <div class="float-start" style="margin: 20px;">
            <h1 class="text-center">{{resultData.title}}</h1>
            <br>

            <ul class="lead">
                <li>
                    <div>Publish year: {{resultData.year}}</div>
                </li>

                <li>
                    <span>Directors: </span>
                    <span v-for="(director, index) in resultData.directorList" :key="director.id">
                        <a :href="'#' + director.id">{{ director.name }}</a>
                        <span v-if="index < resultData.directorList.length - 1">, </span>
                    </span>
                    
                </li>
                
                <li>
                    <div>Description: {{resultData.plot}}</div>
                </li>
                
                <li>
                    <span>Actors: </span>
                    <span v-for="(actor, index) in resultData.actorList" :key="actor.id">
                        <a :href="'#' + actor.id">{{ actor.name }}</a>
                        <span v-if="index < resultData.actorList.length - 1">, </span>
                    </span>
                    
                </li>

                <li>
                    <span>Genres: </span>
                    <span v-for="(genre, index) in resultData.genreList" :key="genre.id">
                        <span :href="'#' + genre.id">{{ genre.value }}</span>
                        <span v-if="index < resultData.genreList.length - 1">, </span>
                    </span>
                </li>
            </ul> 
            


        </div>
    </div>
    `,
  };
  


