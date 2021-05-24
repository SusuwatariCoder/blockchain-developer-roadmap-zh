from web3 import Web3


# IPCProvider:
# w3 = Web3(Web3.IPCProvider('./path/to/geth.ipc'))

# HTTPProvider:
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# WebsocketProvider:
# w3 = Web3(Web3.WebsocketProvider('ws://127.0.0.1:8546'))

# Infura 
# w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/<infura-project-id>'))

connect = w3.isConnected()

print(connect)   # 连接状态

accounts = w3.eth.accounts

print(accounts)  # 当前账户 address

balance_0 = w3.eth.get_balance(w3.eth.accounts[0])

print(balance_0)  # 账户余额
# Web3.fromWei(w3.eth.get_balance(w3.eth.accounts[0]), 'ether')   # 转化为 ETH

block_data = w3.eth.get_block('latest')

print(block_data)  # 最新区块数据 

tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(5, 'ether')
})
balance_1 = w3.eth.get_balance(w3.eth.accounts[1])
print(tx_hash, balance_1)   # 发起转账交易，并返回交易哈希 


tx_data = w3.eth.get_transaction(tx_hash)  # 获取交易信息
print(tx_data)

