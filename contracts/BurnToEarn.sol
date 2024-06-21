// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC20.sol";


contract BurnToEarn is ERC20 {

    ERC20 public immutable idle;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _idleTokenAddress
    ) ERC20(_name, _symbol, _royaltyRecipient, _royaltyBps) {
        idle = ERC20(_idleTokenAddress);
    }

    function verifyClaim(address _claimer, uint256 _quantity)
        public
        view
        virtual
        override
    {
        // 1. Override the claim function to ensure a few things:
        // - They own an NFT from the BAYClone contract
        require(idle.balanceOf(_claimer, 0) >= _quantity, "You don't own enough Idle Tokens");
    }

    function _transferTokensOnClaim(address _receiver, uint256 _quantity) internal override returns(uint256) {
        idle.burn(
            _receiver,
            0,
            _quantity
        );
        
        // Use the rest of the inherited claim function logic
      return super._transferTokensOnClaim(_receiver, _quantity);
    }
}