import React from "react";
import R from "ramda";

export default {
	namespace : "carsearch",
	state : {
		//过滤器
		"filter" 		: {},
		//汽车清单
		"carlist" 	: [],
		"pagination"	: {
			"page" 		: 1,
			"pagesize" 		: 10,
			"sortby"		: "id",
			"sortdirection"	: "ascend" //descend,ascend
		},
		"totalamount"	: 1
	},
	reducers : {
		settag_sync(state,{payload}){
			return {
				...state,
				"filter" : {
					...state.filter,
					[payload.tagkey] : payload.tagvalue
				},
				"pagination" : {
					...state.pagination ,
					"page" : 1
				}
			}
		},
		deltag_sync(state,{payload}){
			//深度克隆原来的对象
			var filter = R.clone(state.filter);
			//删除一个键
			delete filter[payload.keyname];
			//返回新对象
			return {
				...state,
				"filter" : filter
			};
		},
		setlist(state,{payload}){
			return {
				...state, 
				"carlist" : payload.results , 
				"totalamount" : payload.totalamount
			}
		},
		setsorter_sync(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"sortby"		: payload.sorter.field,
					"sortdirection"	: payload.sorter.order 	//descend,ascend
				}
			}
		},
		setpage_sync(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"page" 			: payload.page,
					"pagesize" 		: payload.pagesize
				}
			}
		},
		setpagesize_sync(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"pagesize" 		: payload.size
				}
			}
		}
	},
	effects : {
		settag : function* ({payload},{put,select}){

			yield put({"type" : "settag_sync" , payload : payload});
			yield put({"type" : "fetchdata"});
		},
		deltag : function* ({payload},{put,select}){

			yield put({"type" : "deltag_sync" , payload : payload});
			yield put({"type" : "fetchdata"});
		},
		setsorter : function* ({payload},{put,select}){

			yield put({"type" : "setsorter_sync" , payload : payload});
			yield put({"type" : "fetchdata"});
		},
		setpage : function* ({payload},{put,select}){

			yield put({"type" : "setpage_sync" , payload : payload});
			yield put({"type" : "fetchdata"});
		},
		setpagesize : function* ({payload},{put,select}){

			yield put({"type" : "setpagesize_sync" , payload : payload});
			yield put({"type" : "fetchdata"});
		},
		fetchdata :  function* ({payload},{put,select}){
			//找服务器拉取最新的数据
			const filter = yield select(state=>state.carsearch.filter);
			const pagination = yield select(state=>state.carsearch.pagination);

			const {results , totalamount} = yield fetch("/cardata",{
				"method" : "post" ,
				"headers": {
    				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
   				},
				"body" : "filter=" + encodeURI(JSON.stringify(filter)) + "&pagination=" + JSON.stringify(pagination)
			}).then((res)=>res.json());

			//异步流的结束put到同步reducer
			yield put({"type" : "setlist" , payload : {results , totalamount}});
		}
	}
}
 