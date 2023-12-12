const TimeLockPuzzle:any = async() =>{
    const modExp = async(base: bigint, exponent: bigint, modulus: bigint):Promise<bigint> => {
        let result = BigInt(1);
        base = base % modulus;
        let count = 0; 
        while (exponent > 0) {
            count++;
            if (exponent % BigInt(2) === BigInt(1)) {
                result = (result * base) % modulus;
            }
            exponent = exponent / BigInt(2);
            base = (base * base) % modulus;
        }
        console.log(count)
        return result;
    }
 
    const createPuzzle = async(base: bigint, exponent: bigint, modulus: bigint): Promise<bigint> => {
        return await modExp(base, exponent, modulus);
    }

    const solvePuzzle = async(base: bigint, exponent: bigint, modulus: bigint, puzzle: bigint): Promise<boolean> => {
        return await (await modExp(base, exponent, modulus)) === puzzle;
    }

    return {
        modExp : modExp,
        createPuzzle : createPuzzle,
        solvePuzzle: solvePuzzle
    }
}

const main = async () =>{
    // Example usage:
    const base = BigInt(5);
    // 제곱의 수에 따라 퍼즐의 난이도가 결정됩니다.
    const exponent = BigInt(2 ** 256);
    // Large prime for modulo
    const modulus = BigInt('1231214124124124124124124123123123123'); 

    const timelock = await TimeLockPuzzle();

    const puzzle = await timelock.createPuzzle(base, exponent, modulus);
    console.log(`Puzzle: ${puzzle}`);

    // // 퍼즐 풀기 (지수에 따라 상당한 시간이 소요됨)
    const isSolved = await timelock.solvePuzzle(BigInt(1515151), exponent, modulus, puzzle);
    console.log(`Puzzle Solved: ${isSolved}`);
}


main();