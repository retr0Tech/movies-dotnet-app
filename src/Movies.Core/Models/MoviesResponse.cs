using System;
namespace Movies.Core
{
	public class MoviesResponse
	{
        public int page { get; set; }
        public int total_results { get; set; }
        public int total_pages { get; set; }
        public List<Movie>? results { get; set; }
	}
}

