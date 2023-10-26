import apiSlice from '../api/apiSlice';

const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => '/tasks',
		}),

		getTask: builder.query({
			query: (id) => ({
				url: `/tasks/${id}`,
			}),
		}),

		addTask: builder.mutation({
			query: (data) => ({
				url: '/tasks',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					// pessimistic tasks cache update

					dispatch(
						apiSlice.util.updateQueryData(
							'getTasks',
							undefined,
							(draft) => {
								draft.push(data);
							}
						)
					);
				} catch (error) {
					//
				}
			},
		}),

		editTask: builder.mutation({
			query: ({ id, data }) => ({
				url: `/tasks/${id}`,
				method: 'PATCH',
				body: data,
			}),

			async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
				try {
					const { data: result } = await queryFulfilled;

					// pessimistic tasks cache update
					dispatch(
						apiSlice.util.updateQueryData(
							'getTasks',
							undefined,
							(draft) => {
								const editedTaskId = draft.findIndex(
									(task) => Number(task.id) === result.id
								);

								draft[editedTaskId] = result;
							}
						)
					);

					// pessimistic single tasks cache update
					dispatch(
						apiSlice.util.updateQueryData(
							'getTask',
							id.toString(),
							(draft) => {
								Object.assign(draft, result);
							}
						)
					);
				} catch (error) {
					// do nothing for now
				}
			},
		}),

		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/tasks/${id}`,
				method: 'DELETE',
			}),

			onQueryStarted(id, { queryFulfilled, dispatch }) {
				const deleteTask = dispatch(
					apiSlice.util.updateQueryData(
						'getTasks',
						undefined,
						(draft) => {
							const restTasks = draft.filter(
								(task) => parseInt(task.id) !== id
							);

							return restTasks;
						}
					)
				);

				queryFulfilled.catch(deleteTask.undo);
			},
		}),
	}),
});

export default tasksApi;
export const {
	useGetTasksQuery,
	useGetTaskQuery,
	useAddTaskMutation,
	useEditTaskMutation,
	useDeleteTaskMutation,
} = tasksApi;
