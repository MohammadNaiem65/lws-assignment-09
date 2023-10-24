import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav/Nav';
import './App.css';

function App() {
	return (
		<div>
			<Nav />
			<Outlet />
		</div>
	);
}

export default App;
