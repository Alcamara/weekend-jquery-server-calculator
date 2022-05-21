console.log('JS');

$(document).ready(()=>{
    console.log('JQ');
})

function readyNow(){

}


function fetchSolution(){
    $.ajax({
        url:'/problem',
        method:'GET'
    }).then((answer)=>{
        
    })
}