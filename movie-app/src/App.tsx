
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import PrimeReact from 'primereact/api';                //core css

PrimeReact.ripple = true;
export const App = () => {
    return ( 
	<div className = "App" >
		<Router>
			<div className="p-mx-auto p-mt-5 tabview">
				<RouterConfig></RouterConfig>
			</div>
		</Router>
	</div>
    );
}

export default App;
