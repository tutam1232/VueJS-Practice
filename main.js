//import { computed } from 'vue'
import vcheader from './header.js'
import dbProvider from './dbProvider.js';
import vcnavbar from './navbar.js'
import vccarousel from './carousel.js'
import vccarouselMain from './carouselMain.js'
import vcfooter from './footer.js'
import vcmovie from './movieDetail.js'
import vcloading from './loading.js'

export default {
    data() {
      return {
        showElement: true,
        showMovie:false,
        showLoading:false,
        darkModeActive: false,

        resultMostPopular: null,
        resultTopRating: null,
        resultTopBoxOffice: null,

        titlePopular: "Most Popular",
        idPopular:"carouselPopular",

        titleTopRating: "Top Rating",
        idTopRating:"carouselTopRating",

        detailMovie: null,
        detailMovie_Review:null,
      };
    },

    components: {
      vcheader,vcnavbar,vccarousel,vccarouselMain,vcfooter,vcmovie,vcloading
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


        try {
          let urlDetailMovie=`detail/movie/${movieId}`;
          this.detailMovie= await dbProvider.fetch(urlDetailMovie);
          
          let urlDetailMovie_Review=`get/reviews/${movieId}`
          this.detailMovie_Review=await dbProvider.fetch(urlDetailMovie_Review);
        } catch (error) {

          this.detailMovie_Review=null;
          console.log(error)

        }

        //console.log(this.detailMovie_Review)//

        this.handleShowMovie();

      },
      handleShowMovie(){
        this.showElement=false;
        this.showMovie=true;
      },
      handleShowHome(){        
        this.showMovie=false;
        this.showLoading = true;
        setTimeout(() => {
          this.showLoading = false; 
          this.showElement = true;           
        }, 1000);
      },
    },

    template: `
    <vcheader v-model:darkModeActive="darkModeActive" />
    <vcnavbar @homeClicked="handleShowHome"/>

    <vcloading v-if="showLoading==true"/>

    <vccarouselMain v-if="resultTopBoxOffice !== null && showElement==true" :resultData="resultTopBoxOffice" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultMostPopular !== null && showElement==true" :resultData="resultMostPopular.items" :title="titlePopular" :idTag="idPopular" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultTopRating !== null && showElement==true" :resultData="resultTopRating.items" :title="titleTopRating" :idTag="idTopRating" @imageClicked="loadDetailMovie"/>
    
    <vcmovie v-if="detailMovie !== null && showMovie==true" :resultData="detailMovie" :resultReview="detailMovie_Review !== null ? detailMovie_Review.items : null"/>

    <vcfooter/>
    
    

    `,
    
  };
  

