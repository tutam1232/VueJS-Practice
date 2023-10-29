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
        showElement: true,
        showMovie:false,
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

                $('.MovieDetail').addClass('text-white')
                $('.MovieDetail').removeClass('text-black')

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

                $('.MovieDetail').removeClass('text-white')
                $('.MovieDetail').addClass('text-black')
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

        this.handleShowMovie();

      },
      handleShowMovie(){
        this.showElement=false;
        this.showMovie=true;
      },
      handleShowHome(){
        this.showElement=true;
        this.showMovie=false;
      },
    },

    template: `
    <vcheader v-model:darkModeActive="darkModeActive" />
    <vcnavbar @homeClicked="handleShowHome"/>

    <vccarouselMain v-if="resultTopBoxOffice !== null && showElement==true" :resultData="resultTopBoxOffice" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultMostPopular !== null && showElement==true" :resultData="resultMostPopular.mostpopular" :title="titlePopular" :idTag="idPopular" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultTopRating !== null && showElement==true" :resultData="resultTopRating.top50" :title="titleTopRating" :idTag="idTopRating" @imageClicked="loadDetailMovie"/>
    
    <vcmovie v-if="detailMovie !== null && showMovie==true" :resultData="detailMovie" />

    <vcfooter/>
    
    

    `,
    
  };
  

