import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function SelectedCourses(props) {
    /* Displays a list of selected courses 
    And the total number of credits*/
    
    const totalCredits = props.selected.reduce((accumulator, courseObj) => {
        return accumulator + courseObj.credits;
      }, 0);

    return <><h2>Selected Courses </h2>
    {props.selected.map((courseObj, i) =>
        <p key={i}>
            <span>{courseObj.subjectCode} {courseObj.subjectName}</span>
            <button onClick={() => props.editSelected(courseObj,false)}>Delete!</button>
        </p>
        )
    }
    <p>Total credits: {totalCredits}</p>
    </>
}

function FilterButtons(props) {
    const searchFilters = ["Bachelor", "Master", "PhD", "Exam", "Norsk", "English"];
    const [checkedState, setCheckedState] = useState(
        new Array(searchFilters.length).fill(false)
      );
    const [sliderInput, setSliderInput] = useState([0,60])

    const onSliderInputChange = (value) => {
        setSliderInput(value)
    }
  
      const handleOnChange = (position) => {
          const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
          );
          setCheckedState(updatedCheckedState);
        };
  
      const filter_buttons = searchFilters.map((element,i) => (
          <div> 
          <input checked={checkedState[i]} onChange={() => handleOnChange(i)} type="checkbox" id={element} name={element} value={element} />{element}
        </div>))
  
      const flex_style = {
          display: "flex",
          justifyContent: "space-around"
      };
      
      return ( <><div style={flex_style}>{filter_buttons}</div>
      <p>From {sliderInput[0]} til {sliderInput[1]}</p>
        <Slider 
            range
            min={0}
            max={60}
            value={[sliderInput[0], sliderInput[1]]}
            onChange={onSliderInputChange}
         /></>)   
}

function Course(props) {
    /* Handles logic for one specific course
    Uses a state to keep track of it is pressed or not */

    const onCheckedStateChange = () => {
        if (props.selected.includes(props.courseObject) === false) {
            props.changeSelected(props.courseObject, true);
        }
    }

    /* Render one course */
    // Add style if preferable - to span elements: style="color: #ff5722
    return (
        <div
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
    /* Returns the elements that start with searchWord */
    return element.toLowerCase().startsWith(searchWord.toLowerCase());
}

function Courses(props) {
    /* Display all the courses and handle searchInput */

    const [searchInput, setSearchInput] = useState('');
    const [searchedSubjects, setSearchedSubjects] = useState(props.subjects);
    // TODO: have to fix searchedCourses lagging with the selected color.

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
        <FilterButtons></FilterButtons>
        <h1>Search for courses:</h1>
        <input value={searchInput} onChange={onSearchChange}></input>
        <SelectedCourses editSelected = {onSetSelectedSubjects} selected = {props.selected}></SelectedCourses>
        
        {searchedSubjects.map((courseObj, i) =>
            <Course key={i} courseObject={courseObj} selected= {props.selected} changeSelected={onSetSelectedSubjects}></Course> // The problem is with the key
            // The key should be unique and not dependent on searchedSubjects!
            )
        }
        </>
    )
}
export default Courses;