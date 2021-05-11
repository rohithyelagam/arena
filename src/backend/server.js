const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userData = require('./dbmodel');
const path = require('path')
const PORT = process.env.PORT || 5000;
// require('dotenv').config();


const app = express(express.static(path.join(__dirname, '../../build')));
app.use(cors());
app.use(bodyParser.json());



const mongo_url ='mongodb+srv://rohith_yelagam:Aa1%40bcde@cluster0.tnpyv.mongodb.net/arenaDB?retryWrites=true&w=majority';
mongoose.connect(mongo_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//check and add user to db   =>  /new/user
app.post('/new/user', (req, res) => {
    let userd=req.body;
    userData.findOne({'user_id' : userd.user_id},(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(data==null){
                console.log("user needs to be added");
                userData.create(userd, (err,data) => {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.status(201).send(data);
                    }
                })
               
            }else{
                console.log("user already exists");
                res.status(201).send(data);
            }

        }
    })
    
})

//check and add list
app.post('/new/list',(req,res)=>{
    let nn = req.body;
    userData.find({
        'user_id':nn.user_id,
       'lists.list_name' : nn.list_name
    },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        }else{
            if(data[0]!=undefined){
                console.log("club is already present");
                res.status(201).send(data);
            }else{
                console.log("needs to be updated")
          userData.updateOne(
              {user_id : nn.user_id},
            {
                $push:{
                    lists:[{list_name:nn.list_name}]
                }
            },
             (err,data)=>{
              if(err){
                  res.status(500).send(err);
                }else{
                res.status(201).send(data);
               }
               }
              )
            }
        }
    })
})


// chcek and add task
app.post('/new/task', (req, res) => {
    let task = req.body;
    userData.updateOne({
        'user_id':task.user_id,
        'lists.list_name':task.list_name
    },{
            $push:{
                   "lists.$.tasks":{
                        task_name:task.task_name,
                      }
                }
    },(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            // console.log(data);
            res.status(201).send(data);
        }
    })

    
})
//change title of list
app.post('/chng/title', (req, res) => {
    let userd=req.body;
    userData.findOne({

        "user_id" : userd.user_id,
        "lists.list_name":userd.list_name

    },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
    
})


//delete task
app.post('/delete/task', (req, res) => {

    const user_id = req.user_id;
    userData.deleteOne({
        "user_id":req.user_id,
     },(err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {

            res.status(201).send(data);
        }
    })
})



//get userslist
app.get('/get/userlist', (req, res) => {
    userData.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//get user lists
app.post('/get/user',(req,res)=>{
    let nn = req.body;
    userData.find({
        'user_id':nn.user_id,
    },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        }else{
            if(data[0]!=undefined){
                // console.log("list");
                res.status(201).send(data[0].lists);
            }else{
                // console.log(data);
                res.status(201).send(data);
            }
        }
    })
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

