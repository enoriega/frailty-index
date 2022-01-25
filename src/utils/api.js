export function getOverviewData(apiUrl, id, callback) {
	fetch(apiUrl + '/overview/' + id)
		.then(response => response.json())
		.then(json => {
			callback(json);
		});
}

export function getInteraction(apiUrl, src, dst, bidirectional) {
	return fetch(apiUrl + '/interaction/' + src + '/' + dst + '/' + bidirectional)
		.then(response => response.json())
}

export function fetchEvidence(apiUrl, src, dst, bidirectional) {
	return fetch(apiUrl + '/evidence/' + src + '/' + dst + '/' + bidirectional)
		.then(response => response.json())
}

export function fetchNeighbots(apiUrl, id) {
	return fetch(apiUrl + '/neighbors/' + id)
		.then(response => response.json())
}