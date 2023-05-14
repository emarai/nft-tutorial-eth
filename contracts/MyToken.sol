// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

// https://github.com/chiru-labs/ERC721A
contract MyToken is ERC721A, Ownable {
    using Strings for uint256;

    constructor() ERC721A("MyToken", "MTK") {}

    string private baseUri;

    function mint(address to, uint256 quantity) public onlyOwner {
        _mint(to, quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    function setBaseURI(string memory newBaseUri) public onlyOwner {
        baseUri = newBaseUri;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }
}
