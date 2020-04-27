const express = require('express');
const bodyParser = require('body-parser');
const { body } = require('express-validator');

// Initializations
const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require('./database'); // setup database 
const collection = "operations";

// // Settings
app.set('port', process.env.PORT || 3000);

// show init page
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname,'index.html'));
});

// solve an operation
// take input from a json and return the input and his output
app.post('/solve',(req,res)=>{
  const b = req.body;
  const op = b.input;
  // perform operation
  try {
      rs = eval(op);
      res.json({
        input : op ,
        output: rs,
        ok : 1
      }); 
  } catch (e) {
      if (e instanceof SyntaxError) {
          alert(e.message);
      }
  }
});

// give all Operations saved in the database. 
app.get('/all', (req,res) =>{
  db.getDB().collection(collection).find({}).toArray((err,documents) => {
    if(err){
      console.log("crash : " + req.originalUrl);
      console.log(err);
    }else{
      console.log(documents);
      res.json(documents);
    }
  })
});

// create an operation in the database
app.post('/',(req, res) => {
  const b = req.body;
  b.output = eval(b.input);
  db.getDB().collection(collection).insertOne(b,(err,result)=> {
    if(err){
      console.log("crash : " + req.originalUrl);
      console.log(err);
    }else
      res.json({result: result, document: result.ops[0]});
  });
});

// Update an operation in the database
app.put('/:id', (req, res) => {
  const opID = req.params.id;
  const b = req.body;
  const ipVal = b.input ;
  const opVal = eval(ipVal);
  db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(opID) }, {$set : {input: ipVal, output: opVal}}, {returnOriginal : false },(err,result) =>{
    if(err){
      console.log("crash : " + req.originalUrl);
      console.log(err);
    }else{
      console.log(result);
      res.json(result);
    }
  })
});

// Find an operation in the database
app.get('/:id', (req, res) => {
  const opID = req.params.id;
  db.getDB().collection(collection).findOne({ _id: db.getPrimaryKey(opID) },(err,result) =>{
    if(err){
      console.log("crash : " + req.originalUrl);
      console.log(err);
    }else{
      console.log(result);
      res.json(result);
    }
  })
});

// delete an operation in the database
app.delete('/:id',(req, res)=> {
  const opID = req.params.id;
  db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(opID) },(err,result)=>{
    if(err){
      console.log("crash : " + req.originalUrl);
      console.log(err);
    }else{
      res.json(result);
    }
  });
});

// connect to database
db.connect((err) =>{
	if(err){
		console.log("Unnable to connect to database ");
    process.exit(1);
  }else{
    app.listen(app.get('port'), () =>{
      console.log('Calculator REST API server started on: ' , app.get('port'));
    });
  }
})