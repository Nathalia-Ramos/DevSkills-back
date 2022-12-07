interface ErrorReturn {
    error: string,
    statusCode: number,
    type?: string
}

interface SuccessReturn {
    message: string,
    statusCode: number,
}

export { ErrorReturn, SuccessReturn };