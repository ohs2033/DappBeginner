const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })

	 // * 인터페이스가 뭐였지?


});

describe('Lottery contract', () => {
	it('deploys a contract', () => {
		assert.ok(lottery.options.address);

		// address는 컨트랙트가 배포된 로컬 네트워크의 주소이다.
	})

	it('allows one account to enter', async () => {
		await lottery.methods.enter().send({
			from: accounts[0], value: web3.utils.toWei('0.02', 'ether')
		})

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		})

		assert.equal(accounts[0], players[0]);
		assert.equal(1, players.length);
	});


	it('allows multiple accounts to enter', async () => {
		await lottery.methods.enter().send({
			from: accounts[0], value: web3.utils.toWei('0.02', 'ether')
		})
		await lottery.methods.enter().send({
			from: accounts[1], value: web3.utils.toWei('0.02', 'ether')
		})
		await lottery.methods.enter().send({
			from: accounts[2], value: web3.utils.toWei('0.02', 'ether')
		})

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		})

		assert.equal(accounts[0], players[0]);
		assert.equal(accounts[1], players[1]);
		assert.equal(accounts[2], players[2]);
		assert.equal(3, players.length);
	});


	it('requires a minimum amount of ether to enter', async() => {
		try {
			await lottery.methods.enter().send({
					from: accounts[0],
					value: 10
				})

			assert(false); //이곳이 실행되지 않는 것을 
		} catch (err) {
			//여기가 실행 안되는거 아닌가?
				assert(err); //ok function is just check to see
		}
	})

		it('one manager can call pickWinner', async() => {
		try {
			await lottery.methods.pickWineer.send({
					from: accounts[1], //매니저가 아님.
					value: 10
				})

			assert(false); //이곳이 실행되지 않아야 함.
		} catch (err) {
				assert(err); //ok function is just check to see
		}
	})

	/**
	 * This test is end-to-end-players
	 */
	it('sends money to the winner and resets the player', async() => {

		await lottery.methods.enter().send({
			from: accounts[0], // This is manager.
			value: web3.utils.toWei('2', 'ether')
		});

		const initialBalance = await web3.eth.getBalance(accounts[0]);
		/*
		use case: await web3.eth.getBalance(accounts[0])
		 */
		
		await lottery.methods.pickWinner().send({ from: accounts[0] });
		/*
		정확히 2 이더로 같을 수는 없음. 왜냐하면 비용이 들기 때문.
		 */
		const finalBalance = await web3.eth.getBalance(accounts[0]);
		const difference = finalBalance - initialBalance;


		assert( difference > web3.utils.toWei('1.8', 'ether'));

		assert.equal(0, lottery.methods.getPlayers().length);


	})


})


