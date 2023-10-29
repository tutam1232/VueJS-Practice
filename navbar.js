export default {

    data() {
      return {
      };
    },
   methods:{
    setSearchString(){
        let searchData=$('.searchInput').val();
        this.$emit('searchClicked',searchData)
    },
   },
    template: `
    <nav class="navbar navbar-expand-lg bg-white text-black rounded">
        <div class="container-fluid">
        <a class="navbar-brand" href="#" @click="$emit('homeClicked')">Home</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2 searchInput" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit" @click="setSearchString">Search</button>
            </form>
        </div>
        </div>
    </nav>
    `,
  };
  


