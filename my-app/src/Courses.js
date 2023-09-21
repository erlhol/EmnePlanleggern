import { useState, useEffect } from 'react';

function SelectedCourses(props) {
    return <><h2>Selected Courses </h2>
    {props.selected.map((courseObj, i) =>
        <p key={i} >{courseObj.subjectCode} {courseObj.subjectName}</p>
        )
    }
    </>
}

function Course(props) {
    const [checkedState, setCheckedState] = useState(false);


    const chosenBackgroundColor = {
       // backgroundColor: '#ffffff88', // Change this to the desired background color
       backgroundColor: '#ffff88'
    };

    const notChosenBackgroundColor = {
        backgroundColor: '#ffffff'
    }

    const onCheckedStateChange = () => {
        setCheckedState((previousValue) => !previousValue);
        props.changeSelected(props.courseObject, !checkedState);
    }

    /* Render one course */
    // Add style if preferable - to span elements: style="color: #ff5722
    return (
        <div style={checkedState ? chosenBackgroundColor : notChosenBackgroundColor} 
        onClick={onCheckedStateChange} className={"course"}>
            <h1>{props.courseObject.subjectCode}</h1>
            <h2>{props.courseObject.subjectName}</h2>
            <p>
                <span style= {{color: '#ff5722'}}> Level: {props.courseObject.level} | </span>
                <span style= {{color: '#ff5722'}}>Credits: {props.courseObject.credits} | </span>
                <span style= {{color: '#ff5722'}}>Teaching: {props.courseObject.teaching} | </span>
                <span style= {{color: '#ff5722'}}>Teaching language: {props.courseObject.teachingLanguage}</span>
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
    const [searchedSubjects, setSearchedSubjects] = useState(props.subjects);
    // have to fix searchedCourses lagging with the selected color.

    const onSearchChange = (event) => {
        setSearchInput(event.target.value);
    }
    
    useEffect( () => {
        setSearchedSubjects(props.subjects.filter(x => search(x.subjectCode,searchInput)))

    }, [searchInput,props.subjects]);

    const onSetSelectedSubjects = (subject,should_add) => {
        props.changeSelected(subject,should_add)
    }


    return (
        <>
        <SelectedCourses selected = {props.selected}></SelectedCourses>
        <h1>Search for courses:</h1>
        <input value={searchInput} onChange={onSearchChange}></input>
        {searchedSubjects.map((courseObj, i) =>
            <Course key={i} courseObject={courseObj} changeSelected={onSetSelectedSubjects}></Course> // The problem is with the key
            // The key should be unique and not dependent on searchedSubjects!
            )
        }
        </>
    )
}
export default Courses;