const isText = (value: any) => {
    const regexText = new RegExp('^[a-zA-Z ]*$')
    return regexText.test(value)
}

export default isText