// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.22;

interface IDiamond {
    enum Action {
        Add,
        Replace,
        Remove
    }
    // Add=0, Replace=1, Remove=2

    struct Cut {
        string key;
        Data[] data;
    }

    struct Data {
        address facetAddress;
        Action action;
        bytes4[] functionSelectors;
    }

    struct Args {
        address owner;
        address init;
        bytes initCalldata;
    }

    function diamondCut(Cut[] calldata _diamondCut, address _init, bytes calldata _calldata) external;

    error NoSelectorsGivenToAdd();
    error AccessDenied(address _sender);
    error NotContractOwner(address _user, address _contractOwner);
    error NoSelectorsProvidedForFacetForCut(address _facetAddress);
    error CannotAddSelectorsToZeroAddress(bytes4[] _selectors);
    error NoBytecodeAtAddress(address _contractAddress, string _message);
    error FunctionNotFound(bytes4 _functionSelector);
    error IncorrectFacetCutAction(uint8 _action);
    error CannotAddFunctionToDiamondThatAlreadyExists(bytes4 _selector);
    error CannotReplaceFunctionsFromFacetWithZeroAddress(bytes4[] _selectors);
    error CannotReplaceImmutableFunction(bytes4 _selector);
    error CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet(bytes4 _selector);
    error CannotReplaceFunctionThatDoesNotExists(bytes4 _selector);
    error RemoveFacetAddressMustBeZeroAddress(address _facetAddress);
    error RemoveFacetAddressNotFound(address _facetAddress);
    error Connot(bytes4 _selector);
    error CannotRemoveFunctionThatDoesNotExist(bytes4 _selector);
    error CannotRemoveFunctionFromFacetAddressThatDoesNotExist(address _facetAddress);
    error CannotRemoveImmutableFunction(bytes4 _selector);
    error InitializationFunctionReverted(address _initializationContractAddress, bytes _calldata);
}
