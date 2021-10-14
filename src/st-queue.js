const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {

  constructor() {
    this.queue = {}
  }
  createNewNode(x) {
    class List {
      constructor(value) {
        this.value = x
        this.next = null
      }
    }
    return new List(x)
  }

  getUnderlyingList() {
    return this.queue
  }

  enqueue(value) {
    const newNode = this.createNewNode(value)
    if (Object.keys(this.queue).length == 0) {

      this.queue = Object.assign(this.queue,newNode)
    } else {
      this.findLatest(this.queue).next = newNode
    }
  }
  findLatest(node){
    if(node.next === null) {
      return node
    } else {
      return this.findLatest(node.next)
    }
  }
  dequeue() {
    if (Object.keys(this.queue).length !== 0) {
      const value = this.queue.value
      this.queue = Object.assign(this.queue,this.queue.next)
      return value
    }
  }
}
