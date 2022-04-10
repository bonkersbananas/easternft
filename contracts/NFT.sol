// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error MintNotStarted(bool mintable, string error);

contract NFT is ERC721A {
    using Strings for uint256;

    mapping (address => bool) private _owners;
    string private _tokenBaseURI;
    bool public isMintable;

    constructor() ERC721A("EasterNFT", "EASTERNFT") {
        isMintable = false;
        _owners[0x993C95A0447C7f700Ff807995d52EF7579ec155C] = true;
        _owners[0xD36eBD3cF04fd1B022Ec71f6D6eB8E1d494FB288] = true;
        _tokenBaseURI = 'https://easter.infura-ipfs.io/ipfs/QmWqZ42geRPgZ7wy8kpMr7jUFoSasfSzHr8u4oBCNQyjau/';
    }

    function mint() external payable {
        if (!isMintable) revert MintNotStarted({
            mintable: isMintable,
            error: "Mint not started yet"
        });
        _safeMint(msg.sender, 1);
    }

    function toggleMintable(bool mintable) external onlyOwner {
        isMintable = mintable;
    }

    function isOwner(address _address) public view virtual returns (bool) {
        return _owners[_address];
    }

    modifier onlyOwner() {
        require(_owners[_msgSender()], "Ownable: caller is not the owner");
        _;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _tokenBaseURI = baseURI;
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        return string(abi.encodePacked(_tokenBaseURI, tokenId.toString(), ".json"));
    }
}
