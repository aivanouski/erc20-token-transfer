const fs = require("fs");
const optimist = require('optimist');
const ENCODING = 'utf-8';

module.exports = () => {

    const argv = optimist.argv;
    const decimals = argv.decimals;
    const gaslimit = argv.gaslimit;
    const gwei = argv.gwei;
    const amount = argv.amount;
    const token = argv.token;
    const inputSource = argv.source == null ? web3.currentProvider.getAddress() : argv.source;

    const normilaze = (str) => str.toString().startsWith("0x") ? str.toString() : "0x" + str.toString();
    const address = normilaze(argv.address);

    if (inputSource == null || token == null || decimals == null || address == null || amount == null) {
        throw "Some of required parameters don't be set."
    }

    const erc20TokenAddress = normilaze(argv.token);
    const source = normilaze(inputSource);

    const abi = fs.readFileSync('./resources/ERC20Interface.json').toString(ENCODING);
    const jsonAbi = JSON.parse(abi);
    const erc20Instance = web3.eth.contract(jsonAbi.abi).at(erc20TokenAddress);

    var result = {};
    var settings = {from: source};
    if (gwei) {
        settings.gasPrice = gwei * 1000000000;
    }
    if (gaslimit) {
        settings.gas = gaslimit;
    }

    erc20Instance.transfer(web3.toHex(address), (amount * Math.pow(10, decimals)), settings, (err, hash) => {
        if (err) {
            result.success = false;
            result.message = err.toString();
        } else {
            result.success = true;
            result.hash = hash;
            result.amount = amount;
            result.address = address;
            result.decimals = decimals;
        }

    console.log(result);
    process.exit();

    });
};