interface ErrorReturn {
    error: string,
    statusCode: number,
}

interface SuccessReturn {
    message: string,
    statusCode: number
}

export { ErrorReturn, SuccessReturn };