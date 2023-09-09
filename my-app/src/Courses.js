import { useState, useEffect } from 'react';
function Course(props) {
    /* Render one course */
    // Add style if preferable - to span elements: style="color: #ff5722
    return (
        <div className={"course"}>
            <h1>{props.courseObject.subjectCode}</h1>
            <h2>{props.courseObject.subjectName}</h2>
            <p>
                <span>{props.courseObject.level}</span>
                <span>{props.courseObject.credits}</span>
                <span>{props.courseObject.teaching}</span>
                <span>{props.courseObject.teachingLanguage}</span>
            </p>
            <p>{props.courseObject.description}</p>
        </div>
    )
}

function search(element, searchWord) {
    return element.toLowerCase().startsWith(searchWord.toLowerCase());
}

function Courses(props) {

    const [searchInput, setSearchInput] = useState('');
    const [chosenSubjects, setChosenSubjects] = useState(props.subjects);

    const onSearchChange = (event) => {
        setSearchInput(event.target.value);
      }
    
    useEffect( () => {
        setChosenSubjects(props.subjects.filter(x => search(x.subjectCode,searchInput)))

    }, [searchInput,props.subjects]);


    return (
        <>
        <h1>Search for courses:</h1>
        <input value={searchInput} onChange={onSearchChange}></input>
        {chosenSubjects.map((courseObj, i) =>
            <Course key={i} courseObject={courseObj}></Course>
            )
        }
        </>
        
        
    )
}
export default Courses;

// TODO: include map of all courses
// Include search element with bound component input