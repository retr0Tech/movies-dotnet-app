import { MovieSortOptions } from "../enums/movie-sort-options";
import { MarkAsFavoriteBody, MarkAsFavoriteResponse } from "../models/movies/favorite-marker-body";
import { GenreResponse } from "../models/movies/genre-response";
import { Movie } from "../models/movies/movie";
import { MovieDetail } from "../models/movies/movie-detail";
import { MovieResponse } from "../models/movies/movie-response";
import { MoviesFilter } from "../models/movies/movies-filter";
import { MoviesResponse } from "../models/movies/movies-response";
import { get, post } from "./base-service";


const discoverPath = 'discover';
const moviePath = 'movie';
const accountPath = 'account';
const favoritePath = 'favorite';

export const getMovies = () => {
	// debugger;

    const _get = get<MoviesResponse>();
    return async (moviesFilter: MoviesFilter) => {
        const withGenres: string = moviesFilter.with_genres.map(x => x.id).join(',');
        return await _get(
            `${discoverPath}/${moviePath}?page=${moviesFilter.page}&sort_by=${moviesFilter.sort_by}&vote_average.lte=${moviesFilter.vote_average}&with_genres=${withGenres}`
        );
    }
}

export const getMovie = () => {
    const _get = get<MovieDetail>();
    return async (movieId: number) => {
        return await _get(`${moviePath}/${movieId}`);
    }
}

export const getFavoriteMovies = () => {
    const _getFavoriteMoviesByPage = getFavoriteMoviesByPage();
    return async (accountId: number, sessionId: string) => {
        const favoriteMoviesFirstPage: MoviesResponse = (await _getFavoriteMoviesByPage(accountId, sessionId, 1)).data;
        const favoriteMovies: MovieResponse[] = [];
        favoriteMovies.push(...favoriteMoviesFirstPage.results);
        [...Array.from(Array(favoriteMoviesFirstPage.total_pages).keys())]
            .forEach(async (page: number) => {
                if (page > 1) {
                    favoriteMovies.push(
                        ...(await _getFavoriteMoviesByPage(accountId, sessionId, page)).data.results
                    );
                }
            });
        return favoriteMovies;
    }
}

export const getFavoriteMoviesByPage = () => {
    const _get = get<MoviesResponse>();
    return async (accountId: number, sessionId: string, page: number) => {
        return await _get(
            `${accountPath}/${accountId}/${favoritePath}/movies?session_id=${sessionId}&page=${page}`
        );
    }
}

export const useMarkAsFavorite = () => {
    const _post = post<MarkAsFavoriteResponse, MarkAsFavoriteBody>();
    return async (
        accountId: number,
        sessionId: string,
        markAsFavoriteBody: MarkAsFavoriteBody
    ) => {
        return await _post(
            `${accountPath}/${accountId}/${favoritePath}?session_id=${sessionId}`,
            markAsFavoriteBody
        );
    }
}
export const getMoviesByPage = (movies: Movie[], page: number): Movie[] => {
    const moviesClone = [...movies];
    const fromRecord: number = ((20 * page) - 20);
    const toRecord: number = (20 * page);
    return moviesClone.slice(fromRecord, toRecord);
}
export const applyMoviesFilters = (movies: Movie[], moviesFilter: MoviesFilter): Movie[] => {
    let moviesClone = [...movies];
    moviesClone = sortMovies(moviesClone, moviesFilter.sort_by);
    moviesClone = filterMoviesByRatingLessThan(moviesClone, moviesFilter.vote_average);
    moviesClone = filterMoviesByGenresContained(moviesClone, moviesFilter.with_genres);
    return moviesClone;
}
export const sortByPopularityDescending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => b.popularity - a.popularity);
}

export const sortByPopularityAscending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => a.popularity - b.popularity);
}

export const sortByVoteAverageDescending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => b.vote_average - a.vote_average);
}

export const sortByVoteAverageAscending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => a.vote_average - b.vote_average);
}

export const sortByOriginalTitleDescending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => {
        const nameA = a.original_title.toUpperCase();
        const nameB = b.original_title.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

export const sortByOriginalTitleAscending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => {
        const nameA = a.original_title.toUpperCase();
        const nameB = b.original_title.toUpperCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
}

export const sortByReleaseDateDescending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => Number(b.release_date.replace(/-/g, '')) - Number(a.release_date.replace(/-/g, '')));
}

export const sortByReleaseDateAscending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => Number(a.release_date.replace(/-/g, '')) - Number(b.release_date.replace(/-/g, '')));
}
export const sortMovies = (movies: Movie[], sortBy: MovieSortOptions): Movie[] => {
    const moviesClone = [...movies];
    switch (sortBy) {
        case MovieSortOptions.VoteAverageDesc:
            return sortByVoteAverageDescending(moviesClone);
        case MovieSortOptions.VoteAverageAsc:
            return sortByVoteAverageAscending(moviesClone);
        case MovieSortOptions.OriginalTitleDesc:
            return sortByOriginalTitleDescending(moviesClone);
        case MovieSortOptions.OriginalTitleAsc:
            return sortByOriginalTitleAscending(moviesClone);
        case MovieSortOptions.ReleaseDateDesc:
            return sortByReleaseDateDescending(moviesClone);
        case MovieSortOptions.ReleaseDateAsc:
            return sortByReleaseDateAscending(moviesClone);
        default:
            return moviesClone;
    }
}

export const filterMoviesByGenresContained = (movies: Movie[], genres: GenreResponse[]): Movie[] => {
    if (genres && genres.length > 0) {
        return movies.filter((movie: Movie) => genres.every(x => movie.genre_ids.includes(x.id)));
    } else {
        return movies;
    }
}

export const filterMoviesByRatingLessThan = (movies: Movie[], voteAverage: number): Movie[] => {
    return movies.filter((movie: Movie) => movie.vote_average <= voteAverage);
}