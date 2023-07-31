export default class Model {
    constructor() {
      this.data = [];
    }
  
    // Example methods for manipulating data
    addItem(item) {
      this.data.push(item);
    }
  
    removeItem(index) {
      this.data.splice(index, 1);
    }
}