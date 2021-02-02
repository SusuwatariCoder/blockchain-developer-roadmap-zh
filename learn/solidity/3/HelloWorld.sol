// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract HelloWorld {
    bytes32 message;
    // 构造函数
    constructor(bytes32 myMessage) {
        message = myMessage;
    }

    // 外部可访问的函数，用来查看变量值, 并且声明为仅查看
    function getMessage() public view returns (bytes32) {
        return message;
    }
}