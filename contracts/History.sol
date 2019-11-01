pragma solidity ^0.5.0;
//이력 관리용 계약. (OwnerManagement의 기능 사용을 위해 상속)
contract History {
  
  bytes32 name; //후원자이름
  bytes32 groupName; //동아리이름
  bytes32 accountNumber; //계좌번호
  uint accounts; //금액 (후원금(+), 지출금(-))
  bytes32 useHistory; //사용내역
  bytes32 date; //날짜

  //send()
  function transfer(bytes32 _name, bytes32 _groupName, bytes32 _accountNumber, uint _accounts, bytes32 _useHistory, bytes32 _date) public {
    name = _name;
    groupName = _groupName;
    accountNumber = _accountNumber;
    accounts = _accounts;
    useHistory = _useHistory;
    date = _date;
  }

  //call()
  function get() view public returns (bytes32, bytes32, bytes32, uint, bytes32, bytes32) {
    //constant나 view로 되어있으면 블록에 저장 안됨.(읽기만 가능)
    return (name, groupName, accountNumber, accounts, useHistory, date); 
  }

}