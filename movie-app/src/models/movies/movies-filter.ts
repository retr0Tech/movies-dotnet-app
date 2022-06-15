import { MovieSortOptions } from "../../enums/movie-sort-options";
import { GenreResponse } from "./genre-response";

export class MoviesFilter {
    constructor(
        public id: string,
        public page: number,
        public sort_by: MovieSortOptions,
    ) {}
}