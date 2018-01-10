# erc20-token-transfer
Usage: 
```
1) 
npm install
2) 
./node_modules/.bin/truffle exec './src/erc20-token-transfer.js' --network main --address 0x1c110.. --amount 1000 --decimals 10 --gwei 35 --gaslimit 470000 --mnemonic MNEMONICPASSWORD --source 6e172e... --token 33b7a0189.. --walletName './wallets/UTC--address'
or
3)
./node_modules/.bin/truffle exec './src/erc20-token-transfer.js' --network main --address 0x1c110.. --amount 1000 --decimals 10 --gwei 35 --gaslimit 470000 --mnemonic MNEMONICPASSWORD --source 6e172e... --token 33b7a0189.. --wallet '{json}'
```
--gwei and --gaslimit (optional)