using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movies.Core;

namespace Movies.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _MovieService;
        public MoviesController(IMovieService movieService)
        {
            _MovieService = movieService;
        }
        [HttpGet("/getMovies")]
        public async Task<IActionResult> GetMovies(int page = 1, MovieSortOptions sortOption = MovieSortOptions.PopularityDesc)
        {
            try
            {
                var response = await _MovieService.GetMovies(page, sortOption);
                if (response == null)
                    throw new Exception();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "A communication error has occurred");
            }

        }
        [HttpGet("/getMovie")]
        public async Task<IActionResult> GetMovie(int movieId)
        {
            try
            {
                var response = await _MovieService.GetMovie(movieId);
                if (response == null)
                    throw new Exception();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "A communication error has occurred");
            }

        }
        [HttpGet("/getFavoriteMovies")]
        public async Task<IActionResult> GetFavoriteMovies(int page = 1, MovieSortOptions sortOption = MovieSortOptions.PopularityDesc)
        {
            try
            {
                var response = await _MovieService.GetFavoriteMovies(page, sortOption);
                if (response == null)
                    throw new Exception();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "A communication error has occurred");
            }

        }
        [HttpPost("/markMovieAsFavorite")]
        public async Task<IActionResult> MarkFavoriteMovie(MarkAsFavoriteBody body)
        {
            var response = await _MovieService.MarkAsFavorite(body);
            if(response)
                return Ok();
            return StatusCode(500, $"a communication error has occurred, we couldn't mark the movie with id ${body.media_id}");
        }
    }
}
