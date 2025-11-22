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

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
myTree.insert(10);
prettyPrint(myTree.root)

