class Account {
  static dataMap = [];
  #accoutnName;
  #balance;
  constructor(accoutnName, balance) {
    this.#accoutnName = accoutnName;
    this.#balance = balance;
  }

  getAccoutnName() {
    return this.#accoutnName;
  }

  getBalance() {
    return this.#balance;
  }

  setBalance(balance) {
    this.#balance = balance
  }
}


document.getElementById("lowerContainer").style = "display:none";

function addData() {
  const accountName = document.getElementById("accountName").value;

  const amount = document.getElementById("amount").value;

  if (isNaN(amount)) {
    alert("Please enter the number");
    return true;
  }

  if (typeof accountName !== "string") {
    alert("please enter the valid account name");

    return;
  }

  let data = Account.dataMap.find(it => it.getAccoutnName() == accountName)
  if(data) {
    alert('account already existed')
    return true
  }

  Account.dataMap.push(new Account(accountName, amount));
document.getElementById("accountName").value = ''

document.getElementById("amount").value = ''
  updateData();
}

function updateData() {
  let data = Account.dataMap
    .map(
      (it) =>
        `Account Name: ${it.getAccoutnName()} Balance: ${it.getBalance()}\n`
    )
    .join(" ");
  document.getElementById("bankData").value = data;
}

function deposit(type) {

    document.getElementById("lowerContainer").style = "display:display";
    document.getElementById("upperContainer").style = "display:none";

    document.getElementById('debitcreditamount').value=''
  

  document.getElementById("txType").value = type;

  let test = `<select id="accoutList">`;

    test+= `<option value=${null}>Select Account List</option>`

  test += Account.dataMap.map(
    (it) =>
      `<option value=${it.getAccoutnName()}> ${it.getAccoutnName()} </option>`
  );

  test += `<select/>`;

  document.getElementById("dropdown").innerHTML = test;
}

function makeTransaction() {
  const selectedValue = document.getElementById("accoutList").value;
    if(selectedValue === null || selectedValue ==='null') {
        alert('please select account ')
        return true
    }
  const amount = document.getElementById("debitcreditamount").value;
  console.log("====ddd",amount)
    if(amount==="" || isNaN(amount) ||  parseFloat(amount)<=0) {
      alert('Please enter amount')
      return true
    }

  const txType = document.getElementById("txType").value

  Account.dataMap = Account.dataMap.map((it) => {

    if(it.getAccoutnName() === selectedValue) {
        if(txType ==='debit'){
            let deductedAmount =parseFloat(it.getBalance())-parseFloat(amount)
            if(deductedAmount< 0) {
                alert(`You don't have a sufficient amount`)
                return true
            }else{
                it.setBalance(parseFloat(it.getBalance())-parseFloat(amount))
            }
         
        }else{
            it.setBalance(parseFloat(amount)+parseFloat(it.getBalance()))
        }
        return it
    }
    
return it
  });

  document.getElementById("lowerContainer").style = "display:none";
  document.getElementById("upperContainer").style = "display:display";

  updateData()
}
