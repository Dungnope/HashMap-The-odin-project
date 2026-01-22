class NodeSet{
    constructor(key){
        this.key = key === undefined ? null : key;
        this.next = null;
    }
}

class SetList{
    constructor(key){
        this.root = new NodeSet(key);
    }

    //check blank list
    checkBlank(){
        return this.root.data === null ? true : false;
    }
    
    //add new node at the end of list
    append(key){
        if(this.checkBlank()){
            this.root = new NodeSet(key);
        }
        else{
            let tmp = this.root;
            while(tmp.next !== null) tmp = tmp.next; 

            tmp.next = new NodeSet(key);
        }
    }

    //number node of list
    size(){
        let number = 0;
        let tmp = this.root;
        while(tmp !== null) 
        {
            number++
            tmp = tmp.next;
        }
        return number;
    }

    //the value of first node
    head(){

        if(this.checkBlank()) return undefined;

        return this.root.next.data;
        
    }

    //the value of last node
    tail(){
        if(this.checkBlank()) return undefined;

        let tmp = this.root;
        while(tmp.next !== null) tmp = tmp.next;
        return tmp.data;
    }

    //return data at index input
    at(index){ 
        let tmp = this.root;

        if(this.size() - 1 < index) return undefined;

        while(index && tmp !== null){
            tmp = tmp.next;
            index--;
        }
        
        return tmp !== null ? tmp.data : undefined;
    }

    //remove head node and return its value
    pop(){
        if(this.checkBlank()) return undefined;

        let ans = this.root;
        this.root = this.root.next;
        ans.next = null;
        return ans;
    }

    //return index of value if exist
    findIndex(key){
        if(this.checkBlank()) return -1;
        let index = 0;
        let tmp = this.root;
        while(tmp !== null){
            if(tmp.key === key) return index;
            tmp = tmp.next;
            index++;
        }

        return -1;
    }


    removeAt(index){
        if(index > this.size() - 1 || index < 0) return `RangeError`;

        //check whether index in head or tail
        if(index === 0){
            this.pop();
            return;
        }
        else if(index === this.size() - 1){
            let tmp = this.root;
            while(tmp.next.next !== null) tmp = tmp.next;
            tmp.next = null;
            return;
        }

        let tmp = this.root;
        while(index > 1){
            tmp = tmp.next;
            index--;
        }
        tmp.next = tmp.next.next;
    }
}

class HashSet{
   constructor(capacity, load_factor){
        this.load_factor = load_factor === undefined ? 0.75 : load_factor;
        this.capacity = capacity === undefined ? 16 : capacity;
        this.container = Array(this.capacity).fill(null);
    }

    set(key){
        //calculate grow percentage
        if((this.capacity * this.load_factor - this.length()) < 1){ 
            this.capacity *= 2;
            let keys = this.keys();
            this.container = Array(this.capacity).fill(null);
            for(let i = 0; i < keys.length; i++){
                this.set(keys[i]);
            }
        }
        
        let index = this.hash(key);
        
        if(this.container[index] === null){
            this.container[index] = new SetList(key);
        }

        else if(this.container[index] !== null){

            //resolve collision
            if(this.container[index].root.key === key){
                const traverseNode = this.container[index].root;

                //traverse the node until the last node
                while(traverseNode.key !== key){
                    traverseNode = traverseNode.next;
                }
                traverseNode.key = key;
            }
            else{
                this.container[index].append(key);
            }
        }
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
                // hashCode = primeNumber * hashCode + key.charCodeAt(i);
                hashCode %= this.capacity;
            }
        }
        if (hashCode < 0 || hashCode >= this.container.length) {
            throw new Error("Trying to access index out of bounds");
        }
        return hashCode;
    }

    //check key exist on hashmap
    has(key){
        if(this.container[this.hash(key)] !== null) return true;
        return false;
    }

    remove(key){
        if(this.has(key)){
            let idx = this.hash(key);
            if(this.container[idx] === null){
                return false;
            }

            let traverseNode = this.container[idx];
            //get idx of the item from the list of bucket
            let bucketIdx = traverseNode.findIndex(key);
            traverseNode.removeAt(bucketIdx);
            if(traverseNode.root === null) this.container[idx] = null;
            return true;
        }
        else return false;
    }

    length(){
        let ans = 0;
        for(let i = 0; i < this.container.length; i++){
            if(this.container[i] === null) continue;
            ans += this.container[i].size();
        }
        return ans;
    }

    clear(){
        for(let i = 0; i < this.container.length; i++){
            if(this.container[i] === null) continue;
            this.container[i] = null;
        }
    }

    printProperty(property){
        let ans = [];
        for(let i = 0; i < this.container.length; i++){
            if(this.container[i] !== null){
                let traverseNode = this.container[i].root;
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
}

export {HashSet};