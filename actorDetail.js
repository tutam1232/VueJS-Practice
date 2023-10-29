export default {
    props: ['resultData'],
    data() {
      return {};
    },
    template: `
    
    <div v-if="resultData" >      
        <br>
        <h2 class="text-center">{{ resultData.name }}</h2>
        <div class="d-flex">
            <img :src="resultData.image" :alt="resultData.id" class="w-50 rounded" style="margin-right: 10px;">
            <ul class="lead">
                <li>Role: {{ resultData.role }}</li>
                <li>Summary: {{ resultData.summary }}</li>
                <li>Birth date: {{ resultData.birthDate }}</li>
                <li>Death date: {{ resultData.deathDate }}</li>
                <li>Awards: {{ resultData.awards }}</li>
                <li>Height: {{ resultData.height }}</li>
            </ul>          

        </div>
    </div>
        
    `,
  };
  