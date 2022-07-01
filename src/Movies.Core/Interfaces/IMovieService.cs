using System;
namespace Movies.Core
{
	public interface IMovieService
	{
        Task<MoviesResponse> getMovies(MoviesFilter filters);

        Task<Movie> getMovie(int movieId);

        Task<MoviesResponse> getFavoriteMovies(MoviesFilter filters);

        Task<bool> markAsFavorite(MarkAsFavoriteBody body);

    }
}

