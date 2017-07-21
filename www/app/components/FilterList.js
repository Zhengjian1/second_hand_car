import React from "react";
import { connect } from "dva";
import { Tag } from "antd"; 

class FilterList extends React.Component{
	constructor({props}){
		super(props);
		
	}

	closeHandler(item){
		this.props.dispatch({"type":"carsearch/deltag",payload:{"keyname":item}});
	}

	showtags(){
		const filter = this.props.carsearch.filter;

 
		return Object.keys(this.props.carsearch.filter).map((item,index) => {
			if(item == "country" && filter[item] != "全部"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>
				【国家】{filter[item]}
				</Tag>
			}else if(item == "brand"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【品牌】{filter[item]}</Tag>
			}else if(item == "type"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【类型】{filter[item]}</Tag>
			}else if(item == "seat"){
				var arr = filter[item].map((number)=>{
					return `${number}`
				}).join(" 或 ");

				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>
					【座位数】{arr}
				</Tag>
			}else if(item == "price"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>
					【价格】{filter[item][0]}万元 至 {filter[item][1]}万元
				</Tag>
			}else if(item == "date"){
				var s = new Date(filter[item][0]);
				var e = new Date(filter[item][1]);
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>
					【上市日期】{s.getFullYear()}年{s.getMonth() + 1}月{s.getDate()}日 至
					{e.getFullYear()}年{e.getMonth() + 1}月{e.getDate()}日 
				</Tag>
			}
		});
	}
 
	render(){
		return (
			<div>
				<div className="row">
					<div className="col-xs-1">
						筛选：
					</div>
					<div className="col-xs-11">
						{this.showtags()}
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
)(FilterList)