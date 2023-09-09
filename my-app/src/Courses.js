function Course(courseObject) {
    /* Render one course */
    // Add style if preferable - to span elements: style="color: #ff5722
    return (
        <div className={"course"}>
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

function Courses(props) {
    return (
        <div>
        {props.subjects.map( (courseObj, i) =>
            <Course key={i} courseObject={courseObj}></Course>
            )
        }
        </div>
        
    )

}
export default Courses;

// TODO: include map of all courses
// Include search element with bound component input
// fetch from API in the parent component