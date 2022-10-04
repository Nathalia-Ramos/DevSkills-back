const validatePassword = (value: any) => {
    const regexText = new RegExp('^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$')
    return regexText.test(value)
}

export default validatePassword


