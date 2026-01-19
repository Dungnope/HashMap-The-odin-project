import { LinkedList, Node } from "./linkedlist.js";

class HashMap{
    constructor(capacity, load_factor){
        this.load_factor = load_factor === undefined ? 0.75 : load_factor;
        this.capacity = capacity === undefined ? 10 : capacity;
        this.container = Array(this.capacity).fill(null);
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        if(typeof(key) === "number"){
            for (let i = 0; i < key; i++) {
                hashCode = (primeNumber * hashCode + key) % this.capacity;
            }

        }
        else if(typeof(key) === 'string'){
            // s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
            for(let i = 0; i < key.length; i++){
                hashCode += (key.charCodeAt(i)*31**(key.length - (i+1))); // take from java ulti libs
            }
            hashCode %= this.capacity;
        }

        return hashCode;
    }

    set(key, value){
        let index = this.hash(key);
        
        if(this.container[index] === null){
            this.container[index] = new LinkedList(value, key);
        }

        else if(this.container[index] !== null){

            //resolve collision
            if(this.container[index].root.key === key){
                const traverseNode = this.container[index].root
                while(traverseNode.key !== key){
                    traverseNode = traverseNode.next;
                }
                traverseNode.data = value;
            }
            else{
                this.container[index].append(value, key);
            }
        }
    }

    get(key){
        let index = this.hash(key);
        let checkItem = this.container[index].root;
        while(checkItem.key !== key && checkItem !== null){
            checkItem = checkItem.next;
        }
        
        if(checkItem === null) return null;
        return checkItem.data;
    }

}

const test = new HashMap(10, 0.75);

test.set("100", 23);
test.set("231", 45);
test.set("123", 69);
// console.log(test.get("21"));