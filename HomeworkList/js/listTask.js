function Node(value, prev, next) {
  this.value = value;
  this.prev = prev;
  this.next = next;
}

function LinkedList() {
  this.front = null;
  this.end = null;

  this.length = 0;//for count() function 
}

LinkedList.prototype = {
  count: function () {
    return this.length;
  },

  push: function (value) {
    let addingNode = new Node(value, this.end, null);
    if (this.end === null) {//empty list
      this.front = addingNode;
      this.end = addingNode;
    } else {
      this.end.next = addingNode;
      this.end = addingNode;
    }

    this.length++;
    return this.length;//The push() method returns the new length.
  },

  pop: function () {
    let poppedNodeValue;
    if (this.end === null) {
      console.log("Can't pop. No element in list.");
      return;
    } else {
      poppedNodeValue = this.end.value;
      this.end = this.end.prev;
      if (this.end === null) {//we have 1 node 
        this.front = null;
      } else {
        this.end.next = null;
      }
    }

    this.length--;
    return poppedNodeValue;//The pop() method returns the removed element.
  },

  unshift: function (value) {
    let addingNode = new Node(value, null, this.front);
    if (this.front === null) {
      this.front = addingNode;
      this.end = addingNode;
    } else {
      this.front.prev = addingNode;
      this.front = addingNode;
    }

    this.length++;
    return this.length;//The unshift() method returns the new length.
  },

  shift: function () {
    let shiftedNodeValue;
    if (this.front === null) {
      console.log("Can't shift. No element in list.");
      return;
    } else {
      shiftedNodeValue = this.front.value;
      this.front = this.front.next;
      if (this.front === null) {//we have 1 node 
        this.end = null;
      } else {
        this.front.prev = null;
      }
    }

    this.length--;
    return shiftedNodeValue;//The shift() method returns the removed element.
  },

  delete: function (value) {
    if (this.count() === 0) {
      console.log("List is empty.");
      return;
    }

    let currentNode = this.front;
    for (let i = 1; i <= this.count(); i++) {
      if (currentNode.value === value) {//we have such element in list -> must be deleted
        let leftNode = currentNode.prev; //pointer to Left Node in node that will be deleted
        let rightNode = currentNode.next;//pointer to Right Node in node that will be deleted

        if (leftNode === null && rightNode === null) {
          //we have 1 node
          this.front = null;
          this.end = null;
        } else if (leftNode === null && rightNode !== null) {
          //must be deleted first node
          this.front = rightNode;
          rightNode.prev = null;
        } else if (leftNode !== null && rightNode === null) {
          //must be deleted last node
          this.end = leftNode;
          leftNode.next = null;
        } else {
          leftNode.next = rightNode;
          rightNode.prev = leftNode;
        }

        this.length--;
        console.log("Node was deleted.");
        return this;//will return list
      } else {
        currentNode = currentNode.next;
      }
    }

    console.log("No such element in list.");
    return this;//will return list
  },

  insert: function (index, value) {//let suppose that our LinkedList has indexes
    //in place [index] node will be added in node with [value]
    if (index > this.count() + 1) {
      console.log(`Your list no such big.List length is ${this.count()}.`);
      return this;
    }

    if (index === 0) {
      this.unshift(value);
      return this;
    }

    if (index === this.count() + 1) {
      this.push(value);
      return this;
    }

    let currentNode = this.front;
    for (let i = 1; i < index; i++) {
      currentNode = currentNode.next;
    }//after the loop the next of the currentNode must be added a newNode
    //... <-> [currentNode] <-> [newNode] <-> [currentNode.next] <-> ...
    let newNode = new Node(value, currentNode, currentNode.next);

    let nextNodeAfterAdded = currentNode.next;
    currentNode.next = newNode;
    nextNodeAfterAdded.prev = newNode;

    this.length++;
    return this;
  },

  printList: function () {
    let array = [];
    let currentNode = this.front;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array.join(' <--> '));
    return this;
  }

}



let list = new LinkedList();
list.push(7);
list.push(77);
list.push(777);
list.unshift(888);
console.log(list.printList());
