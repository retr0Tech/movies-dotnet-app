using System;
namespace Movies.Core
{
	public class MarkAsFavoriteResponse
	{
            public bool Success { get; set; }
            public int Status_code { get; set; }
            public string? Status_message { get; set; }
    }
}

