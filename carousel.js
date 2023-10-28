export default {
    props: ['resultData','title','idTag'],
    data() {
      return {
        numSlide: 5,
        numObject: 15,
      };
    },
    beforeMount(){
        //this.resultData.sort((a, b) => a.rank - b.rank);
        this.numSlide=Math.ceil(this.resultData.length /3);
        this.numObject=this.resultData.length;
    },
   
    template: `
    <div :id="idTag" class="carousel slide">
        <div class="d-flex">
            <h5 class="slideHeader text-black">{{title}}</h5>
            <div class="carousel-indicators" style="position: absolute; top: 0; left: 80%; margin: 0;">
                <button v-for="(item, index) in (0, numSlide)" :key="index" :data-bs-target="'#' + idTag" 
                :data-bs-slide-to="index" :class="{ active: index === 0 }" aria-label="Slide {{ index + 1 }}">
                </button>
            </div>
        </div>
        
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(item, index) in (0, numSlide)" :key="index" :class="{ active: index === 0 }">
                <div class="d-flex text-center justify-content-center align-items-center">
                    <img v-for="item in resultData.slice(index * 3, (index + 1) * 3)" :key="item.rank" :src="item.image" :id="item.id" class="rounded" :alt="item.title" style="aspect-ratio: 4 / 2; width: 32%; margin: 2px;">
                </div>
            </div>
            
        </div>

        
        <button class="carousel-control-prev" type="button" :data-bs-target="'#' + idTag" data-bs-slide="prev" style="left: -7%;top:10%;">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#' + idTag" data-bs-slide="next" style="right: -7%;top:10%;">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `,
  };
  


