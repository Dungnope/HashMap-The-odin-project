class Node{
    constructor(data, key){
        this.data = data === undefined ? null : data;
        this.key = key;
        this.next = null;
    }
}

class LinkedList{
    constructor(value, key){
        this.root = new Node(value, key);
    }

    //check blank list
    checkBlank(){
        return this.root.data === null ? true : false;
    }
    
    //add new node at the end of list
    append(data, key){
        if(this.checkBlank()){
            this.root = new Node(data, key);
        }
        else{
            let tmp = this.root;
            while(tmp.next !== null) tmp = tmp.next; 

            tmp.next = new Node(data, key);
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

// const test = new LinkedList();

// //add node to the end of list test
// test.append("dog");
// test.append("cat");
// test.append("parrot");
// test.append("hamster");
// test.append("snake");
// test.append("turtle");
// test.insertAt(2, "mouse");

// //test convert linkedlist to string
// console.log(test.toString());

// test.removeAt(3); // test remove at position
// console.log(test.toString());

export {LinkedList};
