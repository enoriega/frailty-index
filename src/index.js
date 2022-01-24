import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom"
import App from './App';
import EvidenceIndex from './EvidenceIndex';
import Overview from './Overview';
import ScrollToTop from './components/ScrollToTop';

import 'bootstrap/dist/css/bootstrap.min.css';



function NetworkViz(){
	return <h1>NetworkViz</h1>
}
  
// ========================================
const rootElement = document.getElementById('root');

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="overview" element={
					<>
						<Overview 
							apiUrl="http://localhost:1600"
							entityId="uniprot:P05231"
							entityName="IL-6" />
						
						<ScrollToTop />
					</>}
				/>
				<Route path="viz" element={<NetworkViz />} />
				<Route path="evidence-index" element={
					<>
						<EvidenceIndex apiUrl="http://localhost:1600" defaultResults={ 100 } />
						<ScrollToTop />
					</>
				} />
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
						<p>There's nothing here!</p>
						</main>
					}
				/>
			</Route>
		</Routes>
	</BrowserRouter>,
	rootElement
);
  