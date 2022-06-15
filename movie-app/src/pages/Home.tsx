
import { TabView, TabPanel } from 'primereact/tabview';import { useState, useEffect } from 'react';
import { MovieGrid } from '../components/Movies/MovieGrid';
import { getMovies } from '../services/movie-service';

export const Home = () => {
	const [movies, setMovies] = useState([]);
    useEffect(() => {
		(async () =>{
			let movieData: [];
			try {
				const movies =  await getMovies({});
				movieData = movies.data;
			} catch (error) {
				console.error(error);
				movieData = []
			}
			setMovies(movieData);
		})();
    }, []);
    
    return ( 
		<div className = "Home">
			<TabView className="tabview-header-icon">
				<TabPanel header="Grid" leftIcon="pi pi-list">
					<MovieGrid movies={ movies }></MovieGrid>
				</TabPanel>
				<TabPanel header="Favorites" leftIcon="pi pi-star">
					
				</TabPanel>
			</TabView>
		</div>
    );
}

export default Home;