import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SelectedCourses } from './SelectedCourses';

function search(element, searchWord) {
    /* Returns the elements that start with searchWord */
    return element.toLowerCase().startsWith(searchWord.toLowerCase());
}

function FilterButtons(props) {
    const [levelFilter,setLevelFilter] = useState('')
    const [passFail, setPassFail] = useState(false)
    const [languageFilter,setLanguageFilter] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [sliderInput, setSliderInput] = useState([0,60])

    useEffect(() => {
        props.changeRetrieved(applyFilters(props.subjects));
      }, [levelFilter,passFail,languageFilter,searchInput,sliderInput,props.subjects]); 

    const onSearchChange = (event) => {
        setSearchInput(event.target.value);
    }

    const onSliderInputChange = (value) => {
        setSliderInput(value)
    }

    const onPassFailChange = () => {
        setPassFail((prev) => !prev)
    }

    const onLevelChange = (event) => {
        setLevelFilter(event.target.value);
    }

    const onLanguageChange = (event) => {
        setLanguageFilter(event.target.value);
    }


    const filterSearch = (subjects, query) => {
        return subjects.filter(x => search(x.subjectCode,query))
    }

    const filterCredits = (subjects,low,high) => {
        return subjects.filter(courseObj => courseObj.credits >= low && courseObj.credits <= high)
    }

    const filterLevel = (subjects, filter) => {
        if (filter === "") {
            return subjects
        }
        return subjects.filter(courseObj => courseObj.level.includes(filter))
    }

    const filterExam = (subjects) => {
        return subjects.filter(courseObj => courseObj.grading !== null && courseObj.grading === false )
    }

    const filterLanguage = (subjects, filter) => {
        if (filter === "") {
            return subjects
        }
        return subjects.filter(courseObj => courseObj.teachingLanguage !== undefined && courseObj.teachingLanguage.includes(filter) ) 
    }

    const applyFilters = (subjects) => {
        let filteredSubjects = [...subjects];
      
        // Apply search filter
        filteredSubjects = filterSearch(filteredSubjects,searchInput)
      
        // Apply credit range filter
        filteredSubjects = filterCredits(
          filteredSubjects,
          sliderInput[0],
          sliderInput[1]
        );

        // Apply level filter
        filteredSubjects = filterLevel(filteredSubjects, levelFilter);
      
        // Apply exam filter
        if (passFail) {
          filteredSubjects = filterExam(filteredSubjects);
        }

        // Apply language filter
        filteredSubjects = filterLanguage(filteredSubjects, languageFilter);
    
        return filteredSubjects;
      };
      return (
        <div className='filter_row'>
          <div>
            <label>Select Level:</label>
            <select onChange={onLevelChange}>
              <option value={""}>All levels</option>
              <option value={"Bachelor"}>Bachelor</option>
              <option value={"Master"}>Master</option>
              <option value={"PhD"}>PhD</option>
            </select>
          </div>
          <div>
            <label>
              <input onChange={onPassFailChange} type='checkbox' />Pass/fail
            </label>
          </div>
            <div>
              <label>
                From {sliderInput[0]} til {sliderInput[1]}
              </label>
              <Slider
                range
                min={0}
                max={60}
                value={[sliderInput[0], sliderInput[1]]}
                onChange={onSliderInputChange}
              />
            </div>
            <div>
              <label>Select language: </label>
              <select onChange={onLanguageChange}>
                <option value={""}>All languages</option>
                <option value={"Norsk"}>Norwegian</option>
                <option value={"English"}>English</option>
              </select>
            </div>
            <div>
              <label>Search for courses:</label>
              <input value={searchInput} onChange={onSearchChange}></input>
            </div>
        </div>
      );
        
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

function Courses(props) {
    /* Display all the courses */
    const [retrievedSubjects, setRetrievedSubjects] = useState(props.subjects)

    const onSetSelectedSubjects = (subject,should_add) => {
        props.changeSelected(subject,should_add)
    }

    return (
        <div>
        <h1>Find courses!</h1>
        <FilterButtons subjects={props.subjects} changeRetrieved={setRetrievedSubjects}></FilterButtons>
        <SelectedCourses editSelected = {onSetSelectedSubjects} selected = {props.selected}></SelectedCourses>
        {retrievedSubjects.map((courseObj, i) =>
            <Course key={i} courseObject={courseObj} selected= {props.selected} changeSelected={onSetSelectedSubjects}></Course> // The problem is with the key
            // The key should be unique and not dependent on searchedSubjects!
            )
        }
        </div>
    )
}
export default Courses;