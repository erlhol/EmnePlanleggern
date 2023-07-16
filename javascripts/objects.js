class Emne {
    constructor(code, description, level= "", credits="", teaching="", examdate="", teachingLanguage = "",about="") {
      this.code = code;
      this.description = description;
      this.level = level; // Bachelor or Master
      this.credits = credits;
      this.teaching = teaching; // Spring or Autumn
      this.examdate = examdate;
      this.teachingLanguage = teachingLanguage;
      this.about = about;
    }
  
    introduce() {
      console.log(`The subject ${this.code} has the following description: ${this.description}.`);
    }

    toString() {
        return `Emne { code: ${this.code}, description: ${this.description} }`;
    }
  }

function read_from_JSON() {
    return fetch('data/subjects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var array = data.map(e => new Emne(
                e.subjectCode,
                e.subjectName,
                e.level,
                e.credits,
                e.teaching,
                e.examination,
                e.teachingLanguage,
                e.description
            ));
            return array;
        })
        .catch(error => {
            console.log('Error:', error);
            throw error; // Propagate the error for the caller to handle
        });
}


var listContainer = document.getElementById("course-container");
var paginationContainer = document.getElementById("pagination");

var currentPage = 1;
var itemsPerPage = 5; // Number of items to display per page

var subjects = read_from_JSON();
subjects.then((value) => {
    // Handle the resolved value here
    generateListItems(0, itemsPerPage,value); // Generate initial list
    listContainer.addEventListener("scroll", loadMoreItems(value));
  }).catch((error) => {
    // Handle any errors that occurred during the promise
    console.error(error);
  });

function generateListItems(start, end, subjects) {
    listContainer.innerHTML = "";

    for (var i = start; i <= end; i++) {
        var listItem = subjects[i];
        addCourse(listItem, listContainer);
    }
}

// Function to generate more list items when scrolling to the bottom
function loadMoreItems(subjects) {
  var scrollTop = listContainer.scrollTop;
  var scrollHeight = listContainer.scrollHeight;
  var containerHeight = listContainer.clientHeight;

  if (scrollTop + containerHeight >= scrollHeight) {
    // Reached the bottom of the list container
    var start = currentPage * itemsPerPage + 1;
    var end = (currentPage + 1) * itemsPerPage;
    generateListItems(start, end,subjects);
    currentPage++;
  }
}

function addCourse(courseObject,courseContainer) {
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
        // Add to a div that displays selected
        const elementToRemove = document.getElementById(courseObject.code);
        elementToRemove.remove();
        newCourseDiv.classList.remove("chosen");
        newCourseDiv.classList.add("not-chosen");
      } else {
        var subject = document.createElement("p");
        subject.innerHTML = courseObject.code;
        subject.setAttribute('id', courseObject.code);
        selectedItems.appendChild(subject);
        newCourseDiv.classList.remove("not-chosen");
        newCourseDiv.classList.add("chosen");
      }
    });

    // Append the new course <div> to the body of the document
    courseContainer.appendChild(newCourseDiv);
}

