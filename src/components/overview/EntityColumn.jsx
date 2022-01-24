import EntityColumnGroup from "./EntityColumnGroup";

export default function EntityColumn({ title, data, sorter, grouper }){
	
	// Assume sorter implements a stable sort
	if(sorter){
		data.sort(sorter);
	}

	let groupedData = {};

	if(grouper)
		groupedData = grouper(data);
	else // If no grouper is provided, all belongs to the same group
		groupedData = {"": data};

	// Sort the groups to keep a consistent order when changhing the sort criteria
	let groupNames = Object.keys(groupedData).sort();

	// Render the list either as grouped or plain depending on the grouper
	const listItems =
		groupNames.flatMap(
			group => {
				const innerItems =
					groupedData[group].map(
						item => {
							const {id, name, freq, meta} = item;
							return (
								<li key={id}>
									<a href="#">{`${name} (${id})`}</a> - {freq}
								</li>
							);
					});

				if(group){
					return <EntityColumnGroup key={group}
					groupName={group}
					items={innerItems} />
				}
				else
					return innerItems;
				
			}
		);


	return (
		<>
			<h2>{title}</h2>
			<ul>
				{listItems}
			</ul>
		</>
	)
}