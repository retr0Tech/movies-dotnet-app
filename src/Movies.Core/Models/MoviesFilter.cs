using System;
namespace Movies.Core
{
	public class MoviesFilter
	{
        public string? id { get; set; }
        public int page { get; set; }
        public MovieSortOptions sort_by { get; set; }
	}
}

