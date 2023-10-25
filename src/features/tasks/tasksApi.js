import apiSlice from '../api/apiSlice';

const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => '/tasks',
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
	}),
});

export default tasksApi;
export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
