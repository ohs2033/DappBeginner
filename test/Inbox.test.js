const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

const INTIAL_STRING = 'Hi there';
 


let accounts;
let inbox;

// beforeEach(async () => {
//     /*
//     We
//      */
//     accounts = await web3.eth.getAccounts();
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode, arguments: [INTIAL_STRING]})
//     .send({ from: accounts[0], gas: '1000000' })

//     inbox.setProvider(provider);
//     console.log(inbox);
// });


// describe('Inbox', () => {
//     it('deploy a contract', () => {
//         assert.ok(inbox.options.address); //키에 대해서 밸류가 존재하면 넘어간다.
//     })

//     it('has a default message', async () => {
//         const message = await inbox.methods.message().call();
//         // message 메소드는 자동으로 생성된다는 것을 잊지 말기.
//         assert.equal(message, INTIAL_STRING);

//     })

//     it('can change the message', async () => {
//         inbox.methods.setMessage('bye').send({ from: accounts[0] })
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'bye');
//     })
// })
