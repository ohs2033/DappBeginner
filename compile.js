const path = require('path'); // cross-platform valid path.
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read solidity file.
const source = fs.readFileSync(inboxPath, 'utf8');


// exporting contract file.
module.exports = solc.compile(source, 1).contracts[':Inbox'];

