const intervalRandom = (min: number, max: number): number => {
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    return random === 0 ? 3 : random;
};

export default intervalRandom;
