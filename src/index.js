const express = require ('express');

const morgan = require('morgan');
const workRouter = require('./routers/work.routes');

const app = express();

app.use(morgan('dev'));
app.use(workRouter);

app.listen(4000);
console.log("My server on port 4000");