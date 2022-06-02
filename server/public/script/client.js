console.log('JS');

$(document).ready(readyNow)

let problem = {
    num1: '',
    num2: '',
    operator: ''
}

let input = []

function readyNow(){

    fetchSolution()
    $('#server-side-cal_form').on('click','#calculate', calculate)
    $('#server-side-cal_form').on('click','.operator', operatorInput)
    $('#server-side-cal_form').on('click','#delete',onDelete)
    //$('#server-side-cal_form').on('click','#clear',onclear)
    $('#server-side-cal_form').on('click','.number',numberInput)
    mouseEvent()
    
}

function mouseEvent() {
    $('.results').on('click','.result',()=>{
        let id = $(this).data('id')
        console.log('I am in here', id);
    })
}


/*
On click of '=' button, value from text 
input gets store in expression variable.
That expression gets convert into an 
object and sent to the server for calculation.
Once object is sent to server, all data is 
erased then results are returned client 
*/ 
function calculate(evt){

    evt.preventDefault();

    let expression = $('#input_1').val()

    let isValidExpression = isIsThereAnyLetterInExpression(expression);

    if(isValidExpression){

        convertIntoObject(expression)

        $.ajax({
            url:'/problem',
            method:"POST",
            data: problem
        }).then(()=>{
            eraseAllData()
            fetchSolution()
        
        })

    }
    
    
}

/*
On click of 'D' button, id value is store to 
the clear object and sent to the server.
Once object is sent to server add data is 
erased
*/ 
function onDelete(evt){

    evt.preventDefault();

    let clear = {
        data: $(this).attr('id')
    }

    console.log(clear);
    
    $.ajax({
        url:'/problem',
        method:"DELETE",
        data: clear
    }).then(()=>{

        $('#latest_result').text('')
        $('.results').empty()
        eraseAllData()
        
        console.log('requesting server to be clear by server');
    })

}

/*
Gets solution object from server and 
displays the result of recent 
and all previous calculations
*/ 
function fetchSolution(){

    $.ajax({
        url:'/problem',
        method:'GET'
    }).then((result)=>{

        let latestAns = result[result.length - 1].answer

        $('#latest_result').text(latestAns)

        $('.results').empty();

        for (let solution = result.length-1; solution >= 0; solution-- ) {
            console.log(result[solution].expression);
            $('.results').append(`
                <p data-id='${solution}' class='result' id='${solution}'>${result[solution].expression}</p>
            `)
        }

    })
}

/*
when a number or operator button is click,
value is store and push to array.
Once number is push to array,the 
array is added to the input value
*/ 
function numberInput(evt){
    evt.preventDefault();
    
    let number = $(this).data('number');
    
    push2Arr(number)   
}

function operatorInput(evt){
    evt.preventDefault();
    
    let op = $(this).data('op')
    
    problem.operator = op
    
    push2Arr(op)
}

/* 
Function takes in a string and separates 
the variable into problem.num1 and problem.num1 properties
*/ 
function convertIntoObject(expression) {
    let index = 0;
    console.log(expression);
    
    for(let i = 0; i < expression.length-1; i++){
        if(expression[i] === '+'|| expression[i] === '-'||expression[i] === 'x' || expression[i] === '/'){
            index = i;
            index++
            console.log(expression[index]);
            break;
        }

        problem.num1 += expression[i]
    }



    for(let i = index; i < expression.length; i++){
        if(expression[i] === '+'){
            index = i;
            break;
        }

        problem.num2 += expression[i]
    }

}

/*
function that takes in variable and push it 
to an array. Once variable is push to input array,
the array is added into the value attribute.
*/
function push2Arr(dataType) {
    input.push(dataType)

    $('#input_1').attr('value',input.join(''))
}

function eraseAllData() {
    $('#input_1').val('')
    $('#input_1').attr('value','')
    input = []
    problem.num1= '';
    problem.num2= ''
    location.reload()
}

/*
this function checks to see if element in the array
is Not a Number and not equals to +,-,/,or x
*/

function isIsThereAnyLetterInExpression(expression) {
    for (let ch of expression) {
        if( isNaN(Number(ch)) && !(ch === '+') && !(ch === '-') && !(ch === '/') && !(ch === 'x') && !(ch === '.') ) {
           alert('invalid entry', ch)
           return false
        }
    }

    return true
}