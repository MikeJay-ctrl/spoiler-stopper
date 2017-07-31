import React, {Component} 	from 'react';
import {Grid, Row, Col} 	from 'react-flexbox-grid';
import TextField 			from 'material-ui/TextField';
import RaisedButton 		from 'material-ui/RaisedButton';



const HINTTEXT = "Create a new Category";

export default class AddCategoryContainer extends Component {

	constructor(props){
		super(props);
		this.updateTextField = this.updateTextField.bind(this)
		this.createCategory  = this.createCategory.bind(this)
		this.state = {
			text : ""
		}
	}

	updateTextField(text){
		this.setState({
			text: text
		})
	}

	createCategory(){
		if(this.state.text != ""){
			this.props.createCategory(this.state.text)
			this.setState({
				text: ""
			})
		}
	}


	render(){

		return(
					<Grid fluid>
						<Row>
							<Col sm={10}>
								<TextField id={"add_cat_TextField"} value={this.state.text} floatingLabelText={HINTTEXT} fullWidth={true} onChange={(e, val) => {this.updateTextField(val)}}/>
							</Col>
							<Col sm={2}>
								<RaisedButton label={"Create"}  style={{marginTop: 25}} secondary={true} onTouchTap={(e)=>{this.createCategory()}} />
							</Col>
						</Row>
					</Grid>
			)
	}
}