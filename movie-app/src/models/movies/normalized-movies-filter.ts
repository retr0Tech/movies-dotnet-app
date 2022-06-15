import { GenreResponse } from "./genre-response";

export interface NormalizedMoviesFilter {
    id: string;
    page: number;
    sort_by: string;
    vote_average: number;
    with_genres: string[];
}

export interface NormalizedSchemaMoviesFilter {
    result: any;
    entities: {
        moviesFilter: NormalizedMoviesFilter,
        with_genres: GenreResponse[]
    }
}