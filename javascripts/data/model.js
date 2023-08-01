import {Course, CourseActivity} from './course.js';
export default class CourseModel {
    constructor() {
        this.selectedCourses = [];
        this.allCourses = this.fetchCourses();
    }
  
    // Example methods for manipulating data
    addToSelected(item) {
        this.selectedCourses.push(item);
    }
  
    removeItemFromSelected(index) {
        this.selectedCourses.splice(index, 1);
    }

    async fetchCourses() {
        /* Reads from the JSON file and creates the necessary objects */
        try {
            const response = await fetch('javascripts/data/subjects.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
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
        } catch (error) {
            console.log('Error:', error);
            throw error; // Propagate the error for the caller to handle
        }
    }
}