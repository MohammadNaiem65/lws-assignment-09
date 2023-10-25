import { useGetTasksQuery } from '../../../features/tasks/tasksApi';
import Loading from '../../../ui/Loading';
import Error from '../../../ui/Error';
import NoContent from '../../../ui/NoContent';
import Task from '../Task/Task';

export default function Tasks() {
	// hooks
	const {
		data: tasks,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTasksQuery();

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
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</>
		);
	}

	return <section className='lws-task-list'>{content}</section>;
}
