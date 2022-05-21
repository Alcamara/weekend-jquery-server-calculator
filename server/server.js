const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const whichCalculationToDo = require('./whichCalculationToDo')

let results = []

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("I'm listen 👂");
})

app.get('/problem',(req,res)=>{
    console.log('step 3: sending data');
    results.push(whichCalculationToDo(4,2,'/'))
    res.send(results)
    req.sendStatus(201)
})

app.post('/problem',(req,res)=>{
    console.log('step 2: get problem');
    //results.push(whichCalculationToDo(4,2,'/'))
    
    res.sendStatus(200)
})

