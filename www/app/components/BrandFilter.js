import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js";

class BrandFilter extends React.Component{
	constructor({props}){
		super(props);

		this.state = {
			"list" : (function(){
				var results = [];
				for(let value of Object.values(brands)){
					results = results.concat(value);
				}
				return results;
			})()
		}
	}

	//显示a标签列表
	showbrandlist(){
		return this.state.list.map((item,index)=>{
			return <a key={index} onClick={()=>{this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "brand" , "tagvalue" : item}})}}>{item}</a>
		});
	}

	//生命周期，组件接收到新的props（就是当store中carserch对象改变的时候）
	componentWillReceiveProps(nextprops){
		if(nextprops.carsearch.filter.country == undefined){
			//全部
			var results = [];
			for(let value of Object.values(brands)){
				results = results.concat(value);
			}
			this.setState({"list" : results});
		}else{
 			this.setState({"list" : brands[nextprops.carsearch.filter.country]});
		}
	}

 
		
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						品牌：
					</div>
					<div className="col-xs-11">
						{this.showbrandlist()}
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
)(BrandFilter)