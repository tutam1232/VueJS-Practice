export default {
    emits: ['imageClicked'],
    props: ['resultData','title','idTag'],
    data() {
      return {
        numSlide: 5,
        numObject: 15,

        isHovering: false,
        HoverText:'',
        HoverLeft:0,
      };
    },
    beforeMount(){
        //this.resultData.sort((a, b) => a.rank - b.rank);
        this.numSlide=Math.ceil(this.resultData.length /3);
        this.numObject=this.resultData.length;
    },
    methods:{
        handleHover(item){
            this.isHovering = true;

            const hoverElement = document.getElementById(item.id);
            if (hoverElement) {
                const parentElement = hoverElement.closest('.carousel-inner');
                if (parentElement) {
                    const parentLeft = parentElement.getBoundingClientRect().left;
                    this.HoverLeft = hoverElement.getBoundingClientRect().left - parentLeft;
                }
            }
                 
            this.HoverText=item.fullTitle;
            
        },
        handleMouseLeave() {
            this.isHovering = false;
        },
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
                    <img v-for="item in resultData.slice(index * 3, (index + 1) * 3)" @mouseover="handleHover(item)" @mouseout="handleMouseLeave" @click="$emit('imageClicked', item.id)" :key="item.rank" :src="item.image" :id="item.id" class="rounded z-3 Image_Slide" :alt="item.title" style="aspect-ratio: 4 / 2; width: 32%; margin: 2px 2px 0px 2px;">
                    
                </div>
                    <h5 class="Hover_Title bg-dark text-white-50 text-center" v-if="isHovering" style="width: 32%; padding: 20px; position:relative;" :style="{ left: HoverLeft +'px'}">{{HoverText}}</h5>
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
    <br>
    `,
  };
  


