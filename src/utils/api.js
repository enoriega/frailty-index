export function getOverviewData(apiUrl, id, callback) {
	fetch(apiUrl + '/overview/' + id)
		.then(response => response.json())
		.then(json => {
			callback(json);
		});
}