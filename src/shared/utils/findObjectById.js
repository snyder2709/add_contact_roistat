export function findObjectById(data, id) {
  let result = null;

  function traverse(node) {
    if (node.director && node.director.value === id) {
      result = node;
      return;
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
        if (result) {
          break;
        }
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    traverse(data[i]);
    if (result) {
      break;
    }
  }

  return result;
}
