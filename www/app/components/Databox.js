import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js";
import { Table, Button , Pagination } from 'antd';
import { Link } from 'dva/router';

class Databox extends React.Component{
	constructor(props){
		super(props);
 	
 		//发出请求，拉取最新的数据
 		this.props.dispatch({"type" : "carsearch/fetchdata"});

 		//备份全部的列名，方便一会儿删掉之后还能回来：

 		this.state = {
 			"col" : [
			 	{
					title: 'id',
					dataIndex: 'id',
					key: 'id'
				},
				{
					title : " 图片",
					dataIndex : "pic",
					key : "pic",
					render : function(text, record){
						return <Link to={`picshow/${record.picdir}`}><img width="100" src={`car_images/${record.pic}`} alt=""/></Link>
					}
				},
				{
					title: '品牌',
					dataIndex: 'brand',
					key: 'brand',
					sorter : function(a,b){

					}
				},
				{
					title: '国家',
					dataIndex: 'country',
					key: 'country',
					sorter : function(a,b){

					}
				},
				{
					title: '车型',
					dataIndex: 'model',
					key: 'model',
					sorter : function(a,b){

					}
				},
				{
					title: '类型',
					dataIndex: 'type',
					key: 'type',
					sorter : function(a,b){

					}
				},
				{
					title: '价格',
					dataIndex: 'price',
					key: 'price',
					sorter : function(a,b){

					}
				},
				{
					title: '卖家',
					dataIndex: 'owner',
					key: 'owner',
					sorter : function(a,b){

					}
				},
				{
					title: '座位',
					dataIndex: 'seat',
					key: 'seat',
					sorter : function(a,b){

					}
				},
				{
					title: '生产日期',
					dataIndex: 'date',
					key: 'date',
					sorter : function(a,b){

					}
				}
			]
 		}
	}

	
	//当发生了排序的时候做的事情pagination, filters没有用，就用sorter
	handleChange(pagination, filters, sorter){
		this.props.dispatch({"type" : "carsearch/setsorter" , payload : {sorter}});
	}

	//当发生换页的时候，做的事情
	changepaginationhandler(page , pagesize){
		this.props.dispatch({"type" : "carsearch/setpage" , payload : {page , pagesize}});
	}

	//当更改每页多少条的时候，做的事情
	sizechangehandler(current, size){
		this.props.dispatch({"type" : "carsearch/setpagesize" , payload : {size}});
	}
		
	render(){
		return (
			<div>
				 
			 	<Table size="small" pagination={false}   columns={this.state.col} dataSource={this.props.carsearch.carlist} onChange={this.handleChange.bind(this)} />
				
				<br/>
		 
				<Pagination 
					showSizeChanger 
					onChange={(page,pagesize)=>{this.changepaginationhandler(page,pagesize)}}  
					pageSize={this.props.carsearch.pagination.pagesize} 
					total={this.props.carsearch.totalamount} 
					current={this.props.carsearch.pagination.page}
					onShowSizeChange={(current, size)=>{this.sizechangehandler(current, size)}}
					pageSizeOptions={['10','20','50','100']} />
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
)(Databox)