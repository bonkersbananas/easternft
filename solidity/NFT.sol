pragma solidity ^0.8.4;

import "ERC721A.sol";

contract NFT is ERC721A {
    constructor() EasterNFT("EasterNFT", "EASTERNFT") {}

    function mint() external payable {
        _safeMint(msg.sender, 1);
    }
}
