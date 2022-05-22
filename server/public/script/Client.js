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
    $('#server-side-cal_form').on('click','.operator', operator)
    $('#server-side-cal_form').on('click','#clear',clear)
    $('#server-side-cal_form').on('click','.number',numberInput)
}


function operator(evt){
    evt.preventDefault();
    
    let op = $(this).data('op')
    
    problem.operator = op
    
    input.push(op)
    
    let join = input.join('')

    $('#input_1').attr('value',join)
}

function calculate(evt){
    evt.preventDefault();

    let expression = $('#input_1').val()

    console.log( expression);

    convertIntoObject(expression)

    console.log(problem);

    $.ajax({
        url:'/problem',
        method:"POST",
        data: problem
    }).then(()=>{
        $('#input_1').val('')
        $('#input_1').attr('value','')
        input = []
        problem.num1= '';
        problem.num2= ''
        location.reload()
        fetchSolution()
        

    })
    
}

function clear(evt){
    evt.preventDefault();
    let clear = {
        data: $(this).attr('id')
    }

    console.log(clear);
    
    $.ajax({
        url:'/problem',
        method:"POST",
        data: clear
    }).then(()=>{

        $('#latest_result').text('')
        $('#input_1').val('')
        $('#input_2').val('')
        $('.results').empty()
        console.log('requesting server to be clear by server');
    })

}

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
                <p>${result[solution].expression}</p>
            `)
        }

    })
}

function numberInput(evt){
    evt.preventDefault();
    let number = $(this).data('number');
    
    input.push(number)

    $('#input_1').attr('value',input.join(''))
}

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
