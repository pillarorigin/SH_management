const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const History = require("../build/contracts/History.json"); //수정
const Web3 = require("web3");
let web3 = new Web3();
let accounts = null;
let contract = null;

router.post('/transfer', async function (req, res) {
    // to do (13시 30분 이후) role이 group인 session만 해당 기능 실행 가능하게 로직짜기

    console.log(req.body.name);
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545')); //가나슈 네트워크 
        accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = History.networks[networkId]; //networkID 안에 ABI(truffle) 존재
        contract = new web3.eth.Contract(
            History.abi,
            deployedNetwork && deployedNetwork.address,
        );
        // name, groupName, accountNumber, accounts, useHistory, date
        let name = ethers.utils.formatBytes32String(req.body.name);
        let groupName = ethers.utils.formatBytes32String(req.body.groupName);
        let accountNumber = ethers.utils.formatBytes32String(req.body.accountNumber);
        let accounts = parseInt(req.body.accounts, 10); //10진수
        let useHistory = ethers.utils.formatBytes32String(req.body.useHistory);
        let date = ethers.utils.formatBytes32String(req.body.date);
        let datas = [name, groupName, accountNumber, accounts, useHistory, date];

        //gas limit 제대로 설정안하면 out of gas 에러 남.
        await contract.methods.transfer(datas).send({ from: accounts[0] });
        let _name, _groupName, _accountNumber, _accounts, _useHistory, _date = await contract.methods.get().call();
        return (_name, _groupName, _accountNumber, _accounts, _useHistory, _date)
        //res.send({ msg: _use });

    } catch (error) {
        console.error(error);
        res.send({ msg: error.message });
    }
});

module.exports = router;

