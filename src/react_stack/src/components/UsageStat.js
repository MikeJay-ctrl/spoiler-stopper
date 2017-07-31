import React, {Component} 	from 'react';
import {Grid, Row, Col} 	from 'react-flexbox-grid';

const style = {
	marginBotom: 4,
	padding: 0
}

export default class UsageStat extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Grid fluid style={style}>
				<Row style={{width: '100%', backgroundColor: this.props.positive? '#43A047' : '#FF0000'}}>
					<Col sm={10} style={{color: '#FFFFFF'}}>
						{this.props.usage_name}
					</Col>
					<Col sm={2} style={{color: '#FFFFFF'}}>
						{this.props.usage_number}
					</Col>
				</Row>
			</Grid>
		)
	}
}