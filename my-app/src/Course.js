function renderCourse(courseObject) {
    /* Render one course */
    // Add style if preferable: style="color: #ff5722
    return (
        <div className={"course"} id={courseObject.code+"r"}>
            <h1>{courseObject.code}</h1>
            <h2>{courseObject.name}</h2>
            <p>
                <span>{courseObject.level}</span>
                <span>{courseObject.credits}</span>
                <span>{courseObject.teaching}</span>
                <span>{courseObject.examdate}</span>
                <span>{courseObject.teachingLanguage}</span>
            </p>
            <p>{courseObject.description}</p>
        </div>
    )
}

function Course(props) {
    return <h1>Course</h1>

}
export default Course;

// TODO: include map of all courses
// Include search element with bound component input
// fetch from API in the parent component