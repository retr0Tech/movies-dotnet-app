using System;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Movies.Core
{
	public class RestServiceHelper
	{
        private readonly string baseApiUrl;
        private readonly string moviesApiKey;
        private readonly string sessionId;
        private readonly string accountId;
        private readonly string discoverPath = "discover";
        private readonly string moviePath = "movie";
        private readonly string accountPath = "account";
        private readonly string favoritePath = "favorite";
        


        public RestServiceHelper(IConfiguration configuration)
		{
            sessionId = configuration.GetValue<string>("ApiSessionId");
            accountId = configuration.GetValue<string>("ApiAccountId");
            baseApiUrl = configuration.GetValue<string>("BaseApiUrl");
            moviesApiKey = configuration.GetValue<string>("MoviesApiKey");
        }

        private HttpClient CreateClient()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseApiUrl);
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {moviesApiKey}");
            return client;
        }
        public async Task<MoviesResponse> GetMovies(int page, MovieSortOptions sortOption)
        {
            using (var client = CreateClient())
            {
                var result = await client.GetAsync($"{discoverPath}/{moviePath}?page={page}&sort_by={sortOption}");
                if (!result.IsSuccessStatusCode)
                {
                    return null;

                }
                var json = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<MoviesResponse>(json);
                return response;
            }
        }
        public async Task<Movie> GetMovie(int movieId)
        {
            using (var client = CreateClient())
            {
                var result = await client.GetAsync($"{moviePath}/{movieId}");
                if (!result.IsSuccessStatusCode)
                {
                    return null;

                }
                var json = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<Movie>(json);
                return response;
            }
        }
        public async Task<MoviesResponse> getFavoriteMovies(int page)
        {
            using (var client = CreateClient())
            {
                var result = await client.GetAsync($"{accountPath}/{accountId}/{favoritePath}/movies?session_id={sessionId}&page={page}");
                if (!result.IsSuccessStatusCode)
                {
                    return new MoviesResponse();

                }
                var json = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<MoviesResponse>(json);
                return response;
            }
        }

        public async Task<bool> markAsFavorite(MarkAsFavoriteBody body)
        {
            using (var client = CreateClient())
            {
                var mediaType = body.media_type.ToLower() == "string" ? "movie" : body.media_type;
                StringContent jsonString = new StringContent($"{{ \"media_id\": \"{body.media_id}\", \"favorite\": \"{body.favorite}\", \"media_type\": \"{mediaType}\" }}", Encoding.UTF8, "application/json");
                var result = await client.PostAsync($"{accountPath}/{accountId}/{favoritePath}?session_id={sessionId}", jsonString);
                if (!result.IsSuccessStatusCode)
                {
                    return false;
                }
                var json = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<MarkAsFavoriteResponse>(json);

                return response.Success;
            }
        }
    }
}

