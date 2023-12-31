import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './App.jsx';
import Home from './page/Home/Home.jsx';
import AddNew from './page/AddNew/AddNew.jsx';
import './index.css';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/addNew',
				element: <AddNew />,
			},
			{
				path: '/editTask/:id',
				element: <AddNew />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={routes} />
	</Provider>
	// </React.StrictMode>
);
