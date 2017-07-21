import React from "react";
import App from "./container/App.js";
import { Router, Route } from 'dva/router';
import Carpicshowbox from './container/Carpicshowbox.js';
import CarSearchBox from './container/CarSearchBox.js';
import Indexshow from './container/Indexshow.js';
import { hashHistory } from 'react-router';


function routerConfig({ history }){
	return (
	    <Router history={hashHistory}>
			  <Route path="/" component={App} />
                                        <Route path="/search" component={App} />
                                        <Route path="/search/:brand" component={App} />
			  <Route path="/picshow/:model" component={Carpicshowbox} />
	    </Router>
	);
}

export default routerConfig;