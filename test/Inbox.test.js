const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


class Car {

    park () {
        return 'stopped';
    }

    drive () {
        return 'vroom';
    }
}




describe('Car Class', () => {

    let car;
    beforeEach(() => {
        car = new Car();
    });

    it('has park function', () => {
        assert.equal(car.park(), 'stopped');
        car.park();
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    })
});


