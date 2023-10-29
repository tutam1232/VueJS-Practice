export default {
    props: ['numPageSearch','defaultPage'],
    data() {
      return {
      };
    },
   methods:{
   },
    template: `    
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <template v-for="n in numPageSearch">
                <li @click="$emit('changePage', n)" :class="{ 'active' : n==defaultPage}" class="page-item">
                    
                    <a v-if="n!=defaultPage" class="page-link" href="#">{{n}}</a>
                    <span v-if="n==defaultPage" class="page-link">{{n}}</span>
                </li>
            </template>                        
        </ul>
    </nav>

    `,
  };
  


