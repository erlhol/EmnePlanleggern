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
    const [selectedYears, setSelectedYears] = useState([])

    const start = 1
    const end = 9
    const years = Array.from({ length: end - start + 1 }, (_, index) => (start + index).toString());

    useEffect(() => {
        props.changeRetrieved(applyFilters(props.subjects));
      }, [levelFilter,passFail,languageFilter,searchInput,sliderInput,selectedYears,props.subjects]); 

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

    const onSelectedYears = (newYear) => {
        // Create a copy of the selectedYears array
        const updatedYears = [...selectedYears];

        // Check if newYear is already in the selectedYears array
        const yearIndex = updatedYears.indexOf(newYear);

        if (yearIndex !== -1) {
            // If newYear is already in the array, remove it
            updatedYears.splice(yearIndex, 1);
        } else {
            // If newYear is not in the array, add it
            updatedYears.push(newYear);
        }

        // Set the updatedYears array as the new selectedYears
        setSelectedYears(updatedYears);
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
    
    const filterYears = (subjects, filter) => {
        if (filter.length === 0)
            return subjects
        return subjects.filter(courseObj => {
            const firstDigit = courseObj.subjectCode.match(/\d/); // Get the first digit in the subject code
            return firstDigit && filter.includes(firstDigit[0]); // Check if it's in the filter array
        });
    };

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

        // Apply year filter
        filteredSubjects = filterYears(filteredSubjects,selectedYears)
    
        return filteredSubjects;
      };

      const levels = 
        (<div>
            <label>Select Level:</label>
            <select onChange={onLevelChange}>
              <option value={""}>All levels</option>
              <option value={"Bachelor"}>Bachelor</option>
              <option value={"Master"}>Master</option>
              <option value={"PhD"}>PhD</option>
            </select>
          </div>)

        const slider = (
            <div>
              <label>
                Number of credits from {sliderInput[0]} til {sliderInput[1]}
              </label>
              <Slider
                range
                min={0}
                max={60}
                value={[sliderInput[0], sliderInput[1]]}
                onChange={onSliderInputChange}
              />
            </div>)
        
        const languages = (
            <div>
              <label>Select language: </label>
              <select onChange={onLanguageChange}>
                <option value={""}>All languages</option>
                <option value={"Norsk"}>Norwegian</option>
                <option value={"English"}>English</option>
              </select>
            </div>
        )

      return (
        <div className='wrapping'>
            <div className='filter_row'>
            {levels}
            <div>
                <label>
                    <input onChange={onPassFailChange} type='checkbox' />Pass/fail
                </label>
            </div>
            {slider}
            {languages}
            <div>
                <label>Search for courses:</label>
                <input value={searchInput} onChange={onSearchChange}></input>
            </div>

            <div>
                <label>Select year: </label>
                {years.map((lvl) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label key={lvl} >
                        <input onChange={() => onSelectedYears(lvl)} type='checkbox' />{lvl}000
                  </label>
                  </div>
                ))}
            </div>
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
        <div className={"course"}>
            <h3>{props.courseObject.subjectCode}</h3>
            <h4>{props.courseObject.subjectName}</h4>
            <p>
                <span style= {{color: '#ff5722'}}> Level: {props.courseObject.level} | </span>
                <span style= {{color: '#ff5722'}}>Credits: {props.courseObject.credits} | </span>
                <span style= {{color: '#ff5722'}}>Teaching: {props.courseObject.teaching} | </span>
                <span style= {{color: '#ff5722'}}>Teaching language: {props.courseObject.teachingLanguage}</span>
            </p>
            <p>{props.courseObject.description}</p>
            <button onClick={onCheckedStateChange}>Add course</button>
            <button onClick={() => console.log("Open new webpage")}>Learn more</button>
            <button onClick={() => window.open(`https://www.karakterweb.no/uio/${props.courseObject.subjectCode.toLowerCase()}`, "_blank", "noreferrer")}>Grading information</button>
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
            <SelectedCourses editSelected = {onSetSelectedSubjects} selected = {props.selected}></SelectedCourses>
            <div className='split_view'>
                <div>
                    {retrievedSubjects.map((courseObj, i) =>
                            <Course key={i} courseObject={courseObj} selected= {props.selected} changeSelected={onSetSelectedSubjects}></Course>
                            )
                        }
                </div>
                
                <FilterButtons subjects={props.subjects} changeRetrieved={setRetrievedSubjects}></FilterButtons>
            </div>
        </div>
    )
}
export default Courses;