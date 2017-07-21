import React from "react";
import { connect } from "dva";
import {Checkbox , Button} from "antd";

class SeatFilter extends React.Component{
	constructor(props){

		super(props);

		this.state = {
			options : [
				{"number" : "2" , "checked" : true},
				{"number" : "4" , "checked" : true},
				{"number" : "5" , "checked" : true},
				{"number" : "7" , "checked" : true},
				{"number" : "更多", "checked"  : true}
			]
		}
	}

	changeHandler(e,number){
		this.setState({"options" : this.state.options.map((item)=>{
			if(item.number != number){
				return item;
			}else{
				return {"number" : number , "checked" : e.target.checked}
			}
		})});
	}

	showlist(){
		return this.state.options.map((item,index)=>{
			return <Checkbox key={index} checked={item.checked} onChange={(e)=>{this.changeHandler(e,item.number)}}>{item.number}</Checkbox>
		});
	}

	//确定按钮
	submit(){
		var seat = [];
		this.state.options.forEach((item)=>{
			if(item.checked){
				seat.push(item.number);
			}
		});

		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "seat" , "tagvalue" : seat}});
	}

	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						座位数：
					</div>
					<div className="col-xs-11">
						{this.showlist()}
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
)(SeatFilter)