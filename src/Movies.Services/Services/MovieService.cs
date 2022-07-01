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

        public Task<MoviesResponse> GetFavoriteMovies(int page, MovieSortOptions sortOption)
        {
            return _restServiceHelper.getFavoriteMovies(page, sortOption);
        }

        public Task<Movie> GetMovie(int movieId)
        {
            return _restServiceHelper.GetMovie(movieId);
        }

        public Task<MoviesResponse> GetMovies(int page, MovieSortOptions sortOption)
        {
            return _restServiceHelper.GetMovies(page, sortOption);
        }

        public Task<bool> MarkAsFavorite(MarkAsFavoriteBody body)
        {
            return _restServiceHelper.markAsFavorite(body);
        }
    }
}

