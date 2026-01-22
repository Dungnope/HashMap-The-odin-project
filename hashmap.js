import { LinkedList} from "./linkedlist.js";

class HashMap{
    #capacity;
    #load_factor;
    #container;
    constructor(capacity, load_factor){
        this.#load_factor = load_factor === undefined ? 0.75 : load_factor;
        this.#capacity = capacity === undefined ? 16 : capacity;
        this.#container = Array(this.#capacity).fill(null);
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        if(typeof(key) === "number"){
            for (let i = 0; i < key; i++) {
                hashCode = (primeNumber * hashCode + key) % this.#capacity;
            }

        }
        else if(typeof(key) === 'string'){
            // s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
            for(let i = 0; i < key.length; i++){
                hashCode += (key.charCodeAt(i)*31**(key.length - (i+1))); // take from java ulti libs
                // hashCode = primeNumber * hashCode + key.charCodeAt(i);
                hashCode %= this.#capacity;
            }
        }

        return hashCode;
    }
    

    set(key, value){
        //calculate grow percentage
        if((this.#capacity * this.#load_factor - this.length()) < 1){ 
            this.#capacity *= 2;
            let entries = this.entries();
            this.#container = Array(this.#capacity).fill(null);
            for(let i = 0; i < entries.length; i++){
                this.set(entries[i][0], entries[i][1]);
            }
        }
        
        let index = this.hash(key);

        if(index >= this.length()) index = Math.floor(Math.random() % this.length());
        
        if(this.#container[index] === null){
            this.#container[index] = new LinkedList(value, key);
        }

        else if(this.#container[index] !== null){

            //resolve collision
            if(this.#container[index].root.key === key){
                const traverseNode = this.#container[index].root;

                //traverse the node until the last node
                while(traverseNode.key !== key){
                    traverseNode = traverseNode.next;
                }
                traverseNode.data = value;
            }
            else{
                this.#container[index].append(value, key);
            }
        }


    }

    get(key){
        let index = this.hash(key);
        if(this.#container[index] === null) return null;
        let checkItem = this.#container[index].root;
        while(checkItem !== null){
            if(checkItem.key === key) return checkItem.data;
            checkItem = checkItem.next;

        }

        return null;
    }

    //check key exist on hashmap
    has(key){
        if(this.get(key) !== null) return true;
        return false;
    }

    remove(key){
        if(this.has(key)){
            let idx = this.hash(key);
            if(this.#container[idx] === null){
                return false;
            }

            let traverseNode = this.#container[idx];
            //get idx of the item from the list of bucket
            let bucketIdx = traverseNode.findIndex(key);
            traverseNode.removeAt(bucketIdx);
            if(traverseNode.root === null) this.#container[idx] = null;
            return true;
        }
        else return false;
    }

    length(){
        let ans = 0;
        for(let i = 0; i < this.#container.length; i++){
            if(this.#container[i] === null) continue;
            ans += this.#container[i].size();
        }
        return ans;
    }

    clear(){
        for(let i = 0; i < this.#container.length; i++){
            if(this.#container[i] === null) continue;
            this.#container[i] = null;
        }
    }

    printProperty(property){
        let ans = [];
        for(let i = 0; i < this.#container.length; i++){
            if(this.#container[i] !== null){
                let traverseNode = this.#container[i].root;
                while(traverseNode !== null){
                    ans.push(traverseNode[`${property}`]);
                    traverseNode = traverseNode.next;
                }
            }
        }
        return ans;
    }

    keys(){
        return this.printProperty('key');
    }

    values(){
        return this.printProperty('data');
    }

    entries(){
        let keys = this.keys();
        let values = this.values();
        let ans = [];
        for(let i = 0; i < this.length(); i++){
            let pair = [];
            pair.push(keys[i], values[i]);
            ans.push(pair);
        }
        return ans;
    }

}

export {HashMap}