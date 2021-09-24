class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction{

  get value() {
    return this.amount;
  }
  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(4999, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 100...');
const t3 = new Withdrawal(100, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);
