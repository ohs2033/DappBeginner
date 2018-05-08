pragma solidity ^0.4.0;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);    
    }
    
    function random() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted payable {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);//sending money.
        players = new address[](0);
        //balance is every money we got.
    }
    
    function getPlayerLength() public view returns (uint) {
        return players.length;
    }

    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
    
}