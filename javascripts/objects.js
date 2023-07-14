class Emne {
    constructor(code, description) {
      this.code = code;
      this.description = description;
    }
  
    introduce() {
      console.log(`The subject ${this.code} has the following description: ${this.description}.`);
    }
  }
  
const emne = new Emne("IN1000","Introduksjon til objektorientert programmering");

const jsonData = '{"code_1": "IN1010", "description_1": "My description"}';
const parsedData = JSON.parse(jsonData);

console.log(parsedData);

const emne2 = new Emne(parsedData.code_1, parsedData.description_1);

console.log(emne2.code);
console.log(emne2.description); 
emne2.introduce();

// Populate table:
var numItems = parseInt(prompt("Enter the number of items:"));
var listContainer = document.getElementById("list-container");
var paginationContainer = document.getElementById("pagination");

var itemsPerPage = 10; // Number of items to display per page
var totalPages = Math.ceil(numItems / itemsPerPage);
var currentPage = 1;

function generateListItems(start, end) {
  listContainer.innerHTML = ""; // Clear the existing list items

  for (var i = start; i <= end; i++) {
    var listItem = document.createElement("li");
    listItem.innerText = "Item " + i;
    listContainer.appendChild(listItem);
  }
}

function updatePaginationButtons() {
  paginationContainer.innerHTML = ""; // Clear the pagination buttons

  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("button");
    button.innerText = "Page " + i;

    // Add an event listener to handle pagination button clicks
    button.addEventListener("click", function () {
      currentPage = parseInt(this.innerText.split(" ")[1]);
      generateListItems(
        (currentPage - 1) * itemsPerPage + 1,
        Math.min(currentPage * itemsPerPage, numItems)
      );
      updatePaginationButtons();
    });

    paginationContainer.appendChild(button);
  }
}

generateListItems(1, itemsPerPage); // Generate initial list
updatePaginationButtons(); // Generate initial pagination buttons
