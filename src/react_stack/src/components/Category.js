import React, {Component} 	from 'react';
import Subheader 			from 'material-ui/Subheader';
import Divider 				from 'material-ui/Divider';
import List 				from 'material-ui/List';
import KeyPhraseItem 		from './KeyPhraseItem.js'
import Paper 				from 'material-ui/Paper';
import TextField 			from 'material-ui/TextField';
import {Grid, Row, Col} 	from 'react-flexbox-grid';
import RaisedButton 		from 'material-ui/RaisedButton';
import IconButton 			from 'material-ui/IconButton';
import DeleteAction 		from 'material-ui/svg-icons/action/delete';



const style = {
	margin: 5,
	padding: 5
}

const HINTTEXT = "Add new phrase to "



export default class Category extends Component {

	constructor(props){
		super(props)
		this.updateTextField 	= this.updateTextField.bind(this)
		this.addKeyPhrase 		= this.addKeyPhrase.bind(this)
		this.state= {
			text : ""
		}
	}


	updateTextField(text){
		this.setState({
			text: text
		})
	}

	addKeyPhrase(){
		if(this.state.text != ""){
			this.props.addPhraseToCat(this.props.category.name, this.state.text)
			this.setState({
				text: ""
			})
		}
	}


	render(){
		return(
			<Paper zDepth={3} style={style}>
				<Grid fluid>
					<Row>				
						<Col sm={11}>
							<Subheader>{this.props.category.name}</Subheader>
						</Col>
						<Col sm={1}>
							<IconButton tooltip="Delete Category" onTouchTap={(e) => {this.props.deleteCategory(this.props.category.name)}}>
								<DeleteAction/>
							</IconButton>
						</Col>
					</Row>
					<Row style={style}>
						<Col sm={10} >
							<TextField id={this.props.category.name+"TextField"} value={this.state.text} floatingLabelText={HINTTEXT + this.props.category.name} onChange={(e, val) => {this.updateTextField(val)}}/>
							<RaisedButton label={"Add Phrase"}   style={{margin :'auto'}}secondary={true} onTouchTap={(e)=>{this.addKeyPhrase()}} />
						</Col>
					</Row>
						<Col sm={12} style={{width: '100%'}}>
					{
						this.props.category.keyPhrases.map((phrase, idx) => {
							return <KeyPhraseItem category={this.props.category.name} changeStatus={this.props.changeStatus} deletePhrase={this.props.deletePhrase} key={idx} keyPhrase={phrase}/>
						})
					}
						</Col>
				</Grid>
			</Paper>
		)
	}

}