const totalSum = (values : Array<number>) => {
    let sum = 0;

    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum;
}

export default totalSum