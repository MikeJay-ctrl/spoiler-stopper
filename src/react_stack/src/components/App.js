import React, {Component} 	from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import Theme 				from '../Theme.js';
import Paper 				from 'material-ui/Paper';
import Category 			from './Category.js';
import {Grid, Row, Col} 	from 'react-flexbox-grid';
import UsageStat 			from './UsageStat.js';
import HomeContainer 		from './HomeContainer.js';




export default class App extends Component {
	constructor(props){
		super(props);
	}


	render(){
		return(
			<MuiThemeProvider muiTheme={Theme}>
				<HomeContainer/>
			</MuiThemeProvider>
			);
	}
}
