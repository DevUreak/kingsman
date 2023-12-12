import { ethers } from "@coinmeca/ethers";
import { BaseContract } from "ethers";
export const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

// 배포된 컨트랙트를 분석해서 선언된 함수 4bytes 반환함
export async function getSelectors(contract: any) {
    const selectors: any = [];
    for (const fragment of contract.interface.fragments) {
        if (fragment.type === 'function') {
            const selector = ethers.keccak256(ethers.toUtf8Bytes(fragment.format('sighash')));
            selectors.push(selector.slice(0, 10));
        }
    }
    return selectors;
}

// 함수 고유 실별자 get -> 호출하는데 사용하는 4바이트 그거
// 예를 들어 set(uint256)과 같은 함수가 있는 경우 함수 선택기는 Keccak256("set(uint256)")의 처음 4바이트
export async function getSelector(func: any) {
    const abiInterface: any = new ethers.Interface([func])
    return abiInterface.getSighash(ethers.Fragment.from(func))
}

// 함수 고유 식별자 배열 받아서 -> 찾은다음에 제거
export async function remove(contract: BaseContract, functionNames: string[]) {
    let selectors:any = [];
    let flag = false;
    for (const fragment of contract.interface.fragments) {
        if (fragment.type === 'function') {
            const selector = (ethers.keccak256(ethers.toUtf8Bytes(fragment.format('sighash')))).slice(0,10);

            for(const name of functionNames){
                const removeSig = contract.getFunction(name).fragment.selector
                flag = removeSig == selector ? true : false;
                if(flag) break
            }
            flag ? "" : selectors.push(selector) ;
            flag = false
        }
    }
    // selectors.contract = contract
    // selectors.remove = remove
    // selectors.get = get
    return selectors
}

// functionNames는 전부 함수 고유 식별자 배열임, 아무튼 식별자를 찾음 
export const get = async(contract:BaseContract, functionNames: string[]) => {
    const selectors:any = [];
    for(const name of functionNames){
      selectors.push(contract.getFunction(name).fragment.selector)
    }
    // selectors.contract = contract
    // selectors.remove = remove
    // selectors.get = get
    return selectors
}

// remove selectors using an array of signatures
export async function removeSelectors(selectors: any, signatures: any) {
    const iface: any = new ethers.Interface(signatures.map((v: string) => 'function ' + v))
    const removeSelectors = signatures.map((v: any) => iface.getSighash(v))
    selectors = selectors.filter((v: any) => !removeSelectors.includes(v))
    return selectors
}

// 여러 facets[] 에서 facetaddress 찾음
export async function findAddressPositionInFacets(facetAddress: any, facets: any) {
    for (let i = 0; i < facets.length; i++) {
        if (facets[i].facetAddress === facetAddress) {
            return i
        }
    }
}
