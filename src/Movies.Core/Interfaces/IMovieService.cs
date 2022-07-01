using System;
namespace Movies.Core
{
	public interface IMovieService
	{
        Task<MoviesResponse> GetMovies(int page, MovieSortOptions sortOption);

        Task<Movie> GetMovie(int movieId);

        Task<MoviesResponse> GetFavoriteMovies(int page);

        Task<bool> MarkAsFavorite(MarkAsFavoriteBody body);

    }
}

