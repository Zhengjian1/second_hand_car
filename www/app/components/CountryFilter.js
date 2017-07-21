import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js";

class CountryFilter extends React.Component{
	constructor({props}){
		super(props);

		//local state，只有本地state能够触发视图的改变
 		this.state = {
 			//a标签的数组（国家的名字）
 			"countries" : Object.keys(brands)
 		};
	}

	//显示a标签的清单，这个函数用来将this.countries数组中的项，包裹上a标签年之后呈递
	showcountrylist(){
		return this.state.countries.map((item,index)=>{
			return <a key={index} onClick={()=>{this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "country" , "tagvalue" : item}})}}>{item}</a>
		});
	}
		
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						国家：
					</div>
					<div className="col-xs-11">
						{this.showcountrylist()}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => {
		return {

		}
	}
)(CountryFilter);