import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
// Database part
import mongoose from 'mongoose';
//connect mongodb by mongoose
// mongoose.connect('mongodb://0.0.0.0:27017/toDoListDB');
mongoose.connect(process.env.MONGO_URI);

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  }
});

//creating the collections where the data sets will stored
const List = mongoose.model("List",listSchema);
const WorkList = mongoose.model("WorkList",listSchema);
//\\

//creating the server
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended : true}));

let defaultItems = [{_id:1,name:'Welcome to your todoList'},{_id:2,name:'Click + to add new item'},{_id:3,name:'<-- hit this to delete item'}];

//getting the current date with specifications
const today = new Date();
const f = new Intl.DateTimeFormat('en-us',{
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

//use the static files from public folder
app.use(express.static('public'));
//root page of website
app.get('/',(req,res)=>{
    const read = async ()=>{
      //getting the collections of data sets from lists collection(List model)
      let result = await List.find({});
      if(result.length){
        res.render('index.ejs',{
          mode: f.format(today),
          bal: result
        });
      }else{
        res.render('index.ejs',{
          mode: f.format(today),
          bal: defaultItems
        });
      }
    };
    read();
});

app.post('/delet',(req,res)=>{
  console.log(req.body.checkbox);
  let de = req.body.checkbox;
  let listName = req.body.listName;
  let re = '/';
  let collName = List;
  if(listName === 'Work List'){
    collName = WorkList;
    re = '/work';
  }
  if(de == 1 || de == 2 || de == 3){

  }else{
    const dele = async ()=>{
      let it = await collName.findByIdAndRemove(de);
      console.log(it);
    };
    dele();
  } 
  res.redirect(re);
});

app.get('/today',(req,res)=>{
  res.redirect('/');
});

app.get('/work',(req,res)=>{
  const read = async ()=>{
    let result = await WorkList.find({});
    if(result.length){
      res.render('index.ejs',{
        mode: "Work List",
        bal: result
      });
    }else{
      res.render('index.ejs',{
        mode: "Work List",
        bal: defaultItems
      });
    }
  };
  read();
});


app.post('/submit',(req,res)=>{
  let data = req.body['newData'];
  let listName = req.body.listName;
  console.log(listName);
  let red = '/';
  if(data !== ''){
    if(listName === f.format(today)){
      const lst = new List({
        name: data
      });
      lst.save();
      red = '/today';
    }else if(listName === 'Work List'){
      const lst = new WorkList({
        name: data
      });
      lst.save();
      red = '/work';
    }
    
    console.log(data);
  }
  res.redirect(red);
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
app.listen(port,() => {
  console.log(`Server started at port number ${port}`);
});