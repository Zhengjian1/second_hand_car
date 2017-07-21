import React from "react";
import { connect } from "dva";
import {Slider , Button} from "antd";

class PriceFilter extends React.Component{
	constructor(props){
		super(props);

		this.value = [2 , 400];
	}


	changehandler(value){
		this.value = value;
	}
	//确定按钮
	submit(){
		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "price" , "tagvalue" : this.value}});
	}
  
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						价格（万元）：
					</div>
					<div className="col-xs-6">
						<Slider onChange={(value)=>{this.changehandler(value)}}  range min={this.value[0]} max={this.value[1]}    defaultValue={[2.8, 400]}></Slider>
					</div>
					<div className="col-xs-1">
						<Button onClick={this.submit.bind(this)}>确定</Button>
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
)(PriceFilter)