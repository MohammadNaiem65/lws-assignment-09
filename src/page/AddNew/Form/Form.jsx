import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddTaskMutation } from '../../../features/tasks/tasksApi';

export default function Form({ members, projects }) {
	// local states
	const [taskDetails, setTaskDetails] = useState({
		taskName: '',
		teamMember: {},
		deadline: '',
		project: {},
		status: 'pending',
	});

	// hooks
	const [addTask, { isSuccess }] = useAddTaskMutation();
	const navigate = useNavigate();

	const handleAddTask = (e) => {
		e.preventDefault();

		addTask(taskDetails);
	};

	useEffect(() => {
		if (isSuccess) {
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
