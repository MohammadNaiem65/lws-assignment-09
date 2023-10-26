import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useAddTaskMutation,
	useGetTaskQuery,
} from '../../../features/tasks/tasksApi';

export default function Form({ members, projects }) {
	// hooks
	const { id } = useParams();
	const { data: taskData } = useGetTaskQuery(id && id, {
		skip: id === undefined,
	});
	const [addTask, { isSuccess: taskAddSuccess }] = useAddTaskMutation();
	const navigate = useNavigate();

	// local states
	const [taskDetails, setTaskDetails] = useState({
		taskName: '',
		teamMember: {},
		deadline: '',
		project: {},
		status: 'pending',
	});

	const handleAddTask = (e) => {
		e.preventDefault();

		addTask(taskDetails);
	};

	useEffect(() => {
		if (taskData?.taskName) {
			setTaskDetails({
				taskName: taskData.taskName,
				teamMember: taskData.teamMember,
				deadline: taskData.deadline,
				project: taskData.project,
				status: taskData.status,
			});
		}
	}, [
		taskData?.taskName,
		taskData?.teamMember,
		taskData?.deadline,
		taskData?.project,
		taskData?.status,
	]);

	useEffect(() => {
		if (taskAddSuccess) {
			navigate('/');
		}
	});

	return (
		<form className='space-y-6' onSubmit={handleAddTask}>
			<div className='fieldContainer'>
				<label htmlFor='lws-taskName'>Task Name</label>
				<input
					type='text'
					name='taskName'
					id='lws-taskName'
					required
					placeholder='Implement RTK Query'
					value={taskDetails.taskName}
					onChange={(e) =>
						setTaskDetails({
							...taskDetails,
							taskName: e.target.value,
						})
					}
				/>
			</div>

			<div className='fieldContainer'>
				<label>Assign To</label>
				<select
					name='teamMember'
					id='lws-teamMember'
					required
					value={taskDetails.teamMember.id}
					onChange={(e) =>
						setTaskDetails({
							...taskDetails,
							teamMember: members[e.target.value - 1],
						})
					}>
					<option value='default' hidden>
						Select Member
					</option>
					{members.map((member) => (
						<option key={member.id} value={member.id}>
							{member.name}
						</option>
					))}
				</select>
			</div>

			<div className='fieldContainer'>
				<label htmlFor='lws-projectName'>Project Name</label>
				<select
					id='lws-projectName'
					name='projectName'
					required
					value={taskDetails.project.id}
					onChange={(e) =>
						setTaskDetails({
							...taskDetails,
							project: projects[e.target.value - 1],
						})
					}>
					<option value='default' hidden>
						Select Project
					</option>
					{projects.map((project) => (
						<option key={project.id} value={project.id}>
							{project.projectName}
						</option>
					))}
				</select>
			</div>

			<div className='fieldContainer'>
				<label htmlFor='lws-deadline'>Deadline</label>
				<input
					type='date'
					name='deadline'
					id='lws-deadline'
					required
					value={taskDetails.deadline}
					onChange={(e) =>
						setTaskDetails({
							...taskDetails,
							deadline: e.target.value,
						})
					}
				/>
			</div>

			<div className='text-right'>
				<button
					type='submit'
					className='lws-submit rounded py-3 bg-blue-700 text-white'>
					Save
				</button>
			</div>
		</form>
	);
}
