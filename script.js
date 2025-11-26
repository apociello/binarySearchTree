class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
        return;
    }

    insert(value) {
      if (this.root === null) {
        this.root = new Node(value);
      }

      let current = this.root;
      let parent; 
      while(current != null) {

        if (current.data > value) {
          parent = current;
          current = current.left;
        } else if(current.data < value) {
          parent = current;
          current = current.right;
        } else {
          return;
        }
      }
      
      if (parent.data > value) parent.left = new Node(value);
      else parent.right = new Node(value);
    }
    
    deleteItem(value) {
      let current = this.root;
      let parent;

      while(current != null && current.data != value) {
        if (current.data > value) {
          parent = current;
          current = current.left;
        } else {
          parent = current;
          current = current.right;
        } 
      }

      if (current == null) return;

      if (current.left == null && current.right == null) {
        // leaf (no child)
          if (parent.data > value) parent.left = null;
          else parent.right = null;
      } else if (current.left != null && current.right == null) {
        // node with left child
          if (parent.data > value) parent.left = current.left;
          else parent.right = current.left;
      } else if (current.left == null && current.right != null) {
          // node with right child
          if (parent.data > value) parent.left = current.right;
          else parent.right = current.right;
      } else {
        // node with 2 child
        const nodeToDelete = current;
        parent = current;
        current = current.right; 

        while( current.left != null) {
          parent = current;
          current = current.left;
        }
        
        nodeToDelete.data = current.data;
        if (nodeToDelete == parent) {
          nodeToDelete.right = current.right;
        } else {
          parent.left = current.right;
        }
        
      }  


    }

    find(value) {
      if (this.root === null) return;

      let current = this.root;
      while(current.data != value) {

        if (current.data > value) {
          current = current.left;
        } else if(current.data < value) {
          current = current.right;
        } else {
          return;
        }

        if (current == null) return;
      }

      return current;
    }

    levelOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("A callback function is required")
      }

      if (this.root === null) return;
      let queue = [];
      queue.push(this.root);

      while(queue.length > 0) {
        let current = queue.shift();
        callback(current);

        if(current.left != null) queue.push(current.left);
        if(current.right != null) queue.push(current.right);

      }
    }

    preOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("A callback function is required")
      }
      
      function preOrder(currentNode) {
        if (currentNode === null) return;
        callback(currentNode);
        preOrder(currentNode.left);
        preOrder(currentNode.right);
      }

      preOrder(this.root);
    }

    inOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("A callback function is required")
      }
      
      function inOrder(currentNode) {
        if (currentNode === null) return;
        inOrder(currentNode.left);
        callback(currentNode);
        inOrder(currentNode.right);
      }

      inOrder(this.root)
    }

    postOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("A callback function is required")
      }
      
      function postOrder(currentNode) {
        if (currentNode === null) return;
        postOrder(currentNode.left);
        postOrder(currentNode.right);
        callback(currentNode);
      }

      postOrder(this.root)
    }

    height(value) {
      const valueNode = this.find(value);
      if (!valueNode) return null;

      function computeHeight(node) {
        if (node === null) return -1;
        return 1 + Math.max(computeHeight(node.left), computeHeight(node.right));
      }

      return computeHeight(valueNode);

    }
    
    depth(value) {
      if (this.root === null) return;

      let current = this.root;
      let edges = 0;

      while(current.data != value) {
        if (current.data > value) {
          current = current.left;
          edges++;
        } else if(current.data < value) {
          current = current.right;
          edges++;
        }

        if (current == null) return null;
      }
      return edges;
    } 

    isBalanced() {
      function subtreeHeight(node) {
        if (node === null) return -1;
        return 1 + Math.max(subtreeHeight(node.left), subtreeHeight(node.right));
      }

      function recursive(node) {
        if (node === null) return 1;

        const leftHeight = subtreeHeight(node.left);
        const rightHeight = subtreeHeight(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return 0;
        if (recursive(node.left) === 0) return 0;
        if (recursive(node.right) === 0) return 0;

        return 1;
      }

      return recursive(this.root);
  }

  rebalance() {
    let values = [];

    this.inOrderForEach((node) => {
      values.push(node.data);
    });

    this.root = buildTree(values);
  }
    
}

function createBST(array, start, end) {
  if(start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = createBST(array, start, mid - 1);
    root.right = createBST(array, mid + 1, end);

    return root;
}

function buildTree(array) {
  const setArray = [...new Set(array)]
  const sortedArray = setArray.sort((a,b) => a - b);

  const root = createBST(sortedArray, 0, sortedArray.length - 1);
  return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Callback
function printData(node) {
  console.log(node.data);
}

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 33, 98]);
prettyPrint(myTree.root);