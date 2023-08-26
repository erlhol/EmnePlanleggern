export default class CourseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        await this.view.renderAllCourses(this.model.allCourses);
        this.view.renderSetTotalCredits(this.model.total_credits);
        const allCourses = await this.model.allCourses;
        
        Array.from(this.view.courseContainer.children).forEach((courseDiv, i) => {
            const courseObject = allCourses[i];
            this.view.renderSelectedCourseInit(courseObject);
            courseDiv.addEventListener("click", () => {
                if (courseDiv.classList.contains("chosen")) {
                    this.removeAction(courseObject,courseDiv);
                } else {
                    this.addAction(courseObject,courseDiv)
                }
            });
        });
        this.addRemoveActionToSelected(allCourses);
        this.addSearchEvent();
    }

    addSearchEvent() {
        const searchInput = this.view.searchInput;
        searchInput.addEventListener("input", async function(event) {
            const inputValue = searchInput.value; // Store the input value
            this.view.renderSearchedCourses(await this.model.searchForCourses(inputValue)); // Use the stored value
        }.bind(this)); // Bind the current context to the event listener function
    }

    async addRemoveActionToSelected(allCourses) {
        const selectedItems = await this.view.selectedItems;
        Array.from(selectedItems.children).forEach( (div, i) => {
            const courseObject = allCourses[i];
            const deleteButton = div.querySelector('button:last-child');
            const courseDiv = document.getElementById((div.id).slice(0, -1)+"r");
            deleteButton.addEventListener("click", () => this.removeAction(courseObject,courseDiv) );
        });
    }

    removeAction(courseObject,courseDiv) {
        this.model.removeItemFromSelected();
        this.model.decrementTotalCredits(courseObject);

        this.view.renderNotChosen(courseDiv);
        this.view.renderRemoveFromSelectedCourses(courseObject);
        this.view.renderRemoveActivites(courseObject);
        this.view.renderSetTotalCredits(this.model.total_credits);
    }

    addAction(courseObject,courseDiv) {
        this.model.addToSelected(courseObject);
        this.model.incrementTotalCredits(courseObject); 
                    
        this.view.renderChosen(courseDiv);
        this.view.renderSelectedCourse(courseObject);
        this.view.renderAddCourseActivites(courseObject);
        this.view.renderSetTotalCredits(this.model.total_credits);
    }
    
    
}
