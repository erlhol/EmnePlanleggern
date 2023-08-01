export default class CourseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderAllCourses(this.model.allCourses);
        this.view.renderSetTotalCredits(this.model.total_credits);

        const courseArray = this.view.courseContainer.childNodes;
        courseArray.forEach((courseDiv, i) => {
            const courseOject = this.model.allCourses[i];
            courseDiv.addEventListener("click", function() {
                if (courseDiv.classList.contains("chosen")) {
                    this.view.renderNotChosen(courseDiv);
                    
                    this.model.removeItemFromSelected();
                    this.model.incrementTotalCredits(courseOject); // but with - as parameter (decrement)

                    this.view.renderRemoveFromSelectedCourses(courseOject);
                    this.view.renderRemoveActivites(courseOject);
                    
                    this.view.renderSetTotalCourses(this.model.total_credits);
                  } else {
                    this.view.renderChosen(courseDiv);
                    
                    this.model.addToSelected(courseOject);
                    this.model.decrementTotalCredits(courseOject);
                    
                    this.view.renderSelectedCourse(courseOject);
                    this.view.renderAddCourseActivites(courseOject);

                    this.view.renderSetTotalCourses(this.model.total_credits);
                  }
                });
        })
    } 
}
  