console.log('JS');

$(document).ready(readyNow)

problem = {
    num1: 0,
    num2: 0,
    operator: ''
}

function readyNow(){
    $('#server-side-cal_form').on('click','#calculate', calculate)
    $('#server-side-cal_form').on('click','.operator', operator)
    $('#server-side-cal_form').on('click','#clear',clear)
}


function operator(evt){
    evt.preventDefault();
    let opOject = $(this).data()

    problem.operator = findKey(opOject)
}

function calculate(evt){
    evt.preventDefault();

    problem.num1 = Number($('#input_1').val())
    problem.num2 = Number($('#input_2').val())

    console.log(problem);

    $.ajax({
        url:'/problem',
        method:"POST",
        data: problem
    }).then(()=>{
        $('#input_1').val('')
        $('#input_2').val('')
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
        console.log(result);

        let latestAns = result[result.length - 1].answer

        $('#latest_result').text(latestAns)

        $('.results').empty();

        for (let solutions of result) {
            $('.results').append(`
                <p>${solutions.expression}</p>
            `)
        }

    })
}

function findKey(object){
    let key;

    for (const prop in object ) {
        key = prop;
    }

    switch(key){
        case 'add':
            return object.add
            break;
        case 'sub':
            return object.sub
            break;
        case 'multi':
            return object.multi
            break;
        case 'divide':
            return object.divide
            break;
    }


}