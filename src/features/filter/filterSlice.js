import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	keyword: '',
	projects: [
		'Scoreboard',
		'Flight Booking',
		'Product Cart',
		'Book Store',
		'Blog Application',
		'Job Finder',
	],
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		filterByKeyword: (state, action) => {
			state.keyword = action.payload;
		},
		filterByProject: (state, action) => {
			if (action.payload.type === 'add') {
				state.projects.push(action.payload.project);
			} else {
				state.projects = state.projects.filter(
					(project) => project !== action.payload.project
				);
			}
		},
	},
});

export default filterSlice.reducer;
export const { filterByKeyword, filterByProject } = filterSlice.actions;
