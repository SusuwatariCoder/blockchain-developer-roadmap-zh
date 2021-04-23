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
var HelloWorldTx = HelloWorld.deploy({data: bytecode, arguments: [web3.utils.asciiToHex('00000012')]})
 



// 发起交易  (from : 选择用来发起部署合约交易的地址， gas 不够则增大值)
var contractInstance = HelloWorldTx.send({from: '0x1448ff9eb160a363e532b919c8e41fdc9b70eab5', gas: 1000000})

 // ? ? ? 
contractInstance.then((newContractInstance)=>{
  // 调用合约函数
  data = newContractInstance.methods.getMessage().call();  // Error: Returned error: VM Exception while processing transaction: invalid opcode
  // var result = web3.utils.hexToAscii(data());  
  console.log(data);

  });


console.log("end ...") 