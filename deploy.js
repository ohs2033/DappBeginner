const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//hdwallet provider가 뭐지? 계좌를 잠구고, 어떤 바깥의 API를 우리가 연결한건지를 명확히 함.
//


const provider = new HDWalletProvider(
//fisrt: account mnemonic
'oil emerge blouse rail satoshi deposit pair lyrics plate butter puzzle brush',
//second: what network will be connected?
'https://rinkeby.infura.io/sANegqkNqoGDa4aBbv97'
);

const web3 = new Web3(provider);

const deploy = async () => {
	// 1. account 정보를 전부 얻는다.
	// 
	try {
			const accounts = await web3.eth.getAccounts();
	console.log('acounts are ', accounts);

	const result = await new web3.eth.Contract(JSON.parse(interface))
	// .deploy({ data: bytecode, arguments: ['Hi there!'] })
	.deploy({ data: bytecode }) // we don't need argument in this case.
	.send({ gas: '1000000', from: accounts[0] })

	console.log(interface);
	console.log('Contract deployed to ', result.options.address);
	} catch (err) {
		console.log('error is ', err);
	}


};

deploy();