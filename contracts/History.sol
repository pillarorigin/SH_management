pragma solidity ^0.5.0;

contract History {
  
  bytes32 name; //후원자이름
  bytes32 groupName; //동아리이름
  bytes32 accountNumber; //계좌번호
  uint16 accounts; //금액 (후원금(+), 지출금(-))
  bytes32 useHistory; //사용내역
  bytes32 date; //날짜

  bytes32[] nameArray; //후원자이름 배열(리스트)
  bytes32[] groupArray; //동아리이름 배열(리스트)
  bytes32[] accountNumArray; //계좌번호 배열(리스트)
  uint16[] accountsArray; //금액 배열
  bytes32[] historyArray; //사용내역 배열
  bytes32[] dateArray; //날짜 배열

  // bytes32[] nameResult;
  // bytes32[] groupResult;
  // bytes32[] accountNumResult;
  // uint16[] accountsResult;
  // bytes32[] historyResult;
  // bytes32[] dateResult;

  //send()
  function transfer(bytes32 _name, bytes32 _groupName, bytes32 _accountNumber, uint16 _accounts, bytes32 _useHistory, bytes32 _date) public {
    name = _name;
    nameArray.push(name);
    groupName = _groupName;
    groupArray.push(groupName);
    accountNumber = _accountNumber;
    accountNumArray.push(accountNumber);
    accounts = _accounts;
    accountsArray.push(accounts);
    useHistory = _useHistory;
    historyArray.push(useHistory);
    date = _date;
    dateArray.push(date);
  }

  // function search(bytes32 _name) public returns (bytes32[] memory, bytes32[] memory, bytes32[] memory, uint16[] memory, bytes32[] memory, bytes32[] memory){
  //   delete nameResult;
  //   delete groupResult;
  //   delete accountNumResult;
  //   delete accountsResult;
  //   delete historyResult;
  //   delete dateResult;

  //   for(uint i=0; i<nameArray.length; i++){
  //     if(_name == nameArray[i]){
  //       nameResult.push(nameArray[i]);    
  //       groupResult.push(groupArray[i]);
  //       accountNumResult.push(accountNumArray[i]);
  //       accountsResult.push(accountsArray[i]);
  //       historyResult.push(historyArray[i]);
  //       dateResult.push(dateArray[i]);
  //     }
  //   }
  //   return (nameResult, groupResult, accountNumResult, accountsResult, historyResult, dateResult);

  // }

  //call()
  function get() view public returns (bytes32[] memory, bytes32[] memory, bytes32[] memory, uint16[] memory, bytes32[] memory, bytes32[] memory) {
    //constant나 view로 되어있으면 블록에 저장 안됨.(읽기만 가능)
    return (nameArray, groupArray, accountNumArray, accountsArray, historyArray, dateArray); 
  }

}