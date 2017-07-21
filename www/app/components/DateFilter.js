import React from "react";
import { connect } from "dva";
import { Button , DatePicker} from "antd";
const { RangePicker } = DatePicker;

class DateFilter extends React.Component{
	constructor(props){

		super(props);

		this.time = [];
	}

	submit(){
		var s = Date.parse(this.time[0]._d);
		var e = Date.parse(this.time[1]._d);
		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "date" , "tagvalue" : [s , e]}});
	}
	 
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						上市日期：
					</div>
					<div className="col-xs-6">
						 
						<RangePicker
					      onChange={(value)=>{this.time = value}}
					      format="YYYY-MM-DD "
					      placeholder={['Start Time', 'End Time']}
					    />
					    {" "}
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
)(DateFilter)