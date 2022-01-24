import { useState, useEffect } from 'react';
import EntityColumn from './components/overview/EntityColumn';
import { getOverviewData } from "./utils/api"
import customWeight from './utils/custom_weight';
import { getEntityCategory, groupBy } from './utils/utils';
import { Container, Row, Col, Form } from 'react-bootstrap'

function filterItems(items, shouldContain){
	if(shouldContain){
		return items.filter(
			item => 
				item.name.toLowerCase().includes(shouldContain) || item.id.toLowerCase().includes(shouldContain)
		);
	}
	else
		return items;
}

// Ad hoc function to transform data from arrays to objects
function array2obj(data){
	return data.map(
		item => {
			return	{ 
				id: item[0],
				name: item[1],
				freq: item[2],
				meta: item[3]
			};
		}
	)
}

// Sorting functions
function sortByEntityName(a, b){
	return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
}

function sortByEntityId(a, b){
	return (a.id > b.id) ? 1 : -1;
}

function sortByFrequency(a, b){
	return -(a.freq - b.freq);
}

function sortByCustomWeight(a, b){
	return -(customWeight(a.meta) - customWeight(b.meta));
}
////////////////////////////////////////////////////////////////////////////////

// Group the elements by their entity type
const categories = {
	"uniprot": "Proteins or Gene Products",
	"mesh": "Diseases",
	"go": "Biological Process",
	"fplx": "Proteins or Gene Products",
	"pubchem": "Chemicals",
	"interpro": "Proteins or Gene Products",
	"proonto": "Proteins or Gene Products",
	"chebi": "Chemicals",
	"pfam": "Proteins or Gene Products",
	"frailty": "Biological Process"
}

function groupByEntityType(items){
	return groupBy(items, item => categories[getEntityCategory(item.id)]);
}
//////////////////////////////////////////

export default function Overview({apiUrl, entityId, entityName}){

	let [reciprocals, setReciprocals] = useState([]);
	let [influenced, setInfluenced] = useState([]);
	let [influencers, setInfluencers] = useState([]);

	const [orderCriterion, setOrderCritertion] = useState(1);
	const [shouldContain, setShouldContain] = useState('');

	// Filter the data by the shouldContain variable either by name or id
	influenced = filterItems(influenced, shouldContain);
	influencers = filterItems(influencers, shouldContain);
	reciprocals = filterItems(reciprocals, shouldContain);

	

	useEffect(() => {
		// Fetch the Overview data from the API
		getOverviewData(apiUrl, entityId,
			(data) => {
				setReciprocals(array2obj(data.reciprocals));
				setInfluenced(array2obj(data.influenced));
				setInfluencers(array2obj(data.influencers));
			}
		)
	}, []); // Second argument necessary to make sure the effect is only called once


	

	let sorter;
	switch(orderCriterion){
		case 1:
			sorter = sortByFrequency;
			break;
		case 2:
			sorter = sortByCustomWeight;
			break;
		case 3:
			sorter = sortByEntityName;
			break;
		case 4:
			sorter = sortByEntityId;
			break;
		default:
			throw `Invalid order criterion: ${orderCriterion}`;
	}
	

	return (
		<>
			<h1>Overview of {entityName}</h1>
			<br />
			<Form>
				<Row className='mb-3'>
					<Col xs={2}>
					<Form.Group controlId='formSortBy'>
						<Form.Label>Sort by:</Form.Label>
						<Form.Select 
							aria-label="Order elements by"
							onChange={
								evt => {
									const chosen = evt.target.value;
									setOrderCritertion(parseInt(chosen));
								}
							}>
							<option value="1">Frequency</option>
							<option value="2">Custom Weight</option>
							<option value="3">Name</option>
							<option value="4">Database ID</option>
						</Form.Select>
					</Form.Group>
					</Col>
					<Col>
					<Form.Group controlId='formFilterName'>
						<Form.Label>Filter by:</Form.Label>
						<Form.Control 
							type="text"
						 	placeholder="Type name or database id"
							onChange={
								evt => {
									const contains = evt.target.value.toLowerCase();
									setShouldContain(contains);
								}
							}
						 />
					</Form.Group>
					</Col>
				</Row>
			</Form>
			<br />
			<Container fluid>
				<Row>
					<Col>
					<EntityColumn title="Infenceced By:" 
						data={influencers}
						sorter={sorter}
						grouper={groupByEntityType}
						/>
					</Col>
					<Col>
						<EntityColumn title="Reciprocal With:" 
							data={reciprocals}
							sorter={sorter}
							grouper={groupByEntityType}
							/>
					</Col>
					<Col>
						<EntityColumn title="Influence:" 
							data={influenced}
							sorter={sorter}
							grouper={groupByEntityType}
							/>
					</Col>
				 </Row>
			</Container>
		</>
	)
}