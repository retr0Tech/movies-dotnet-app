using System;
namespace Movies.Core
{
	public class MarkAsFavoriteBody
	{
        public int media_id { get; set; }
        public bool favorite { get; set; }
        public string media_type { get; set; } = "movie";
	}
}

