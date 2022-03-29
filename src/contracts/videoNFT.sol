// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.3;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;

    constructor() payable ERC721("VideoNFT", "VFM") {
        owner = payable(msg.sender);
    }

    function createToken(string memory tokenURI) public payable returns(uint) {
        // require(msg.sender == owner, "Only the owner can create tokens");
        // require(msg.value >= price, "not enough matic sent");
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        return newItemId;
    }

    function withdraw() public {
        require(msg.sender == owner, "You are not the owner HAHAHHA");
        uint256 amount = address(this).balance;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to withdraw Matic");
    }
}
