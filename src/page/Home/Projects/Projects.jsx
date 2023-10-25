import { useGetProjectsQuery } from '../../../features/projects/projectsApi';
import Error from '../../../ui/Error';
import Loading from '../../../ui/Loading';
import NoContent from '../../../ui/NoContent';

export default function Projects() {
	// hooks
	const {
		data: projects,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetProjectsQuery();

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
							checked
						/>
						<p className='label'>{project.projectName}</p>
					</div>
				))}
			</div>
		);
	}

	return (
		<section>
			<h3 className='text-xl font-bold'>Projects</h3>
			{content}
		</section>
	);
}
