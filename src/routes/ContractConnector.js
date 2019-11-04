const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const History = require("../../build/contracts/History.json");
const Web3 = require("web3");
let web3 = new Web3();
let account = null;
let contract = null;

router.get('/', async function (req, res) {
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:7545')); //가나슈 네트워크 
        account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = History.networks[networkId]; //networkID 안에 ABI(truffle) 존재
        contract = new web3.eth.Contract(
            History.abi,
            deployedNetwork && deployedNetwork.address,
        );

        let raw_info = await contract.methods.get().call();
        let contract_info = {
            name: raw_info[0],
            groupName: raw_info[1],
            accountNumber: raw_info[2],
            accounts: raw_info[3],
            useHistory: raw_info[4],
            date: raw_info[5]
        };
        nameResult = [];
        groupResult = [];
        accountNumResult = [];
        accountsResult = [];
        historyResult = [];
        dateResult = [];

        for (let i = 0; i < contract_info.date.length; i++) {
            if (ethers.utils.parseBytes32String(contract_info.groupName[i]) != group) {
            } else {
                nameResult.push(ethers.utils.parseBytes32String(contract_info.name[i]));
                groupResult.push(ethers.utils.parseBytes32String(contract_info.groupName[i]));
                accountNumResult.push(ethers.utils.parseBytes32String(contract_info.accountNumber[i]));
                accountsResult.push(contract_info.accounts[i]);
                historyResult.push(ethers.utils.parseBytes32String(contract_info.useHistory[i]));
                dateResult.push(ethers.utils.parseBytes32String(contract_info.date[i]));
            }

            if (i === contract_info.date.length) {
            } else if (contract_info.date[i] === contract_info.date[i + 1]) {
                i++;
            } else {
            }
        }

        res.json({
            name: nameResult,
            group: groupResult,
            accountNum: accountNumResult,
            accounts: accountsResult,
            history: historyResult,
            date: dateResult
        }); //{key:value} 형식으로 하면 객체 불러오는 쪽에서 key.value로 데이터 가져오기 가능

    } catch (err) {
        console.log(err)
    }
})

router.post('/transfer', async function (req, res) {
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:7545')); //가나슈 네트워크 
        account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = History.networks[networkId]; //networkID 안에 ABI(truffle) 존재
        contract = new web3.eth.Contract(
            History.abi,
            deployedNetwork && deployedNetwork.address,
        );

        let name = ethers.utils.formatBytes32String(req.body.name);
        let groupName = ethers.utils.formatBytes32String(req.body.groupName);
        let accountNumber = ethers.utils.formatBytes32String(req.body.accountNumber);
        let accounts = parseInt(req.body.accounts, 10); //10진수
        let useHistory = ethers.utils.formatBytes32String(req.body.useHistory);
        let date = ethers.utils.formatBytes32String(req.body.date);

        await contract.methods.transfer(name, groupName, accountNumber, accounts, useHistory, date).send({ from: account[0], gas: 2000000 }).then(result => {
            console.log(result);
        });
        res.json({ result: "가즈아" })
    } catch (error) {
        console.error(error);
        res.send({ msg: error.message });
    }
});

router.get("/search", async function (req, res) {

    let groupName = req.params.groupName
    let object = await contract.methods.search(groupName).send({ from: account[0], gas: 200000 }).then(result => {
    });
    res.json({
        result: object
    })
})

module.exports = router;

