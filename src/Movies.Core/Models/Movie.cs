using System;
namespace Movies.Core
{
	public class Movie
	{
        public string? Id{ get; set; }
        public int Popularity{ get; set; }
        public int Vote_count{ get; set; }
        public bool Video{ get; set; }
        public string? Poster_path{ get; set; }
        public bool Adult{ get; set; }
        public string? Backdrop_path{ get; set; }
        public string? Original_language{ get; set; }
        public string? Original_title{ get; set; }
        public List<int>? Genre_ids { get; set; }
        public string? Title{ get; set; }
        public int Vote_average{ get; set; }
        public string? Overview{ get; set; }
        public string? Release_date{ get; set; }
        public bool IsFavorite{ get; set; }
	}
}

