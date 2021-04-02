import React from 'react';
import spinner from './spinner.gif';

export default () => {
	return (
		<div style={{position: "absolute", top: "40%", left: "50%"}}>
			<img
				src={spinner}
				style={{ width: '70px', margin: 'auto', display: 'block' }}
				alt="Loading..."
			/>
		</div>
	);
};
