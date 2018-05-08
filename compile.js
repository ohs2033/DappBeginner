const path = require('path'); // cross-platform valid path.
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

// read solidity file.
const source = fs.readFileSync(lotteryPath, 'utf8');


// exporting contract file.
module.exports = solc.compile(source, 1).contracts[':Lottery'];

