// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Storage {
    mapping(string => int256) public voterlist;
    string[] ballotlist;
    address owner;
    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }
    int256 public voterCount;
    constructor()
    {
        owner = msg.sender;
        voterCount = 0;
    }

    function store(string memory voterId,string memory vote) public onlyOwner
    {
        if(voterlist[voterId] == 0)
        {
            ballotlist.push(vote);
            voterlist[voterId] = 1;
            voterCount += 1;
        }
    }
    function count() external onlyOwner returns(string[] memory)
    {
        return ballotlist;
    }   
}