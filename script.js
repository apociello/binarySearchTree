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

// Function to use as callback in levelOrderForEach(callback)
function printData(node) {
  console.log(node.data);
}


const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(myTree.root);
myTree.levelOrderForEach(printData);


