import { CircularProgress } from '@material-ui/core';
import React from 'react';

const Loading = () => {
	const loadingContainerStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 'calc(100vh - 52px)',
	};

	const loadingIconStyle = {
		width: 64,
		height: 64,
	};
	return (
		<div className='loading' style={loadingContainerStyle}>
			<CircularProgress style={loadingIconStyle} className='my-auto mx-auto' />
		</div>
	);
};

export default Loading;
