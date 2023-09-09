import './App.css';
import Courses from './Courses';
import courses from './jsonfiles/courses.json'

function App() {

    return (
        <div className="App">
        <Courses subjects={courses}></Courses>
        <a href="mailto:erlinhol@uio.no">Kontakt Erling Holte på mail</a>
        </div>
    );
}

export default App;
