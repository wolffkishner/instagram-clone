export const initialState = {
	posts: [],
	user: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_POSTS':
			return {
				...state,
				posts: action.posts,
			};
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
