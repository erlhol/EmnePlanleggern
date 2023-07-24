class Course {
    constructor(code, description, level= "", credits="", teaching="", examdate="", teachingLanguage = "",about="", courseActivities=null) {
      this.code = code;
      this.description = description;
      this.level = level; // Bachelor or Master
      this.credits = credits;
      this.teaching = teaching; // Spring or Autumn
      this.examdate = examdate;
      this.teachingLanguage = teachingLanguage;
      this.about = about;
      this.courseActivities = courseActivities;
    }
  
    introduce() {
      console.log(`The subject ${this.code} has the following description: ${this.description}.`);
    }

    toString() {
        return `Course { code: ${this.code}, description: ${this.description} }`;
    }
  }

class CourseActivity {
    constructor(name, time, weekday, place, type) {
        this.name = name; // for instance "Forelesning"
        this.time = time; // for instance "8AM"
        this.weekday = weekday; // for instance "mon"
        this.place = place; // for instance "Sophus Lie"
        this.type = type; // for instance Lecture or Tutorial (diffent color coding)
    }

    introduce() {
      console.log(`The activity ${this.name} starts ${this.weekday}-${this.time} at ${this.place}.`);
    }
}

function read_from_JSON() {
    /* Reads from the JSON file and creates the necessary objects */
    return fetch('data/subjects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          var array = data.map(e => {
            var activities = e.activities.map(activity => new CourseActivity(
                activity.name,
                activity.time,
                activity.weekday,
                activity.place,
                activity.type
            ));
            return new Course(
                e.subjectCode,
                e.subjectName,
                e.level,
                e.credits,
                e.teaching,
                e.examination,
                e.teachingLanguage,
                e.description,
                activities
            );
        });
        return array;
        })
        .catch(error => {
            console.log('Error:', error);
            throw error; // Propagate the error for the caller to handle
        });
}


var listContainer = document.getElementById("course-container");

var subjects = read_from_JSON();
subjects.then((value) => {
    // Handle the resolved value here
    generateListItems(0, value.length-1,value); // Generate initial list
  }).catch((error) => {
    // Handle any errors that occurred during the promise
    console.error(error);
  });

function generateListItems(start, end, subjects) {
    /* Generates all the subjects */
    listContainer.innerHTML = "";

    for (var i = start; i <= end; i++) {
        var listItem = subjects[i];
        addCourse(listItem, listContainer);
    }
}

function addCourse(courseObject,courseContainer) {
    /* Add courseObject to the list of courses */

    var selectedItems = document.getElementById("selected-courses");
    // Create a new <div> element with the class "course"
    var newCourseDiv = document.createElement("div");
    newCourseDiv.className = "course";

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

    newCourseDiv.addEventListener("click", function() {
    if (newCourseDiv.classList.contains("chosen")) {
        onNotChosen(newCourseDiv);
        removeFromChosenSubjects(courseObject);
        removeActivites(courseObject);
      } else {
        onChosen(newCourseDiv);
        addToChosenSubjects(courseObject,selectedItems);
        addCourseActivites(courseObject);
      }
    });

    // Append the new course <div> to the body of the document
    courseContainer.appendChild(newCourseDiv);
}

function removeActivites(courseObject) {
    /* Iterates over all activites for the course and removes it from the calendar */
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
}

function addCourseActivites(courseObject) {
    /* Iterates over all activites for the course and adds it to the calendar */
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
}

function onChosen(courseDiv) {
    /* Update the class so the subject will be reflected as chosen in CSS */
    courseDiv.classList.remove("not-chosen");
    courseDiv.classList.add("chosen");
}

function onNotChosen(courseDiv) {
    /* Update the class so the subject will be reflected as not chosen in CSS */
    courseDiv.classList.remove("chosen");
    courseDiv.classList.add("not-chosen");
    
}

function addToChosenSubjects(courseObject,selectedItems) {
    /*Adds the subject to the list of chosen subjects */
    var subject = document.createElement("p");
    subject.innerHTML = courseObject.code;
    subject.setAttribute('id', courseObject.code);
    selectedItems.appendChild(subject);
}

function removeFromChosenSubjects(courseObject) {
    /* Removes the subject from the list of chosen subjects */
    const elementToRemove = document.getElementById(courseObject.code);
    elementToRemove.remove();
}

