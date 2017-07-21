import React from "react";
import {connect} from "dva";

import "./carserchbox.less";

import {Tag,Slider,Button} from "antd";

import CountryFilter from "../components/CountryFilter.js";
import BrandFilter from "../components/BrandFilter.js";
import FilterList from "../components/FilterList.js";
import TypeFilter from "../components/TypeFilter.js";
import SeatFilter from "../components/SeatFilter.js";
import PriceFilter from "../components/PriceFilter.js";
import DateFilter from "../components/DateFilter.js";
import Databox from "../components/Databox.js";
 
class CarSearchBox extends React.Component{
	constructor(props){
		super(props);
		if(Object.keys(props.params).length == 0)  return;
		var n = props.params.brand.indexOf(",");
		this.state = {
			"price" : [(props.params.brand).slice(0,n),(props.params.brand).slice(n+1)]
		}

		if(Number(props.params.brand.slice(0,n))){
			
			this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "price" , "tagvalue" : 
				this.state.price}});
		}else{
			if(props.params.brand.slice(0,1) == "m"){

				this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "type" , "tagvalue" : props.params.brand.slice(1)}});
			}else{

				this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "brand" , "tagvalue" : props.params.brand}});
			}
		}
		
 	}
 
	render(){
		return (
			<div className="carserchbox">
				<div className="container">
					<table className="table">
						<tbody>
							<tr>
								<td>
									<FilterList></FilterList>
								</td>
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("country") && !this.props.carsearch.filter.hasOwnProperty("brand") && <td><CountryFilter></CountryFilter></td> }
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("brand") && <td><BrandFilter></BrandFilter></td> }
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("type") && <td><TypeFilter></TypeFilter></td> }
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("seat") && <td><SeatFilter></SeatFilter></td> }
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("price") && <td><PriceFilter></PriceFilter></td> }
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("date") && <td><DateFilter></DateFilter></td> }
							</tr>
						</tbody>
					</table>

					<div className="databox">
						<Databox></Databox>
					</div>
				</div>
    		</div>
		);
	}
}

export default connect(({carsearch})=>{
	return {
		carsearch
	}
})(CarSearchBox);