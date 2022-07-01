using System;
using Microsoft.Extensions.Configuration;
using Movies.Core;

namespace Movies.Services
{
	public class MovieService : IMovieService
    {
        protected readonly RestServiceHelper _restServiceHelper;
        public MovieService(IConfiguration configuration)
		{
            _restServiceHelper = new RestServiceHelper(configuration);
        }

        public Task<MoviesResponse> GetFavoriteMovies(MoviesFilter filters)
        {
            return _restServiceHelper.getFavoriteMovies(filters.page, filters.sort_by);
        }

        public Task<Movie> GetMovie(int movieId)
        {
            return _restServiceHelper.GetMovie(movieId);
        }

        public Task<MoviesResponse> GetMovies(MoviesFilter filters)
        {
            return _restServiceHelper.GetMovies(filters.page, filters.sort_by);
        }

        public Task<bool> MarkAsFavorite(MarkAsFavoriteBody body)
        {
            return _restServiceHelper.markAsFavorite(body);
        }
    }
}

