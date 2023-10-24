import apiSlice from '../api/apiSlice';

const projectsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: () => ({
				url: '/projects',
			}),
		}),
	}),
});

export default projectsApi;
export const { useGetProjectsQuery } = projectsApi;
