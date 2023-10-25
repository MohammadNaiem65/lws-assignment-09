import apiSlice from '../api/apiSlice';

const teamMembersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMembers: builder.query({
			query: () => '/team',
		}),
	}),
});

export default teamMembersApi;
export const { useGetMembersQuery } = teamMembersApi;
