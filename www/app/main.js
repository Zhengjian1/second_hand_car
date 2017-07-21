import React from "react";
import dva, { connect } from 'dva';
import createLogger from 'dva-logger';
import createLoading from 'dva-loading';
import router from "./router.js";
import carsearch from "./models/carsearch.js";
import picshow from "./models/picshow.js";
import indexshow from "./models/indexshow.js";


const app = dva();


app.use(createLogger());


//使用model
app.model(carsearch);
app.model(picshow);
app.model(indexshow);


app.router(router);



app.start("#root");