const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const whichCalculationToDo = require('./whichCalculationToDo')

let results = []

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("I'm listen 👂");
})

app.get('/problem',(req,res)=>{
    res.send(results)
    console.log('step 3: sending data');
    res.sendStatus(201)
})

app.post('/problem',(req,res)=>{
    console.log(req.body.data);
    if(req.body.data === 'clear'){

        results = [];
        console.log('results history cleared');
        res.sendStatus(202)
    } else {

    let problem = req.body
    let num1 = Number(problem.num1) 
    let num2 = Number(problem.num2) 
    let op =  problem.operator

    console.log('step 2: got problem', num1, num2, op);

    results.push(whichCalculationToDo(num1,num2,op))
    
    res.sendStatus(200)
    }
})

