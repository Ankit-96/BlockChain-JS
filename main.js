const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", {name: "Genesis block", amount: 10}, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let coin = new Blockchain();
coin.addBlock(new Block(1, "20/07/2017",  {name: "Ankit", amount: 20 }));
coin.addBlock(new Block(2, "20/07/2017", { name: "Ananya",amount: 40 }));

console.log(JSON.stringify(coin, null, 4));

/*
console.log("\n"+'Before tampering with a block...');
console.log(coin.chain[1].hash = coin.chain[1].calculateHash());
console.log('Blockchain valid? ' + coin.isChainValid()+"\n");
console.log(JSON.stringify(coin, null, 4));


coin.chain[1].data = { amount: 100 };

console.log("After tampering with a block");
console.log(coin.chain[1].hash = coin.chain[1].calculateHash());
console.log("Blockchain valid? " + coin.isChainValid()+"\n");
//console.log(JSON.stringify(coin, null, 4));
*/