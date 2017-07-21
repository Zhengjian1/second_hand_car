import React from "react";
import {connect} from "dva";
import { Router, Route } from 'dva/router';
import Indexshow from './Indexshow.js';
import CarSearchBox from './CarSearchBox.js';
import Nav from './Nav.js';

class App extends React.Component{
	constructor(props){
		super(props);

 	}
 
	render(){
		return (
		 	<div>
		 		<Nav></Nav>
				<Router>
					<div>
                                                                            <Route path="/" component={Indexshow} />
                                                                            <Route path="/search" component={CarSearchBox} />
                                                                            <Route path="/search/:brand" component={CarSearchBox} />   
					</div>
				</Router>
		 	</div>
		);
	}
}

export default App;