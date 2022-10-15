const validateRegex = (value: string, regex : string) => {
    const regexText = new RegExp(regex)
    return regexText.test(value)
}

export default validateRegex