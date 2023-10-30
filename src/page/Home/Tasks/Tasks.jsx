import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../../features/tasks/tasksApi';
import { Error, Loading, NoContent } from '../../../ui';
import Task from '../Task/Task';
import { selectFilter } from '../../../features/filter/filterSelectors';

export default function Tasks() {
	// hooks
	const {
		data: tasks,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTasksQuery();
	const { keyword, projects } = useSelector(selectFilter);

	// filter tasks by projects
	const filterTasksByProjects = (keywordFilteredTasks) => {
		let filteredTasksCollection = [];

		projects.forEach((pr) => {
			keywordFilteredTasks?.forEach((t) => {
				if (t.project.projectName === pr) {
					filteredTasksCollection.push(t);
				}
			});
		});

		return filteredTasksCollection;
	};

	// overall filtered tasks
	const filteredTasks = filterTasksByProjects(
		tasks?.filter((task) =>
			task.taskName.toLowerCase().includes(keyword.toLowerCase())
		)
	);

	// decide what to render
	let content;

	if (isLoading) {
		content = <Loading />;
	} else if (!isLoading && isError) {
		content = <Error message={error} />;
	} else if (!isLoading && isSuccess && tasks.length === 0) {
		content = <NoContent />;
	} else if (!isLoading && isSuccess && tasks.length > 0) {
		content = (
			<>
				{filteredTasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</>
		);
	}

	console.log('Tasks component rendered');

	return <section className='lws-task-list'>{content}</section>;
}
