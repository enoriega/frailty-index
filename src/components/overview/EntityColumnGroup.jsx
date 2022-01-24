import { useState } from "react";

export default function EntityColumnGroup({groupName, items}){
	const [isExpanded, setExpanded] = useState(true);
	let header = `${groupName} - (${items.length})`;

	if(isExpanded){
		header += " ^";
		var contents = <ul>{items}</ul>;
	}
	else{
		header += " v";
		var contents = <></>;
	}

	return (
		<li key={groupName}>
			<h3 
				className="overview_column_group"
				onClick={() => setExpanded(!isExpanded)}>{header}</h3>
			{contents}
		</li>
	);
}