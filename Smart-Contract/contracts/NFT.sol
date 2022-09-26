//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIDCounter;

    mapping(string => uint8) existingURIs;

    constructor() ERC721("MyNFT", "MNFT"){}
 
    function mint(string memory metadataURI) public payable {
        require(msg.value == 0.0001 ether);
        require(existingURIs[metadataURI] != 1, 'NFT already minted');

        address payable to = payable(msg.sender);
        uint256 tokenId = _tokenIDCounter.current();
        super._safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        _tokenIDCounter.increment();
        existingURIs[metadataURI] = 1;
    }

    function getCurrentTokenID() public view returns(uint256){
        return _tokenIDCounter.current();
    }

    function _baseURI() internal pure override returns(string memory){
        return "ipfs://QmQfX8nNu4HAPMNyXJisRDTE1Lwco7oWeSWqB242RNAA4z/";
    }

    function transfer(address to, uint256 tokenId) public {
        address from = msg.sender;
        super._transfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage, ERC721) returns(string memory){
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
    public
    view 
    override(ERC721, ERC721Enumerable) 
    returns(bool) {
        return super.supportsInterface(interfaceId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override(ERC721URIStorage){
        super._setTokenURI(tokenId, _tokenURI);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage){
        super._burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable){
        super._beforeTokenTransfer(from, to, tokenId);
    }
}