import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import  "./WeightPanel.css";
import RangeSlider from 'react-bootstrap-range-slider';

function SliderComponent({label, value, max, granularity, onChange}) {

	if(!max)
		max = 10;

	if(!granularity)
		granularity = .1;

	return (
		<Form>
			<Form.Group as={Row}>
				<Col>
					<Form.Label>{label}:</Form.Label>
				</Col>
				<Col xs={9}>
					<RangeSlider 
						value={value}
						min={1}
						max={max}
						step={granularity}
						tooltip='off'
						onChange={e => {
							if(onChange)
								onChange(e.target.value);
							}}
					/>
				</Col>
				<Col xs={1}>
					<Form.Control type="number" value={value} onChange={e => {
						if(onChange)
							onChange(e.target.value);
					}}/>
				</Col>
			</Form.Group>
		</Form>
	);
}


export default function WeightPanel({ sliderValues, setSliderValues }){
	const [isExpanded, setExpanded] = useState(false);

	const chevron = isExpanded ? <i className="gg-chevron-double-up" /> : <i className="gg-chevron-double-down" />;

	function sliderStateUpdate(name, value){
		let newValues = {...sliderValues};
		newValues[name] = parseFloat(value);
		setSliderValues(newValues);
	}

	let elements;
	if(isExpanded)
		elements = (<div>
			<SliderComponent label='Frequency' value={sliderValues.frequency} onChange={v => sliderStateUpdate('frequency', v)} />
			<SliderComponent label='Has significance' value={sliderValues.hasSignificance} onChange={v => sliderStateUpdate('hasSignificance', v)} />
			<SliderComponent label='Avg significance' value={sliderValues.avgSignificance} onChange={v => sliderStateUpdate('avgSignificance', v)} />
			<SliderComponent label='Avg impact factor' value={sliderValues.avgImpactFactor} onChange={v => sliderStateUpdate('avgImpactFactor', v)} />
			<SliderComponent label='Max impact factor' value={sliderValues.maxImpactFactor} onChange={v => sliderStateUpdate('maxImpactFactor', v)} />
			<SliderComponent label='1 - Avg p-value' value={sliderValues.pValue} onChange={v => sliderStateUpdate('pValue', v)} />
			
		</div>);
	else
		elements = <></>;

	return (
		<div className='weight_panel'>
			<h2
				onClick={() => {
					setExpanded(!isExpanded)
				}}>
			Weighting<span className="chevron">{chevron}</span></h2>
			{elements}
		</div>
	)
}