import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';

export default function Nav() {
	return (
		<nav className='container relative py-3'>
			<div className='flex items-center justify-between'>
				<Link >
					<img src={logoSvg} />
				</Link>

				<div className='flex-1 max-w-xs search-field group'>
					<i className='fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500'></i>
					<input
						type='text'
						placeholder='Search Job'
						className='search-input'
						id='lws-searchJob'
					/>
				</div>
			</div>
		</nav>
	);
}
