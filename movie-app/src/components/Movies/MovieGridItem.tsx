import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";

export const MovieGridItem = ({movieTest}: any) => {
	return (movie: any) => {
		console.log(movie);
		if (movie) {
		return (<div className="col-12 md:col-4">
			<div className="product-grid-item card">
				<div className="product-grid-item-top">
					<div>
						<i className="pi pi-ticket"></i>
						{/* <span className="product-category">{data.category}</span> */}
					</div>
				</div>
				<div className="product-grid-item-content">
					<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
					<Link to={{ pathname: `/movie/${movie.id}` }} className="no-style">
									<h3
										className="p-card-title"
										style={{ cursor: 'pointer', outline: 'none' }}
									>
										{ movie.original_title }
									</h3>
					</Link>
					<div className="product-description">{movie.overview}</div>
					<Rating value={movie.vote_average} readOnly cancel={false}></Rating>
				</div>
				<div className="product-grid-item-bottom">
					<span className="product-price">${movie.release_date}</span>
				</div>
			</div>
		</div>)
		}
		return <></>
	};
}
export default MovieGridItem;