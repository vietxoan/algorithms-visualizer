import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import Category from './components/Category/Category';
import SortingVisualizer from './components/Sorting Visualizer/Sorting';
import {Route, Routes} from 'react-router-dom';

function App() {
  // For test purpose ++
  // let component
  // switch (window.location.pathname) {
  //   case "/":
  //     component = <Home />
  //     break
  //   case "/Category":
  //     component = <Category/>
  //     break
  //   case "/About":
  //     component = <About />
  //     break
  // }
  //for test purpose --
  return (
    <div>
      <NavBar />
      {/* for test purpose + */}
      {/* <div>{component}</div> */}
      {/* for test purpose - */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/SortingVisualizer' element={<SortingVisualizer/>}></Route>
        <Route path="/Category" element={<Category/>}></Route>
        <Route path="/About" element={<About/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
