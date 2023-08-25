import {Course, CourseActivity} from './course.js';
export default class CourseModel {
    constructor() {
        this.selectedCourses = [];
        this.allCourses = this.fetchCourses();
        /*this.currentShownCourses = [...this.allCourses]; */
        this.total_credits = 0;
    }
  
    // Example methods for manipulating data
    addToSelected(item) {
        this.selectedCourses.push(item);
    }
  
    removeItemFromSelected(index) {
        this.selectedCourses.splice(index, 1);
    }

    incrementTotalCredits(courseObject) {
        this.total_credits += courseObject.credits;
    }

    decrementTotalCredits(courseObject) {
        this.total_credits -= courseObject.credits;
    }

    searchForCourses(searchString) {
        const lowerSearchString = searchString.toLowerCase();
        return this.allCourses.then(courses => courses.filter(course => course.code.toLowerCase().startsWith(lowerSearchString)));
    }

    async fetchCourses() {
        /* Reads from the JSON file and creates the necessary objects */
        try {
            const response = await fetch('javascripts/data/jsonfiles/courses.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            var array = data.map(e => {
                /*
                var activities = e.activities.map(activity => new CourseActivity(
                    activity.name,
                    activity.time,
                    activity.weekday,
                    activity.place,
                    activity.type
                ));
                */
                return new Course(
                    e.subjectCode,
                    e.subjectName,
                    e.level,
                    parseInt(e.credits),
                    e.teaching,
                    e.examination,
                    e.teachingLanguage,
                    e.description,
                    null
                );
            });
            return array;
        } catch (error) {
            console.log('Error:', error);
            throw error; // Propagate the error for the caller to handle
        }
    }
}