//import { computed } from 'vue'
import vcheader from './header.js'
import dbProvider from './dbProvider.js';
import vcnavbar from './navbar.js'
import vccarousel from './carousel.js'
import vccarouselMain from './carouselMain.js'
import vcfooter from './footer.js'
import vcmovie from './movieDetail.js'
import vcloading from './loading.js'
import vcactor from './actorDetail.js'
import vcsearch from './searchFilm.js'

export default {
    data() {
      return {
        showElement: true,
        showMovie:false,
        showActor:false,
        showLoading:false,
        showSearch:false,
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
        detailActor:null,

        defaultPerpage:100000,
        defaultPage:1,
        searchMovie:[],

      };
    },

    components: {
      vcheader,vcnavbar,vccarousel,vccarouselMain,vcfooter,vcmovie,vcloading,vcactor,vcsearch
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

                $('.card').addClass('border border-secondary border-2')

                $('.ReviewCard').addClass('bg-dark text-white')
                $('.ReviewCard').removeClass('bg-white text-black')

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

                $('.card').removeClass('border border-secondary border-2')

                $('.ReviewCard').removeClass('bg-dark text-white')
                $('.ReviewCard').addClass('bg-white text-black')
            }

        },
    },
    async beforeMount(){
        let urlPopular = 'get/mostpopular/?per_page=15&page=1';
        this.resultMostPopular = await dbProvider.fetch(urlPopular);

        let urlTopRating = 'get/top50/?per_page=15&page=1';
        this.resultTopRating = await dbProvider.fetch(urlTopRating);

        let urlTopBoxOffice='get/topboxoffice/?per_page=5&page=1';
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
      async loadDetailActor(actorID){
        try {
          let urlDetailActor=`detail/name/${actorID}`;
          this.detailActor= await dbProvider.fetch(urlDetailActor);
          //console.log(this.detailActor)
          this.handleShowActor();
        } catch (error) {

          console.log(error)

        }
      },
      handleShowActor(){
        this.showSearch=false;
        this.showElement=false;
        this.showMovie=false;
        this.showActor=true;
      },
      handleShowMovie(){
        this.showSearch=false;
        this.showElement=false;
        this.showActor=false;
        this.showMovie=true;
      },
      handleShowSearch(){
        this.showSearch=true;
        this.showElement=false;
        this.showActor=false;
        this.showMovie=false;
      },
      handleShowHome(){  
        this.showSearch=false;      
        this.showMovie=false;
        this.showActor=false;
        this.showElement=false;
        this.showLoading = true;
        setTimeout(() => {
          this.showLoading = false; 
          this.showElement = true;           
        }, 1000);
      },
      MergeObjectArray(arr1, arr2) {
      
        for (const obj1 of arr1) {
          if (!this.searchMovie.some(obj => obj.id == obj1.id && obj.name == obj1.name)) {
            this.searchMovie.push(obj1);
            //console.log(obj1.id)
          }
        }
      
        for (const obj2 of arr2) {
          if (!this.searchMovie.some(obj => obj.id == obj2.id && obj.name == obj2.name)) {
            //console.log(obj2.id)
            this.searchMovie.push(obj2);
          }
        }

      },
      
      async handleSearchClick(searchString){
        this.$nextTick(() => {

          const cards = document.querySelectorAll('.card');
          for (const card of cards) {
            card.remove();
          }});

        this.searchMovie=[];

        if(searchString == "") {
          this.handleShowHome();
          return;
        }

        let urlByMovie=`search/movie/${searchString}?per_page=${this.defaultPerpage}&page=${this.defaultPage}`;
        let searchMovie_Movie=await dbProvider.fetch(urlByMovie);
        searchMovie_Movie=searchMovie_Movie.items;

        let urlByActor=`search/name/${searchString}?per_page=${this.defaultPerpage}&page=${this.defaultPage}`;
        let searchMovie_Actor=await dbProvider.fetch(urlByActor);        
        searchMovie_Actor=searchMovie_Actor.items;

        this.MergeObjectArray(searchMovie_Movie,searchMovie_Actor)

        this.handleShowSearch();

        //console.log(this.searchMovie)
      },
    },

    template: `
    <vcheader v-model:darkModeActive="darkModeActive" />
    <vcnavbar @homeClicked="handleShowHome" @searchClicked="handleSearchClick"/>

    <vcloading v-if="showLoading==true"/>

    <vccarouselMain v-if="resultTopBoxOffice !== null && showElement==true" :resultData="resultTopBoxOffice.items" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultMostPopular !== null && showElement==true" :resultData="resultMostPopular.items" :title="titlePopular" :idTag="idPopular" @imageClicked="loadDetailMovie"/>
    <vccarousel v-if="resultTopRating !== null && showElement==true" :resultData="resultTopRating.items" :title="titleTopRating" :idTag="idTopRating" @imageClicked="loadDetailMovie"/>
    
    <vcactor v-if="detailActor !== null && showActor==true" :resultData="detailActor"  @imageClicked="loadDetailMovie"/>
    <vcmovie v-if="detailMovie !== null && showMovie==true" :resultData="detailMovie" :resultReview="detailMovie_Review !== null ? detailMovie_Review.items : null" @actorClicked="loadDetailActor"/>

    <vcsearch v-if="showSearch==true" :resultData="searchMovie" @imageClicked="loadDetailMovie"/>

    <vcfooter/>
    
    

    `,
    
  };
  

