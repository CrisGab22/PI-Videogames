import './App.css';
import NavBar from './components/Nav.jsx'
import Videogames from './components/Videogames.jsx'
import Detail from './components/Detail.jsx'
import About from './components/About.jsx'
import {Route} from 'react-router-dom'
import Landing from './components/Landing.jsx';


function App() {
  return (
    <div className="App">
      
      <Route exact path="/" render={() => <Landing/> }/>

      <Route path="/home" render={() => <NavBar /> }/>

      <Route exact path="/home" render={() => <Videogames /> }/>

      <Route path="/home/videogame" render={() => <Detail /> }/>

      <Route exact path="/home/about" render={() => <About/>}/>
    </div>
  );
}

export default App;
