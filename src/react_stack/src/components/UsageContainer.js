import React, {Component} 	from 'react';
import {Grid, Row, Col} 	from 'react-flexbox-grid';
import UsageStat 			from './UsageStat.js';
import TextField 			from 'material-ui/TextField';
import RaisedButton 		from 'material-ui/RaisedButton';



const HINTTEXT = "Create a new Category";

export default class UsageContainer extends Component {
	constructor(props){
		super(props)
	}



	render(){
		return(

			<Grid fluid>
						<Row>
							<Col sm={12} >
									{
										Object.keys(this.props.datastore.usage).map( (item, idx) => {
											return <UsageStat key={idx} usage_name={item === 'active'? "Active Phrases" : "Inactive Phrases"} positive={item === 'active'} usage_number={this.props.datastore.usage[item]} />
										})		
									}
									<UsageStat usage_name={"Number of Categories"} positive={true} usage_number={Object.keys(this.props.datastore.categories).length} />
							
							</Col>
						</Row>
			</Grid>
		)
	}
}