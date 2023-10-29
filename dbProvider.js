// dbProvider.js
import data from './data.js';

export default {
  async fetch(url) {
    
    const [type, className, ...rest] = url.split('/');
    const [pattern, paramString] = rest.join('/').split('?');
    const params = new URLSearchParams(paramString);

    if (type === 'search') {
      
        if (className === 'movie') {
            const search = pattern;
            const page = params.get('page');
            
            const result = data.Movies.filter((movie) =>
            movie.title.toLowerCase().includes(pattern.toLowerCase()));
            return {
                search,
                page,
                per_page: params.get('per_page'),
                total_page: Math.ceil(result.length / params.get('per_page')),
                total: result.length,
                items: result.slice((page - 1) * params.get('per_page'), page * params.get('per_page')),
            };
        }
    } 
    else if (type === 'detail') {
      if (className === 'movie') {
        const movieId = pattern;

        let  movie = data.Movies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;

        movie = data.Top50Movies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;

        movie = data.MostPopularMovies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;
      }
    } 
    else if (type === 'get') {

      if (className === 'top50') {
        const per_page = params.get('per_page');
        const page = params.get('page');
        const top50 = data.Top50Movies.slice((page-1)*per_page, (page-1)*per_page+per_page);
        return {type,className,page,per_page,top50}
      }

      if (className === 'mostpopular') {
        const per_page = params.get('per_page');
        const page = params.get('page');
        const mostpopular = data.MostPopularMovies.slice((page-1)*per_page, (page-1)*per_page+per_page);
        return {type,className,page,per_page,mostpopular};
      }

      if(className==='topboxoffice'){
        const per_page = params.get('per_page');
        const topboxoffice=data.Movies;
        for (let item of topboxoffice) {
          item.boxOffice.grossUSA=Number(item.boxOffice.grossUSA.replace(/(^\$|,)/g,''));
          item.boxOffice.cumulativeWorldwideGross=Number(item.boxOffice.cumulativeWorldwideGross.replace(/(^\$|,)/g,''));

          // if(item.boxOffice.grossUSA >= item.boxOffice.cumulativeWorldwideGross)
          //   item.boxOffice.cumulativeWorldwideGross=item.boxOffice.grossUSA;
        }

        topboxoffice.sort((a, b) => b.boxOffice.cumulativeWorldwideGross - a.boxOffice.cumulativeWorldwideGross);

        let result = topboxoffice.slice(0,per_page);
        //console.log(result)
        return result
        
      }

    }
    throw new Error('URL không hợp lệ');
  },
};



