import './App.css';
import Courses from './Courses';
import courses from './jsonfiles/courses.json'

function App() {

    return (
        <div className="App">
        <Courses subjects={courses}></Courses>
        </div>
    );
}

export default App;
