export default class CourseView {
    constructor() {
        this.selectedItems = document.getElementById('selected-courses');
        this.courseContainer = document.getElementById('course-container');
        this.totalCredits = document.getElementById("total-credits");
        this.searchInput = document.getElementById("mySearchInput");
    }

    async renderAllCourses(subjectsPromise) {
        try {
            const subjects = await subjectsPromise;
            /* Render all courses */
            subjects.forEach(courseObject => {
                this.renderCourse(courseObject);
            });
        } catch (error) {
            // Handle the error if the promise is rejected
            console.error('Error fetching subjects:', error);
        }
    }
  
    renderCourse(courseObject) {
        /* Render one course */
        
        // Create a new <div> element with the class "course"
        var newCourseDiv = document.createElement("div");
        newCourseDiv.className = "course";

        newCourseDiv.setAttribute('id', courseObject.code+"r"); // r for render

        // Create and append the <h1> element for the course title
        var courseTitle = document.createElement("h1");
        courseTitle.textContent = courseObject.code;
        newCourseDiv.appendChild(courseTitle);

        // Create and append the first <p> element for the course details
        var courseDetails = document.createElement("p");
        courseDetails.innerHTML =
            `<span style="color: #ff5722;">Level:</span> ${courseObject.level} | ` +
            `<span style="color: #ff5722;">Credits:</span> ${courseObject.credits} | ` +
            `<span style="color: #ff5722;">Teaching:</span> ${courseObject.teaching} | ` +
            `<span style="color: #ff5722;">Examination:</span> ${courseObject.examdate} | ` +
            `<span style="color: #ff5722;">Teaching language:</span> ${courseObject.teachingLanguage}`;
        newCourseDiv.appendChild(courseDetails);

        // Create and append the second <p> element for the course description
        var courseDescription = document.createElement("p");
        courseDescription.textContent = courseObject.about;
        newCourseDiv.appendChild(courseDescription);

        // Append the new course <div> to the body of the document
        this.courseContainer.appendChild(newCourseDiv);
    }
    
    renderSelectedCourse(courseObject) {
        /*Adds the subject to the list of chosen subjects */
        var subject = document.createElement("div");
        subject.classList.add("shown_subject");
        subject.innerHTML = `
            <h3>${courseObject.code}</h3>
        `;

        for (let i = 0; i < 10; i++) {
            subject.innerHTML += `
                <button>Button ${i + 1}</button>
            `;
        }

        subject.setAttribute('id', courseObject.code+"s"); // s for selected

        /* Add delete button */
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", () => this.renderRemoveFromSelectedCourses(courseObject) );
        subject.appendChild(deleteButton);
        this.selectedItems.appendChild(subject);
    }

    async renderSearchedCourses(searched) {

        /* First set all courses to invisible */
        Array.from(this.courseContainer.children).forEach(element => {
            element.style.display = 'none';
        });
        try {
            
            const searched_subjects = await searched;
            /* Render the searched courses */
            searched_subjects.forEach(courseObject => {
                const subject = document.getElementById(courseObject.code+"r");
                subject.style.display = 'block';
            });
            
        } catch (error) {
            // Handle the error if the promise is rejected
            console.error('Error fetching subjects:', error);
        }
    }

    renderRemoveFromSelectedCourses(courseObject) {
        /* Removes the subject from the list of chosen subjects */
        const elementToRemove = document.getElementById(courseObject.code+"s");
        elementToRemove.remove();
        /* Make this more seamless
        When this procedure is called, should also remove the highlighting 
        Find the correct div, and remove the highlighting*/
    }

    renderRemoveActivites(courseObject) {
        /* Iterates over all activites for the course and removes it from the calendar */
        /*
        courseObject.courseActivities.forEach(activity => {
            var weekday = activity.weekday;
            var time = activity.time;
            var scheduleContainer = document.getElementById(weekday+"-"+time);
            if (scheduleContainer) {
                scheduleContainer.innerHTML = "";
            } else {
                console.error("Element not found:", weekday + "-" + time);
            }
        });
        */
    }

    renderAddCourseActivites(courseObject) {
        /* Iterates over all activites for the course and adds it to the calendar */
        /*
        courseObject.courseActivities.forEach(activity => {
            var weekday = activity.weekday;
            var time = activity.time;
            var scheduleContainer = document.getElementById(weekday+"-"+time);
            if (scheduleContainer) {
                const activityElement = document.createElement("div");
                activityElement.classList.add("activity");
                if (activity.type === "Lecture") {
                    activityElement.classList.add("lecture");
                } else if (activity.type === "Tutorial") {
                    activityElement.classList.add("tutorial");
                }
    
                activityElement.innerHTML = `
                    <h3>${activity.name}</h3>
                    <h4>${courseObject.code}</h4>
                    <p>${activity.weekday} ${activity.time}</p>
                    <p>${activity.place}</p>
                `;
    
                scheduleContainer.appendChild(activityElement);
            } else {
            console.error("Element not found:", weekday + "-" + time);
            }
        });
        */
    }

    renderSetTotalCredits(credits) {
        /* Sets the new total credits */
        this.totalCredits.innerHTML = `<h3>Total number of credits: ${credits}</h3>`
    }

    renderChosen(courseDiv) {
        /* Update the class so the subject will be reflected as chosen in CSS */
        courseDiv.classList.remove("not-chosen");
        courseDiv.classList.add("chosen");
    }
    
    renderNotChosen(courseDiv) {
        /* Update the class so the subject will be reflected as not chosen in CSS */
        courseDiv.classList.remove("chosen");
        courseDiv.classList.add("not-chosen");
    }
}