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

// 创建交易   
var HelloWorldTx = HelloWorld.deploy({data: bytecode, arguments: [web3.utils.asciiToHex('Hello world!')]})
 
// 发起交易  (from : 选择用来发起部署合约交易的地址， gas 不够则增大值)
HelloWorldTx.send({from: '0xb060ec726e5debc85bffb296acb3d33f35faf3ce', gas: 1000000}).then((newContractInstance)=>{
    // console.log(newContractInstance)
    console.log(newContractInstance.options.address)
});

console.log("deploy end ...") 