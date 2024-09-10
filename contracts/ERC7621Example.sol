// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BTS is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Token {
        address tokenAddress;
        uint256 weight;
    }

    mapping(uint256 => Token[]) public basketTokens;
    mapping(uint256 => mapping(address => uint256)) public userShares;
    mapping(uint256 => string) private _tokenURIs;
    
    uint256 public totalLiquidity;

    event ContributedToBTS(address indexed bts, uint256 amount);
    event WithdrawnFromBTS(address indexed bts, uint256[] amounts);
    event WithdrawnETHFromBTS(address indexed bts, uint256 amount);
    event RebalanceBTS(address indexed bts, uint256[] oldWeights, uint256[] newWeights);

    constructor() ERC721("Basket Token Standard", "BTS") {}

    function initialize(
        string memory _name,
        string memory _symbol,
        address[] memory _tokens,
        uint256[] memory _weights,
        string memory _tokenURI
    ) external returns (uint256) {
        require(_tokens.length == _weights.length, "Tokens and weights must have the same length");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        for (uint i = 0; i < _tokens.length; i++) {
            basketTokens[newTokenId].push(Token(_tokens[i], _weights[i]));
        }

        return newTokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function contribute(uint256 _tokenId) external payable {
        require(_exists(_tokenId), "BTS does not exist");
        require(msg.value > 0, "Contribution must be greater than 0");

        // Simplified logic: In a real implementation, you'd use a DEX to swap ETH for tokens
        uint256 contribution = msg.value;
        userShares[_tokenId][msg.sender] += contribution;
        totalLiquidity += contribution;

        emit ContributedToBTS(address(this), contribution);
    }

    function withdraw(uint256 _tokenId, uint256 _liquidity) external {
        require(_exists(_tokenId), "BTS does not exist");
        require(userShares[_tokenId][msg.sender] >= _liquidity, "Insufficient liquidity");

        userShares[_tokenId][msg.sender] -= _liquidity;
        totalLiquidity -= _liquidity;

        // Simplified logic: In a real implementation, you'd calculate and transfer actual tokens
        uint256[] memory amounts = new uint256[](basketTokens[_tokenId].length);
        for (uint i = 0; i < basketTokens[_tokenId].length; i++) {
            amounts[i] = (_liquidity * basketTokens[_tokenId][i].weight) / 100;
            // Transfer tokens to user (not implemented here)
        }

        emit WithdrawnFromBTS(address(this), amounts);
    }

    function withdrawETH(uint256 _tokenId, uint256 _liquidity) external {
        require(_exists(_tokenId), "BTS does not exist");
        require(userShares[_tokenId][msg.sender] >= _liquidity, "Insufficient liquidity");

        userShares[_tokenId][msg.sender] -= _liquidity;
        totalLiquidity -= _liquidity;

        payable(msg.sender).transfer(_liquidity);

        emit WithdrawnETHFromBTS(address(this), _liquidity);
    }

    function rebalance(uint256 _tokenId, address[] memory _newTokens, uint256[] memory _newWeights) external onlyOwner {
        require(_exists(_tokenId), "BTS does not exist");
        require(_newTokens.length == _newWeights.length, "Tokens and weights must have the same length");

        uint256[] memory oldWeights = new uint256[](basketTokens[_tokenId].length);
        for (uint i = 0; i < basketTokens[_tokenId].length; i++) {
            oldWeights[i] = basketTokens[_tokenId][i].weight;
        }

        delete basketTokens[_tokenId];
        for (uint i = 0; i < _newTokens.length; i++) {
            basketTokens[_tokenId].push(Token(_newTokens[i], _newWeights[i]));
        }

        emit RebalanceBTS(address(this), oldWeights, _newWeights);
    }

    function getTokenDetails(uint256 _tokenId, uint256 _index) external view returns (address, uint256) {
        require(_exists(_tokenId), "BTS does not exist");
        require(_index < basketTokens[_tokenId].length, "Index out of bounds");

        Token memory token = basketTokens[_tokenId][_index];
        return (token.tokenAddress, token.weight);
    }

    function totalTokens(uint256 _tokenId) external view returns (uint256) {
        require(_exists(_tokenId), "BTS does not exist");
        return basketTokens[_tokenId].length;
    }
}