import React, {Component} from 'react';
import ListItem from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteAction from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';


const style = {
  margin: 12,
};

export default class KeyPhraseItem extends Component{

	constructor(props){
		super(props)
	}



	render(){
		return(
			<Grid fluid style={{backgroundColor: this.props.keyPhrase.isActive? '#4CAF50' : '#F44336'}}>
				<Row>
					<Col sm={8}>
						<h6>{this.props.keyPhrase.phrase}</h6>
					</Col>
					<Col sm={2}>
					{
					this.props.keyPhrase.isActive?
						<RaisedButton label={"Disable"}  style={{marginTop: 8}} primary={true}  onTouchTap={(e) => {this.props.changeStatus(this.props.category, this.props.keyPhrase.id)}}/>
						:
						<RaisedButton label={"Enable"}  style={{marginTop: 8}}  secondary={true} onTouchTap={(e) => {this.props.changeStatus(this.props.category, this.props.keyPhrase.id)}}/>
					}
					</Col>
					<Col sm={2}>
						<IconButton tooltip="Remove Phrase" onTouchTap={(e) => {this.props.deletePhrase(this.props.category, this.props.keyPhrase.id)}}>
							<DeleteAction/>
						</IconButton>
					</Col>
				</Row>
			 </Grid>
		)
	}
}