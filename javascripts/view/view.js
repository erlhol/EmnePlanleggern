export default class CourseView {
    constructor() {
        this.app = document.getElementById('app');
    }
  
    render(data) {
        this.app.innerHTML = '';
        data.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `${index + 1}. ${item}`;
            this.app.appendChild(itemElement);
        });
    }
  }