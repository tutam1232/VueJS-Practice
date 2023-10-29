// dbProvider.js
import data from './db/data.js';

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

        if (className === 'name') {
          const search = pattern;
            const page = params.get('page');
            
            const result = data.Movies.filter((movie) => movie.actorList.some((actor) =>
                            actor.name.toLowerCase().includes(pattern.toLowerCase())));
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
        //console.log(movieId)
        let  movie = data.Movies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;

        movie = data.Top50Movies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;

        movie = data.MostPopularMovies.find((m) => m.id === movieId);
        if(movie != undefined)
          return movie;
        throw new Error(`Không tìm thấy phim id ${movieId}`);
      }

      if (className === 'name') {
        const actorID = pattern;
        let  actor = data.Names.find((m) => m.id === actorID);
        if(actor != undefined)
          return actor;
        else
          throw new Error(`Không tìm thấy diễn viên id ${actorID}`);
      }
    } 
    else if (type === 'get') {

      if (className === 'top50') {
        const per_page = params.get('per_page');
        const page = params.get('page');
        const items = data.Top50Movies.slice((page-1)*per_page, (page-1)*per_page+per_page);
        return {type,className,page,per_page,items}
      }

      if (className === 'mostpopular') {
        const per_page = params.get('per_page');
        const page = params.get('page');
        const items = data.MostPopularMovies.slice((page-1)*per_page, (page-1)*per_page+per_page);
        return {type,className,page,per_page,items};
      }

      if(className==='topboxoffice'){
        const per_page = params.get('per_page');
        const page = params.get('page');
        const topboxoffice=data.Movies;
        for (let item of topboxoffice) {
          item.boxOffice.grossUSA=Number(item.boxOffice.grossUSA.replace(/(^\$|,)/g,''));
          item.boxOffice.cumulativeWorldwideGross=Number(item.boxOffice.cumulativeWorldwideGross.replace(/(^\$|,)/g,''));
        }

        topboxoffice.sort((a, b) => b.boxOffice.cumulativeWorldwideGross - a.boxOffice.cumulativeWorldwideGross);

        let result = topboxoffice.slice((page-1)*per_page, (page-1)*per_page+per_page);
        return {type,className,page,per_page,result};
        
      }
      if (className === 'reviews') {
        const movieId = pattern;
        let result=data.Reviews.find((m) => m.movieId === movieId);
        //console.log(result)
        if(result==null)
          throw new Error('Không tìm thấy reviews cho phim này');

        let items=result.items;
        let length=items.length;

        return {
          movieId,
          length,
          items,
          
        };
      }

    }
    throw new Error('URL không hợp lệ');
  },
};



