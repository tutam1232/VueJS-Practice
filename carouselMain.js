export default {

    data() {
      return {
      };
    },
   
    template: `
    <div id="carouselMain" class="carousel slide">
        
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg" class="d-block w-25 mx-auto rounded" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
            </div>
            
          </div>
          <div class="carousel-item">
            <img src="" class="d-block w-25" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src="" class="d-block w-25" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
    `,
  };
  


