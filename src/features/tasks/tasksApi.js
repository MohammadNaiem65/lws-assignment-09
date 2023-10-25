import apiSlice from '../api/apiSlice';

const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => '/tasks',
		}),
	}),
});

export default tasksApi;
export const { useGetTasksQuery } = tasksApi;
