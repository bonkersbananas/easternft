// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error MintNotStarted(string error);
error MintFinished(string error);
error MintPriceNotPaid(string error);

contract NFT is ERC721A {
    using Strings for uint256;

    mapping (address => bool) private _contractOwners;
    string private _tokenBaseURI = 'https://bafybeidy5lzy2des2s2debhvnhqttv3v7i5owjd4vlknaylay7y4ar5rai.ipfs.infura-ipfs.io/';
    string private _nonRevealedTokenURI;
    bool public isMintable = false;
    uint256 public maxSupply = 400;
    uint256 private _price = 0.02 ether;

    constructor() ERC721A("EasterNFT", "EASTERNFT") {
        _contractOwners[0x993C95A0447C7f700Ff807995d52EF7579ec155C] = true;
        _contractOwners[0xD36eBD3cF04fd1B022Ec71f6D6eB8E1d494FB288] = true;
        _contractOwners[_msgSender()] = true;
    }

    function mint() external payable {
        if (!isMintable) revert MintNotStarted({
            error: "Mint has not started yet"
        });
        if (!(_totalMinted() < maxSupply)) revert MintFinished({
            error: "No more supply to mint"
        });
        if (msg.value < _price) revert MintPriceNotPaid({
            error: "Mint price must be paid"
        });

        _safeMint(msg.sender, 1);
    }

    function isContractOwner(address _address) public view returns (bool) {
        return _contractOwners[_address];
    }

    modifier onlyContractOwner() {
        require(_contractOwners[_msgSender()], "Ownable: caller is not the contract owner");
        _;
    }

    function toggleMintable(bool mintable) public onlyContractOwner {
        isMintable = mintable;
    }

    function setBaseURI(string memory baseURI) public onlyContractOwner {
        _tokenBaseURI = baseURI;
    }

    function setNonRevealedTokenURI(string memory nonRevealedTokenURI) public onlyContractOwner {
        _nonRevealedTokenURI = nonRevealedTokenURI;
    }

    function setPrice(uint256 _newPrice) public onlyContractOwner {
        _price = _newPrice;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function withdrawAll() public payable onlyContractOwner {
        require(payable(_msgSender()).send(address(this).balance));
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function totalMinted() public view returns (uint256) {
        unchecked {
            return _currentIndex - _burnCounter - _startTokenId();
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        return bytes(_tokenBaseURI).length != 0 ? string(abi.encodePacked(_tokenBaseURI, tokenId.toString(), ".json")) : _nonRevealedTokenURI;
    }
}
