import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const MovieGridItem = () => {
	
	return (movie: any) => {
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
					<Rating value={(movie.vote_average as number)/2} readOnly cancel={false}></Rating>
					<p>{movie.vote_average}/10</p>
				</div>
				<div className="product-grid-item-bottom">
					<span className="product-price">{movie.release_date}</span>
				</div>
			</div>
		</div>)
		}
		return <></>
	};
}
export default MovieGridItem;