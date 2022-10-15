import ArrayMultiplier from "../../api/utils/arrayMultiplier";
import TotalSum from "../../api/utils/totalSum";

const Sum = TotalSum
const Multiplier = ArrayMultiplier

const validator = (CPF : string) =>{

    const values = CPF.split(/[-.]+/)

    const numbers = values.join('').split('')

    // const values = CPF.split(/[-.]+/)
    // const last_digits = values.pop()
    // const first_digit = last_digits?.split('')

    // const CPFnumbers = values.join('').split('')
    
}


const firstValidate = (numbers: Array<number>, firstDigit : number) => {
    
    const multipliedValue = Multiplier(numbers, 2, 10)

    let resultSum = Sum(multipliedValue)

    if (resultSum == 10)
        resultSum = 0 

    console.log("soma:" + resultSum)

    if (resultSum == firstDigit)
        return true
    else
        return false

}

export default validator