import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../../../features/projects/projectsApi';
import Error from '../../../ui/Error';
import Loading from '../../../ui/Loading';
import NoContent from '../../../ui/NoContent';
import { filterByProject } from '../../../features/filter/filterSlice';
import { selectFilter } from '../../../features/filter/filterSelectors';

export default function Projects() {
	// hooks
	const {
		data: projects,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetProjectsQuery();
	const { projects: filteredProjects } = useSelector(selectFilter);
	const dispatch = useDispatch();

	// handle filter by projects
	const handleFilterStatus = (e) => {
		if (!filteredProjects.includes(e.target.name)) {
			dispatch(filterByProject({ type: 'add', project: e.target.name }));
		} else {
			dispatch(
				filterByProject({ type: 'remove', project: e.target.name })
			);
		}
	};

	// decide what to render
	let content;

	if (isLoading) {
		content = <Loading />;
	} else if (!isLoading && isError) {
		content = <Error message={error} />;
	} else if (!isLoading && isSuccess && projects.length === 0) {
		content = <NoContent />;
	} else if (!isLoading && isSuccess && projects.length > 0) {
		content = (
			<div className='mt-3 space-y-4'>
				{projects.map((project) => (
					<div key={project.id} className='checkbox-container'>
						<input
							type='checkbox'
							className={project.colorClass}
							name={project.projectName}
							checked={filteredProjects.includes(
								project.projectName
							)}
							onChange={handleFilterStatus}
						/>
						<p className='label'>{project.projectName}</p>
					</div>
				))}
			</div>
		);
	}

	console.log('projects rendered');

	return (
		<section>
			<h3 className='text-xl font-bold'>Projects</h3>
			{content}
		</section>
	);
}
