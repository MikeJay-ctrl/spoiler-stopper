import React, {Component} from 'react';
import Paper 				from 'material-ui/Paper';
import Category 			from './Category.js';
import {Grid, Row, Col} 	from 'react-flexbox-grid';
import UsageContainer		from './UsageContainer.js';
import AddCategoryContainer	from './AddCategoryContainer.js';
import FlatButton 			from 'material-ui/FlatButton';

let style={
	padding: 5,
	margin: 5
}

chrome.runtime.sendMessage({"designation": "dataForUI"}, undefined, function(response){
	console.log("returned 1 well")
	console.log("data", response.response)
	messageReceived(response.response)
});	

function resolveCatName(str){
	return str.toLowerCase().replace(/\s/g,'');
}

function updateLocalStorage(dataStore){
	console.log("updating", dataStore)
 	chrome.storage.local.set({"datastore": dataStore}, ()=>{
 		if(1){
 			console.log("done");
 		}
 		this.setState({
 			changesMade: false
 		})
 	})	
 }

function messageReceived(datastore){
	//console.log("IN HERE", datastore)
	this.setState({datastore: datastore})
}

export default class HomeContainer extends Component{
	constructor(props){
		super(props);
		this.createCategory = this.createCategory.bind(this);
		this.addPhraseToCat = this.addPhraseToCat.bind(this);
		this.deletePhrase 	= this.deletePhrase.bind(this);
		this.changeStatus 	= this.changeStatus.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);

		updateLocalStorage = updateLocalStorage.bind(this)
		messageReceived = messageReceived.bind(this)
		this.state = {
			datastore : {},
			changesMade: false
		}
	}

	deleteCategory(categoryName){
		let newKey 			= resolveCatName(categoryName);
		let active = 0;
		let inactive = 0;

		this.state.datastore.categories[newKey].keyPhrases.map(phrase => {
		if(phrase.isActive){
			active +=1
        }else{
			inactive +=1
        }})

		let new_obj = Object.assign({}, this.state.datastore);		delete new_obj.categories[newKey];
		new_obj.usage.inactive -= inactive;
		new_obj.usage.active -= active;

		this.setState({
			datastore : new_obj,
			changesMade: true
		})
	}

	createCategory(newCatName){
		let newKey = resolveCatName(newCatName); 
		let testNames = Object.keys(this.state.datastore.categories).map(key =>{
			return resolveCatName(key)
		});

		if(testNames.indexOf(newKey) > -1 ){
			Alert("category with name: "+ newCatName + " already exists!");
		} else{
			let new_obj = Object.assign({}, this.state.datastore);
			new_obj.categories = Object.assign(new_obj.categories, {[newKey] : {name: newCatName, keyPhrases : []}} );
			this.setState({
				datastore : new_obj,
				changesMade: true
			});
		}
	}

	addPhraseToCat(categoryName, newPhrase){
		let newKey 			= resolveCatName(categoryName); 
		let new_obj 		= Object.assign({}, this.state.datastore)
		let new_phrase_obj 	= {
								id 			: new_obj.categories[newKey].keyPhrases.length+1,
								isActive	: true,
								phrase 		: newPhrase 
							}

		new_obj.categories[newKey].keyPhrases.push(new_phrase_obj);
		new_obj.usage.active += 1;

		this.setState({
			datastore: new_obj,
			changesMade: true
		})
	}


	deletePhrase(categoryName, id){
		let newKey 			= resolveCatName(categoryName); 
		let new_obj 		= Object.assign({}, this.state.datastore);

		let new_phrase_list = new_obj.categories[newKey].keyPhrases.filter(obj =>{
			return id != obj.id;
		});
		new_obj.categories[newKey].keyPhrases = new_phrase_list;
		new_obj.usage.active = new_obj.usage.active >0? new_obj.usage.active -1 : 0;
		this.setState({
			datastore: new_obj,
			changesMade: true
		});


	}

	changeStatus(categoryName, id){
		let newKey 			= resolveCatName(categoryName); 
		let new_obj 		= Object.assign({}, this.state.datastore);
		let new_phrase_list = new_obj.categories[newKey].keyPhrases.map(obj =>{
			if(id !== obj.id){
				return obj;
			} else {
				if(obj.isActive){
					new_obj.usage.active = new_obj.usage.active >0? new_obj.usage.active -1 : 0;
					new_obj.usage.inactive 	+= 1;
				} else {
					new_obj.usage.active 	+= 1;
					new_obj.usage.inactive = new_obj.usage.inactive >0? new_obj.usage.inactive -1 : 0;
				}
				return  {id: obj.id, isActive: !obj.isActive, phrase: obj.phrase}
			}
		});

		new_obj.categories[newKey].keyPhrases = new_phrase_list;

		this.setState({
			datastore: new_obj,
			changesMade: true
		})
	}



	render(){
		console.log("state", this.state)
		return(
			
				Object.keys(this.state.datastore).length > 0 ?
					<Grid fluid >
						{
							
							this.state.changesMade? 
							<Row>	
								<Col sm={10}>
								</Col>
								<Col sm={2}>
									 <FlatButton label="Save Changes" primary={true}  onTouchTap={(e)=>{updateLocalStorage(this.state.datastore)}}/>
								</Col>
							</Row>
							:  <div></div>
							
						}
						<Row >
							<Col sm={3}>
								<UsageContainer datastore={this.state.datastore} />
							</Col>
							<Col sm={9}>
								<AddCategoryContainer createCategory={this.createCategory} />
								{
									Object.values(this.state.datastore.categories).map((category, idx) =>{
										return <Category deleteCategory={this.deleteCategory} changeStatus={this.changeStatus} deletePhrase={this.deletePhrase} addPhraseToCat={this.addPhraseToCat} key={idx} category={category} />
									})
								}
							</Col>
						</Row>
					</Grid>		
				:
					<div>{"All is well"}</div>
			
		);
	}
}




