export default {
    props: ['resultMostPopular'],
    data() {
      return {
        numMostPopular: 5,
        objectsMostPopular: 15,
      };
    },
    beforeMount(){
        this.resultMostPopular.sort((a, b) => a.rank - b.rank);
        if(this.resultMostPopular.length < 15){
            this.numMostPopular=Math.ceil(this.resultMostPopular.length /3);
            this.objectsMostPopular=this.resultMostPopular.length;
        }

        console.log(this.resultMostPopular)
    },
   
    template: `
    <div id="carouselPopular" class="carousel slide">
        <div class="d-flex">
            <h5 class="slideHeader text-black">Most Popular</h5>
            <div class="carousel-indicators" style="position: absolute; top: 0; left: 80%; margin: 0;">
                <button v-for="(item, index) in (0, numMostPopular)" :key="index" :data-bs-target="'#carouselPopular'" 
                :data-bs-slide-to="index" :class="{ active: index === 0 }" aria-label="Slide {{ index + 1 }}">
                </button>
            </div>
        </div>
        
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(item, index) in (0, numMostPopular)" :key="index" :class="{ active: index === 0 }">
                <div class="d-flex text-center justify-content-center align-items-center">
                    <img v-for="item in resultMostPopular.slice(index * 3, (index + 1) * 3)" :key="item.rank" :src="item.image" class="rounded" :alt="item.title" style="aspect-ratio: 4 / 2; width: 32%; margin: 2px;">
                </div>
            </div>
            
        </div>

        
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselPopular" data-bs-slide="prev" style="left: -7%;top:10%;">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselPopular" data-bs-slide="next" style="right: -7%;top:10%;">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `,
  };
  


