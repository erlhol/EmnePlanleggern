class Emne {
    constructor(code, description, level= "", credits="", teaching="", examdate="") {
      this.code = code;
      this.description = description;
      this.level = level; // Bachelor or Master
      this.credits = credits;
      this.teaching = teaching; // Spring or Autumn
      this.examdate = examdate;
    }
  
    introduce() {
      console.log(`The subject ${this.code} has the following description: ${this.description}.`);
    }

    toString() {
        return `Emne { code: ${this.code}, description: ${this.description} }`;
    }
  }

// How to retrieve from JSON:
/*
const emne = new Emne("IN1000","Introduksjon til objektorientert programmering");

const jsonData = '{"code_1": "IN1010", "description_1": "My description"}';
const parsedData = JSON.parse(jsonData);
console.log(parsedData);

const emne2 = new Emne(parsedData.code_1, parsedData.description_1);

console.log(emne2.code);
console.log(emne2.description); 
emne2.introduce();

*/

function create_dummy_subjects() {
    var array = [];
    for (var i = 0; i <= 51; i++) {
        array.push(new Emne(i,"emne nummer "+i));
    }
    return array;
}

var subjects = create_dummy_subjects();

var numItems = subjects.length;
var listContainer = document.getElementById("course");
var paginationContainer = document.getElementById("pagination");

var itemsPerPage = 10; // Number of items to display per page
var totalPages = Math.ceil(numItems / itemsPerPage);
var currentPage = 1;

function generateListItems(start, end, subjects) {
    listContainer.innerHTML = "";

    for (var i = start; i < end; i++) {
        var listItem = subjects[i];
        addCourse(listItem);
    }
}

function updatePaginationButtons(subjects) {
  paginationContainer.innerHTML = ""; // Clear the pagination buttons

  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("button");
    button.innerText = "Page " + i;

    // Add an event listener to handle pagination button clicks
    button.addEventListener("click", function () {
      currentPage = parseInt(this.innerText.split(" ")[1]);
      generateListItems(
        (currentPage - 1) * itemsPerPage + 1,
        Math.min(currentPage * itemsPerPage, numItems), subjects
      );
      updatePaginationButtons(subjects);
    });

    paginationContainer.appendChild(button);
  }
}

generateListItems(0, itemsPerPage,subjects); // Generate initial list
updatePaginationButtons(subjects); // Generate initial pagination buttons

function addCourse(courseObject) {
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
        '<span style="color: #ff5722;">Level:</span> Bachelor | ' +
        '<span style="color: #ff5722;">Credits:</span> 10 | ' +
        '<span style="color: #ff5722;">Teaching:</span> Autumn | ' +
        '<span style="color: #ff5722;">Examination:</span> Spring and autumn | ' +
        '<span style="color: #ff5722;">Teaching language:</span> Norwegian';
    newCourseDiv.appendChild(courseDetails);

    // Create and append the second <p> element for the course description
    var courseDescription = document.createElement("p");
    courseDescription.textContent = courseObject.description;
    newCourseDiv.appendChild(courseDescription);

    // Append the new course <div> to the body of the document
    document.body.appendChild(newCourseDiv);
}