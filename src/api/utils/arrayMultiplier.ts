const arrayMultiplier = (values : Array<number>, multiplicand : number, multiplier: number) => {
    let result : Array<number> = [];

    for (let i = 0; multiplicand <= multiplier && i < values.length; multiplier-- && i++) {
        result[i] = values[i] * multiplier;
    };

    return result;
}

export default arrayMultiplier;