import { computed } from 'vue'
import vcheader from './header.js'
import dbProvider from './dbProvider.js';
import vcnavbar from './navbar.js'
import vccarousel from './carousel.js'
import vccarouselMain from './carouselMain.js'
import vcfooter from './footer.js'

export default {
    data() {
      return {
        darkModeActive: false,
        resultMostPopular: null,
        resultTopRating: null,

        titlePopular: "Most Popular",
        idPopular:"carouselPopular",

        titleTopRating: "Top Rating",
        idTopRating:"carouselTopRating",
      };
    },

    components: {
      vcheader,vcnavbar,vccarousel,vccarouselMain,vcfooter
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
        let url = 'get/mostpopular/';
        this.resultMostPopular = await dbProvider.fetch(url);

        let topRatingUrl = 'get/top50/';
        this.resultTopRating = await dbProvider.fetch(topRatingUrl);
    },

    template: `
    <vcheader v-model:darkModeActive="darkModeActive" />
    <vcnavbar />
    <vccarouselMain/>
    <br>
    <vccarousel v-if="resultMostPopular !== null" :resultData="resultMostPopular" :title="titlePopular" :idTag="idPopular"/>
    <br>
    <vccarousel v-if="resultTopRating !== null" :resultData="resultTopRating" :title="titleTopRating" :idTag="idTopRating"/>
    <br>
    <br>
    <vcfooter/>
    `,
    
  };
  

