const calculation = require('./calculation')

let whichCalculationToDo = (num1, num2, operator) =>{
    let results = {
        expression: "",
        answer: 0
    }
    switch (operator){
        case '+' :
            results.answer = calculation.add(num1,num2)
            results.expression = `${num1} + ${num2} = ${results.answer}`
            break;
        case '-' :
            results.answer = calculation.subtract(num1,num2)
            results.expression = `${num1} - ${num2} = ${results.answer}`
            break;
        case 'x' :
            results.answer = calculation.multi(num1,num2)
            results.expression = `${num1} x ${num2} = ${results.answer}`
            break;
        case '/' :
            results.answer = calculation.divide(num1,num2)
            results.expression = `${num1} / ${num2} = ${results.answer}`
            break;
    }

    return results

}

// console.log(whichCalculationToDo(1,3,'+'))
// console.log(whichCalculationToDo(6,3,'-'))
// console.log(whichCalculationToDo(1,3,'x'))
// console.log(whichCalculationToDo(10,2,'/'))

module.exports = whichCalculationToDo