export function SelectedCourses(props) {
  /* Displays a list of selected courses
    And the total number of credits*/

  const totalCredits = props.selected.reduce((accumulator, courseObj) => {
    return accumulator + courseObj[0].credits;
  }, 0);

  return (
    <div>
      <h2>Selected Courses </h2>
      {props.selected.map((courseObj, i) => (
        <p key={i}>
          <span>
            {courseObj[0].subjectCode} {courseObj[0].subjectName}
          </span>
          <button onClick={() => props.editSelected(courseObj[0], false)}>
            Delete!
          </button>
          <div style={{ backgroundColor: courseObj[1] }}>Color</div>
        </p>
      ))}
      <p>Total credits: {totalCredits}</p>
    </div>
  );
}
