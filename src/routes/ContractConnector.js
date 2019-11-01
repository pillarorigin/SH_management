const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const History = require("../../build/contracts/History.json");
const Web3 = require("web3");
let web3 = new Web3();
let account = null;
let contract = null;

router.post('/transfer', async function (req, res) {
    // to do (13시 30분 이후) role이 group인 session만 해당 기능 실행 가능하게 로직짜기

    console.log(req.body);
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:7545')); //가나슈 네트워크 
        account = await web3.eth.getAccounts();
        console.log(account)
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

        console.log(name, groupName, accountNumber, accounts, useHistory, date)
        console.log(account[0])

        await contract.methods.transfer(name, groupName, accountNumber, accounts, useHistory, date).send({ from: account[0], gas:200000 }).then(result => {
            console.log(result)
        });
        let _name, _groupName, _accountNumber, _accounts, _useHistory, _date = await contract.methods.get().call();
        console.log(_name, _accounts);
        // return (_name, _groupName, _accountNumber, _accounts, _useHistory, _date)
        //res.send({ msg: _use });
        res.json({ msg: _name, _groupName, _accountNumber, _accounts, _useHistory, _date});

    } catch (error) {
        console.error(error);
        res.send({ msg: error.message });
    }
});

// renew biology candy crime twin diesel round latin mule spare media trap

module.exports = router;

