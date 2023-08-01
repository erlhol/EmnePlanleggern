export class Course {
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

export class CourseActivity {
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

