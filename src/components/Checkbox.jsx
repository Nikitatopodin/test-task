import React, { useState } from 'react';

function Checkbox(props) {

	const [checked, setChecked] = useState(false);
	const checkedText = props.onText;
	const uncheckedText = props.offText;

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<div>
			<p>
				{checked ? checkedText : uncheckedText}
			</p>
		</div>
	);

};


export default Checkbox;