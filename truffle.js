const HDWalletProvider = require("truffle-hdwallet-provider");
const optimist = require('optimist');
const argv = optimist.argv;
const mnemonic = argv.mnemonic;
var wallet = argv.wallet;

if (wallet == null) {
    const walletName = argv.walletName;
    if (walletName == null) {
        wallet = require('fs').readFileSync("./wallet.json", "utf8").trim();
    } else {
        wallet = require('fs').readFileSync(walletName, "utf8").trim();
    }
}

module.exports = {
    networks: {
        test: {
            network_id: 424242,
            host: 'localhost',
            port: 8545,
            gas: 4700000
        },
        main: {
            network_id: 1,
            provider: new HDWalletProvider(wallet, mnemonic, 'https://mainnet.infura.io/'),
            gas: 470000,
            gasPrice: 30000000000 // 30 Gwei
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },

    migrations_directory: './migrations'
};