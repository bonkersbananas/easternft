pragma solidity ^0.8.4;

import "./ERC721A.sol";

contract NFT is ERC721A {
    constructor() ERC721A("EasterNFT", "EASTERNFT") {}

    function mint() external payable {
        _safeMint(msg.sender, 1);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://drive.google.com/uc?export=view&id=1JLjKhA9YcxMf3bCjQzTmhRBYdduP83xQ"));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return 'https://drive.google.com/uc?export=view&id=1JLjKhA9YcxMf3bCjQzTmhRBYdduP83xQ';
    }
}
