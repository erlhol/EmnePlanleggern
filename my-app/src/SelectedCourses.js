export function SelectedCourses(props) {
    /* Displays a list of selected courses 
    And the total number of credits*/
    
    const totalCredits = props.selected.reduce((accumulator, courseObj) => {
        return accumulator + courseObj.credits;
      }, 0);

    return <div><h2>Selected Courses </h2>
    {props.selected.map((courseObj, i) =>
        <p key={i}>
            <span>{courseObj.subjectCode} {courseObj.subjectName}</span>
            <button onClick={() => props.editSelected(courseObj,false)}>Delete!</button>
        </p>
        )
    }
    <p>Total credits: {totalCredits}</p>
    </div>
}
