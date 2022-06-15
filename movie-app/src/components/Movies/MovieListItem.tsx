import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";

export const MovieListItem = () => {
	return (movie: any) => {
		if(movie)
		{
			return (<div className="col-12">
			<div className="product-list-item">
				<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
				<div className="product-list-detail">
				<Link to={{ pathname: `/movie/${movie.id}` }} className="no-style">
									<h3
										className="p-card-title"
										style={{ cursor: 'pointer', outline: 'none' }}
									>
										{ movie.original_title }
									</h3>
					</Link>
					<div className="product-description">{movie.overview}</div>
					<Rating value={movie.vote_average /2} readOnly cancel={false}></Rating>
					<p>{movie.vote_average}/10</p>
					{/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
				</div>
				<div className="product-list-action">
					<span className="product-price">{movie.release_date}</span>
				</div>
			</div>
		</div>)
		}
		return <></>
	};
}
export default MovieListItem;