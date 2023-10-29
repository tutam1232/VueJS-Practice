//import { computed } from 'vue'
import vcheader from './header.js'
import dbProvider from './dbProvider.js';
import vcnavbar from './navbar.js'
import vccarousel from './carousel.js'
import vccarouselMain from './carouselMain.js'
import vcfooter from './footer.js'
import vcmovie from './movieDetail.js'

export default {
    data() {
      return {
        darkModeActive: false,
        resultMostPopular: null,
        resultTopRating: null,
        resultTopBoxOffice: null,

        titlePopular: "Most Popular",
        idPopular:"carouselPopular",

        titleTopRating: "Top Rating",
        idTopRating:"carouselTopRating",

        detailMovie: null,
      };
    },

    components: {
      vcheader,vcnavbar,vccarousel,vccarouselMain,vcfooter,vcmovie
    },
    
    watch: {
        darkModeActive(newVal) {

            if(newVal==true){ //Dark mode enabled
                $('.header').addClass('bg-dark text-white border border-secondary border-2')
                $('.header').removeClass('bg-white text-black') 

                $('body').addClass('bg-black')
                $('body').removeClass('bg-dark-subtle')

                $('.navbar').addClass('bg-dark border border-secondary border-2')
                $('.navbar-brand').addClass('text-white')
                $('.navbar').removeClass('bg-white')
                $('.navbar-brand').removeClass('text-black')

                $('.footer').addClass('bg-dark text-white border border-secondary border-2')
                $('.footer').removeClass('bg-white text-black')

                $('.slideHeader').addClass('text-white')
            }

            else{ //Dark mode disabled
                $('.header').removeClass('bg-dark text-white border border-secondary border-2')
                $('.header').addClass('bg-white text-black')

                
                
                $('body').removeClass('bg-black')
                $('body').addClass('bg-dark-subtle')

                $('.navbar').removeClass('bg-dark border border-secondary border-2')
                $('.navbar-brand').removeClass('text-white')
                $('.navbar').addClass('bg-white')
                $('.navbar-brand').addClass('text-black')

                $('.footer').removeClass('bg-dark text-white border border-secondary border-2')
                $('.footer').addClass('bg-white text-black')

                $('.slideHeader').removeClass('text-white')
            }

        },
    },
    async beforeMount(){
        let urlPopular = 'get/mostpopular/?per_page=15&page=1';
        this.resultMostPopular = await dbProvider.fetch(urlPopular);

        let urlTopRating = 'get/top50/?per_page=15&page=1';
        this.resultTopRating = await dbProvider.fetch(urlTopRating);

        let urlTopBoxOffice='get/topboxoffice/?per_page=5';
        this.resultTopBoxOffice=await dbProvider.fetch(urlTopBoxOffice);
    },
    methods: {
      async loadDetailMovie(movieId) {
        //console.log(movieId)
        let urlDetailMovie=`detail/movie/${movieId}`;
        this.detailMovie= await dbProvider.fetch(urlDetailMovie);

        //console.log(this.detailMovie)
      },
    },

    template: `
    <vcheader v-model:darkModeActive="darkModeActive" />
    <vcnavbar />
    <vccarouselMain v-if="resultTopBoxOffice !== null" :resultData="resultTopBoxOffice" @imageClicked="loadDetailMovie"/>
    <br>
    <vccarousel v-if="resultMostPopular !== null" :resultData="resultMostPopular.mostpopular" :title="titlePopular" :idTag="idPopular" @imageClicked="loadDetailMovie"/>
    <br>
    <vccarousel v-if="resultTopRating !== null" :resultData="resultTopRating.top50" :title="titleTopRating" :idTag="idTopRating" @imageClicked="loadDetailMovie"/>
    <br>
    <br>
    <vcfooter/>
    <vcmovie v-if="detailMovie !== null" :resultData="detailMovie" />

    `,
    
  };
  

