export default {
    props: ['resultData'],
  
    data() {
      return {
        numSlide: this.resultData.length
      };
    },
   
    template: `
    <div id="carouselMain" class="carousel slide">
        
        <div class="carousel-indicators">
          <button v-for="(item, index) in (0, numSlide)" :key="index" data-bs-target="#carouselMain" 
          :data-bs-slide-to="index" :class="{ active: index === 0 }" aria-label="Slide {{ index + 1 }}">
          </button>
        </div>

        <div class="carousel-inner">
        <div class="carousel-item" v-for="(item, index) in resultData.slice(0, numSlide)" :key="index" :class="{ active: index === 0 }">
          <img :key="item.boxOffice.cumulativeWorldwideGross" :src="item.image" :id="item.id" :alt="item.title" class="d-block w-25 mx-auto rounded" @click="$emit('imageClicked', item.id)">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{item.fullTitle}}</h5>
            <p style="margin: 0px;">Length: {{item.runtimeStr}}</p>
            <span>IMDB rating: {{item.ratings.imDb}}</span>

          </div>  
        </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
    `,
};
  


