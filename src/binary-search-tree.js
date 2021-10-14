const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
      this.data = data; // node value
      this.left = null;   // left node child reference
      this.right = null; // right node child reference
  }
}

module.exports = class BinarySearchTree {
  constructor() {
    this.treeRoot = null; // корень bst
  }
  root() {
    return this.treeRoot
  }

  add(data) {
    const newNode = new Node(data)
    if (this.treeRoot === null) {
      this.treeRoot = newNode
    } else {
      this.insertNode(this.treeRoot, newNode)
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  
  findNode(node, data) {
    if(data === undefined) {
      return null
    }
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.findNode(node.left, data);
    } else if (data > node.data) {
      return this.findNode(node.right, data);
    } else {
      return node;
    }
  }

  has(data) {
    if (this.treeRoot === null) {
      return false
    } else {
      return this.findNode(this.treeRoot, data) ? true : false
    }
  }
  find(data) {
    return this.findNode(this.treeRoot,data)
  }

  remove(data) {
    this.treeRoot = this.removeNode(this.treeRoot, data); // helper method below
  } 
  removeNode(node, data) {
    if (node === null) {
        return null;
    // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
    // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
        return node;
    // если данные такие как данные корня, удаляем узел
    } else {
        // удаляем узел без потомков (листовой узел (leaf) или крайний)
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        // удаляем узел с одним потомком
        if (node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }
        // удаляем узел с двумя потомками
        // minNode правого поддерева хранится в новом узле
        let newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
    }
  }

  minNode(node = this.treeRoot) {
    if(node.left === null) {
      return node
    } else {
      return this.minNode(node.left)
    }
  }
  maxNode(node = this.treeRoot) {
    if(node.right === null) {
      return node
    } else {
      return this.maxNode(node.right)
    }
  }

  min(){
    return this.minNode().data
  }
  max(){
    return this.maxNode().data
  }

}