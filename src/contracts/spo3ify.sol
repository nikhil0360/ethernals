// SPDX-License-Identifier: MIT
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
// superfluid dependencies
import {
    ISuperfluid,
    ISuperfluidToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    IDAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// nft minting - erc 721 dependencies
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract spo3ify is ERC721URIStorage {

    using IDAv1Library for IDAv1Library.InitData;
    IDAv1Library.InitData internal _idav1Lib;
    
    uint32 internal constant _INDEX_ID = 0;
    address internal immutable _ADMIN;
    
    ISuperfluidToken public token;
    uint256 public lastAirdrop;
    uint256 public constant AIRDROP_INTERVAL = 1 minutes;
    uint256 public AIRDROP_AMOUNT;
	
	// NFT minting 
	using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;

    constructor(
        address admin,
        ISuperfluid _host,
        IInstantDistributionAgreementV1 _ida,
        ISuperfluidToken _token
    ) payable ERC721 ("Spo3ifyNFT", "S3YNFT"){
        _ADMIN = admin;
        token = _token;
        _idav1Lib = IDAv1Library.InitData(_host, _ida);
        _idav1Lib.createIndex(_token, _INDEX_ID);
		owner = payable(msg.sender);
    }

    function airdrop() external {
        require(_canAirdrop(), "Can't air drop yet!");
        AIRDROP_AMOUNT = getContractDaiXBalance();
        lastAirdrop = block.timestamp;
        _idav1Lib.distribute(token, _INDEX_ID, AIRDROP_AMOUNT);
    }
    
    function updateUnits(address subscriber, uint128 units) public {
        require(msg.sender == _ADMIN, "Unathorized!");
        _idav1Lib.updateSubscriptionUnits(
            token,
            _INDEX_ID,
            subscriber,
            units
        );
    }

    function _canAirdrop() internal view returns (bool) {
        return lastAirdrop + AIRDROP_INTERVAL <= block.timestamp;
    }

    function getContractDaiXBalance() public view returns(uint256){
        return ERC20(0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f).balanceOf(address(this));
    }

    function approveSubscription() public {
        _idav1Lib.approveSubscription(token, address(this), _INDEX_ID);
    }

    function revokeSubscription() public {
        _idav1Lib.revokeSubscription(token, address(this), _INDEX_ID);
    }

    function claimBalance() public {
        _idav1Lib.claim(token, address(this), _INDEX_ID, msg.sender);
    }

    function distributeUnits(address[] memory adr) public {

        uint128 number_of_subscribers = uint128(adr.length);
        uint128 unit_per_subscriber = uint128(100 / adr.length);
        uint128 left_out_units = uint128(100 % adr.length);

        for(uint128 i = 0; i < number_of_subscribers; i++) {
            updateUnits(adr[i], unit_per_subscriber);
        }

        // Send the remaining back to the contract's address
        updateUnits(address(this), left_out_units);
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
