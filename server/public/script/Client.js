console.log('JS');

$(document).ready(readyNow)

problem = {
    num1: 0,
    num2: 0,
    operator: ''
}

function readyNow(){
    fetchSolution()
    $('#server-side-cal_form').on('click','#calculate', calculate)
    $('#server-side-cal_form').on('click','.operator', operator)
    $('#server-side-cal_form').on('click','#clear',clear)
}


function operator(evt){
    evt.preventDefault();
    
    let op = $(this).data('op')
    
    problem.operator = op
    
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
        setDataToLocal(problem)
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


function setDataToLocal(object){
    localStorage.setItem('recentAnswer','object')
}

// function getDataFromLocal(){
//   const cat = localStorage.getItem('recentAnswer');

// }