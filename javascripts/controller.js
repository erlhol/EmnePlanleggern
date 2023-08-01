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
            const courseOject = allCourses[i];
            courseDiv.addEventListener("click", () => {
                if (courseDiv.classList.contains("chosen")) {
                    this.model.removeItemFromSelected();
                    this.model.decrementTotalCredits(courseOject);

                    this.view.renderNotChosen(courseDiv);
                    this.view.renderRemoveFromSelectedCourses(courseOject);
                    this.view.renderRemoveActivites(courseOject);
                    this.view.renderSetTotalCredits(this.model.total_credits);
                } else {
                    this.model.addToSelected(courseOject);
                    this.model.incrementTotalCredits(courseOject); 
                    
                    this.view.renderChosen(courseDiv);
                    this.view.renderSelectedCourse(courseOject);
                    this.view.renderAddCourseActivites(courseOject);
                    this.view.renderSetTotalCredits(this.model.total_credits);
                }
            });
        });
    } 
}
