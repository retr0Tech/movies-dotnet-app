using System;
namespace Movies.Core
{
	public interface IMovieService
	{
        Task<MoviesResponse> GetMovies(MoviesFilter filters);

        Task<Movie> GetMovie(int movieId);

        Task<MoviesResponse> GetFavoriteMovies(MoviesFilter filters);

        Task<bool> MarkAsFavorite(MarkAsFavoriteBody body);

    }
}

