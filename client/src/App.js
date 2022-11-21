import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Create from './components/Create.jsx'
import {Route} from 'react-router-dom'
import Landing from './components/Landing.jsx';


function App() {
  return (
    <div className="App">
      
      <Route exact path="/" render={() => <Landing/> }/>

      <Route exact path="/home" render={() => <Home /> }/>

      <Route exact path="/home/videogame/:id" render={() => <Detail /> }/>

      <Route exact path="/home/create" render={() => <Create/>}/>
    </div>
  );
}

export default App;
