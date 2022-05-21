console.log('JS');

$(document).ready(readyNow)

function readyNow(){
 fetchSolution()
}


function fetchSolution(){
    $.ajax({
        url:'/problem',
        method:'GET'
    }).then((result)=>{
        console.log(result);

        let latestAns = result[result.length - 1].answer

        console.log(latestAns);

        $('#latest_result').text(latestAns)

        $('.results').empty();
        
        for (let solutions of result) {
            $('.results').append(`
                <p>${solutions.expression}</p>
            `)
        }

        


    })
}