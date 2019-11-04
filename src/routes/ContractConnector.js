const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const History = require("../../build/contracts/History.json");
const Web3 = require("web3");
let web3 = new Web3();
let account = null;
let contract = null;

router.get('/', async function (req, res) {
    let group = req.query.group;
    console.log("check!! ",group);
        
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
                //console.log(ethers.utils.parseBytes32String(contract_info.groupName[i]));
                //console.log(group);
                //console.log("다르다 체크");
            } else {
                nameResult.push(ethers.utils.parseBytes32String(contract_info.name[i]));
                groupResult.push(ethers.utils.parseBytes32String(contract_info.groupName[i]));
                accountNumResult.push(ethers.utils.parseBytes32String(contract_info.accountNumber[i]));
                accountsResult.push(contract_info.accounts[i]);
                historyResult.push(ethers.utils.parseBytes32String(contract_info.useHistory[i]));
                dateResult.push(ethers.utils.parseBytes32String(contract_info.date[i]));
            }

            if (i === contract_info.date.length) {
                //console.log("마지막 체크")
            } else if (contract_info.date[i] === contract_info.date[i + 1]) {
                i++;
            } else {
                //console.log("나오는게 맞음 ㅎㅎ");
            }
        }

        //ethers.utils.parseBytes32String
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
    // to do (13시 30분 이후) role이 group인 session만 해당 기능 실행 가능하게 로직짜기

    //console.log(req.body);
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:7545')); //가나슈 네트워크 
        account = await web3.eth.getAccounts();
        //console.log(account)
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

        //console.log(name, groupName, accountNumber, accounts, useHistory, date)
        //console.log(account[0])

        await contract.methods.transfer(name, groupName, accountNumber, accounts, useHistory, date).send({ from: account[0], gas: 2000000 }).then(result => {
            console.log(result);
        });

        // 하나의 거래에 대한 결과값만 주고 받은거죠
        // 모든 거래 내역 중에 특정 동아리에 대한 거래내역을 가져와야되죠

        // let raw_info = await contract.methods.search().call();
        // let contract_info={
        //     name:raw_info[0], 
        //     groupName:raw_info[1], 
        //     accountNumber:raw_info[2], 
        //     accounts:raw_info[3], 
        //     useHistory:raw_info[4], 
        //     date:raw_info[5]
        // };
        // // console.log(contract_info)

        // // date에 정보 다 담김 // let _name, _groupName, _accountNumber, _accounts, _useHistory, _date = await contract.methods.get().call();

        // // return (_name, _groupName, _accountNumber, _accounts, _useHistory, _date)
        // //res.send({ msg: _use });

        // contract_info.name = ethers.utils.parseBytes32String(contract_info.name);
        // contract_info.groupName = ethers.utils.parseBytes32String(contract_info.groupName);
        // contract_info.accountNumber = ethers.utils.parseBytes32String(contract_info.accountNumber);
        // contract_info.useHistory = ethers.utils.parseBytes32String(contract_info.useHistory);
        // contract_info.date = ethers.utils.parseBytes32String(contract_info.date);
        // console.log(contract_info);
        // //ethers.utils.parseBytes32String
        // res.json({contract_info : contract_info}); //{key:value} 형식으로 하면 객체 불러오는 쪽에서 key.value로 데이터 가져오기 가능
        res.json({ result: "가즈아" })

    } catch (error) {
        console.error(error);
        res.send({ msg: error.message });
    }
});


router.get("/search", async function (req, res) {

    let groupName = req.params.groupName
    let object = await contract.methods.search(groupName).send({ from: account[0], gas: 200000 }).then(result => {
        //console.log(result)
    });

    console.log("맞아야")
    res.json({
        result: object
    })

})

// renew biology candy crime twin diesel round latin mule spare media trap

module.exports = router;

