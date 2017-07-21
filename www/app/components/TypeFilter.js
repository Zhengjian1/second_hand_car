import React from "react";
import { connect } from "dva";

class TypeFilter extends React.Component{
	constructor({props}){
		super(props);

		this.list = ["轿车","小型SUV","中型SUV","大型SUV"];
	}

	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						类型：
					</div>
					<div className="col-xs-11">
						{this.list.map((item,index)=>{
							return <a key={index} onClick={()=>{this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "type" , "tagvalue" : item}})}}>{item}</a>
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	({carsearch}) => {
		return {
			carsearch
		}
	}
)(TypeFilter)