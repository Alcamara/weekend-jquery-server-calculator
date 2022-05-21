const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

//const calculation = require('./calculation')

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("I'm listen 👂");
})

app.get('/results',(req,res)=>{
    console.log('step 1: sending data');
    res.send({num:4})
    res.sendStatus(200)
})

