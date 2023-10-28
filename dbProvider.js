// dbProvider.js
import data from './data.js';

export default {
  async fetch(url) {
    
    const [type, className, ...rest] = url.split('/');
    const [pattern, paramString] = rest.join('/').split('?');
    const params = new URLSearchParams(paramString);
    
    if (type === 'search') {
      
        if (className === 'movie') {
            const search = params.get('per_page');
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
        // Thực hiện truy vấn chi tiết và trả về dữ liệu chi tiết
        const movieId = pattern;
        const movie = data.Movies.find((m) => m.id === movieId);
        return movie;
      }
    } 
    else if (type === 'get') {
      if (className === 'top50') {
        // Thực hiện lấy danh sách top 50 (trong trường hợp này, bạn có thể cung cấp danh sách top 50 từ dữ liệu)
        const top50 = data.Top50Movies;
        return top50;
      }
      if (className === 'mostpopular') {
        // Thực hiện lấy danh sách top 50 (trong trường hợp này, bạn có thể cung cấp danh sách top 50 từ dữ liệu)
        const mostpopular = data.MostPopularMovies;
        return mostpopular;
      }
    }
    // Trả về null nếu không tìm thấy kết quả hoặc URL không hợp lệ
    throw new Error('URL không hợp lệ');
  },
};



