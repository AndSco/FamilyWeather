import React, { useEffect } from "react";

const AddCity = props => {
	
	let lastDiv = null; 
	
	useEffect(() => lastDiv.scrollIntoView({ behavior: 'smooth' }), [lastDiv, props.hasSearched]);

	return (
		<div 
			className="forecast add-city" 
			onClick={props.openForm}
			ref={(div) => {lastDiv = div}}
		>
			<h1>+</h1>
		</div>
	)

}

export default AddCity;