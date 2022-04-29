export const randomOf = (max: number): number => Math.floor(Math.random() * max);

export const sample = <T>(array: T[], sampleSize = 1): T[] => {
    const clone = array.slice();
    const l = array.length;
    let r: number;
    let temp: T;
    for (let i = 0; i < sampleSize; i++) {
        r = randomOf(l);
        temp = clone[r];
        clone[r] = clone[i];
        clone[i] = temp;
    }
    return clone.slice(0, sampleSize);
};

export const shuffle = <T>(array: T[]): T[] => {
    const clone = array.slice();
    const l = array.length;
    let r: number;
    let temp: T;
    for (let i = 0; i < l; i++) {
        r = randomOf(l);
        temp = clone[r];
        clone[r] = clone[i];
        clone[i] = temp;
    }
    return clone;
};