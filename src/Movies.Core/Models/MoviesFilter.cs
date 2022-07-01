using System;
namespace Movies.Core
{
	public class MoviesFilter
	{
		public int page { get; set; } = 1;
        public MovieSortOptions sort_by { get; set; }
	}
}

