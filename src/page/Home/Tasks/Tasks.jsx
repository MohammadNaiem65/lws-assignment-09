import { useGetTasksQuery } from '../../../features/tasks/tasksApi';
import Loading from '../../../ui/Loading';
import Error from '../../../ui/Error';
import NoContent from '../../../ui/NoContent';
import Task from '../Task/Task';
import { useSelector } from 'react-redux';

export default function Tasks() {
	// hooks
	const {
		data: tasks,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTasksQuery();
	const { keyword, projects } = useSelector((state) => state.filter);

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

	return <section className='lws-task-list'>{content}</section>;
}
