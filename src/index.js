const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const workRouter = require('./routers/work.routes');
const personRouter = require('./routers/person.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(workRouter);
app.use(personRouter);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message
  })
});

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(4000);
console.log("My server on port 4000");