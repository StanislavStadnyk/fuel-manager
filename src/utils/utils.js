function unflatten(arr) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
   
    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0; i < arr.length; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = Object.assign({}, arrElem);
        mappedArr[arrElem.id]['childNodes'] = [];
    }
    
    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.parentId) {
                mappedArr[mappedElem['parentId']]['childNodes'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    
    return tree;
}

export default unflatten;