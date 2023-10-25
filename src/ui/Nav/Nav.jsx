import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logoSvg from '../../assets/logo.svg';
import { filterByKeyword } from '../../features/filter/filterSlice';

export default function Nav() {
	// hooks
	const dispatch = useDispatch();
	// local states
	const [keyword, setKeyword] = useState('');

	const handleSetKeyword = () => {
		let taskId;
		return (e) => {
			// if there is a timeout running, cancel it
			if (taskId) {
				clearTimeout(taskId);
			}

			taskId = setTimeout(() => {
				setKeyword(e.target.value);
			}, 600);
		};
	};

	useEffect(() => {
		dispatch(filterByKeyword(keyword));
	}, [dispatch, keyword]);

	return (
		<nav className='container relative py-3'>
			<div className='flex items-center justify-between'>
				<Link>
					<img src={logoSvg} />
				</Link>

				<div className='flex-1 max-w-xs search-field group'>
					<i className='fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500'></i>
					<input
						type='text'
						placeholder='Search Job'
						className='search-input text-gray-700 font-semibold'
						id='lws-searchJob'
						onChange={handleSetKeyword()}
					/>
				</div>
			</div>
		</nav>
	);
}
