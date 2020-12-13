const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const login = require('./routes/login');
const products = require('./routes/products');
const sub_system = require('./routes/sub_system');
const components = require('./routes/components');
// const student = require('./routes/student');
// const token = require('./routes/token');

app.set('view engine', 'ejs');

const PORT=process.env.PORT||8448;

// app.use(express.json()).use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));


app.use((req,res,next)=>{
  res.locals.user=req.user||null;
  next();
});


// app.use('/', login);
app.use('/products', products);
app.use('/sub_system',sub_system);
app.use('/components',components);
app.use('/vendor',vendor);

var server = app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
