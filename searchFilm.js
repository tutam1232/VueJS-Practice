export default {
    props: ['resultData'],
    data() {
      return {
      };
    },
   methods:{
   },
    template: `    
    <div class="Card_Grid">
        <div v-for="item in resultData" :key="item.id" :id="item.id" class="card" style="width: 100%;" @click="$emit('imageClicked', item.id)">
            <img :src="item.image" class="card-img-top" :alt="item.title">
            <div class="card-body">
                <h5 class="card-text text-center">{{ item.title }}</h5>
                <div class="card-text text-center text-black-50">({{ item.year }})</div>
                <div class="card-text text-center text-black-50">Length: {{ item.runtimeStr }} - IMDB Rating: {{item.ratings.imDb}}</div>
             </div>
        </div>
  </div>

    `,
  };
  


