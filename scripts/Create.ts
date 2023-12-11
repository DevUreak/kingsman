
// uint64 랜덤 숫자생성
export const CreateNumber = async()=>{

    const maxUint64 = BigInt(1) << BigInt(64);
    return BigInt(Math.floor(Number(maxUint64) * Math.random()));

}

// 힌트 생성 
// |----- x ----|
export const CreateHint = async(_target:bigint, _interval:number, _count:number)=>{
    
    // 1000
    //  0 ~ 350 ~ 1000 
    const MAX = (BigInt(1) << BigInt(64)) - BigInt(_target);
    const minInterval = BigInt(_target) / BigInt(_interval);
    const maxInterval = (MAX - BigInt(_target)) / BigInt(_interval);

    let index = 0;
    let currentNumber:bigint = BigInt(0);
    let minArray:any[] = [];
    while(index < _count){
        currentNumber = currentNumber + minInterval; 
        // 넘으면 종료
        if(_target <= currentNumber || index == _count)
            break;
        
        minArray.push(currentNumber);
        index++;
    }

    currentNumber = _target;
    let maxArray:any[] = [];
    index = 0;
    while(index < _count){
        currentNumber = currentNumber + maxInterval; 
        // 넘으면 종료
        if(MAX <= currentNumber || index == _count)
            break;
        
        maxArray.push(currentNumber);
        index++;
    }
}

const main = async() => {
    //console.log(CreateNumber());
    await CreateHint(BigInt(999), 11, 100);

}
main();