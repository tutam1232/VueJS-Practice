export default {
    props: ['darkModeActive'],

    data() {
      return {
        darkModeActiveLocal: this.darkModeActive, 
      };
    },
    watch: {
      darkModeActiveLocal(newVal) {
        this.$emit('update:darkModeActive', newVal); 
      },
    },
    template: `
      <div class="header alert bg-white text-black" role="alert">
        <span class="MSSV">21120551</span>
        <h3 class="text-center">Movies info</h3>
        <span class="KeyAPI"></span>
        <div class="form-check form-switch DarkmodeButton">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="darkModeActiveLocal">
          <label class="form-check-label" for="flexSwitchCheckDefault">Dark mode</label>
        </div>
      </div>
    `,
  };
  