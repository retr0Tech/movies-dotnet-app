import { get, post } from "./base-service";


const discoverPath = 'discover';
const moviePath = 'movie';

export const getMovies = async(movieFilter: any) => {
	const _get = get<any>();
    return await _get(
        `${discoverPath}/${moviePath}`
    );
};
export const getMovie = async(movieId: string) => {
	const _get = get<any>();
    return async(movieId: any) => {
        return await _get(`${moviePath}/${movieId}`);
    }
}