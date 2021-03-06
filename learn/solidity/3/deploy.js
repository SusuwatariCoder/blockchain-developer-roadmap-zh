console.log("deploy start ...") 

var Web3 = require('web3');
var solc = require('solc');
const fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// https://github.com/ethereum/solc-js

// 读取合约
var input = {
    language: 'Solidity',
    sources: {
      'HelloWorld.sol': {
        content: fs.readFileSync('./HelloWorld.sol').toString()
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

// 编译后的合约对象
var compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(compiledContract)

// 合约ABI
var abi = compiledContract.contracts['HelloWorld.sol']['HelloWorld'].abi;

// 合约字节码
var bytecode = compiledContract.contracts['HelloWorld.sol']['HelloWorld'].evm.bytecode.object;

// 创建合约 实例化  
var HelloWorld = new web3.eth.Contract(abi)

// 创建交易 并 发送交易   
HelloWorld.deploy(
  { 
    data: bytecode,
    arguments: [web3.utils.asciiToHex('Hello world!')]
  })
.send({
    from: '0x2EB27AfB3dE4D99F3425f4d3A8f8Df91a2FF0b12',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ console.log("TransactionsHash: ",transactionHash) })
.then(function(HelloContractInstance){
    console.log("Contract Address: ",HelloContractInstance.options.address) // 新部署的 HelloWorld 合约的实例： 可调用其方法
    console.log(HelloContractInstance.methods)
    // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html?highlight=deploy#contract-send
    console.log(HelloContractInstance.methods.getMessage().call().then((hex)=>{
      console.log(web3.utils.hexToAscii(hex))
    }))
});
  
console.log("deploy end ...") 