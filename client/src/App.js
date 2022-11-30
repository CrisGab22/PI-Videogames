import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Update from './components/Update.jsx'
import Create from './components/Create.jsx'
import {Route} from 'react-router-dom'
import Landing from './components/Landing.jsx';
import Delete from './components/Delete.jsx'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" render={() => <Landing/> }/>

      <Route exact path="/home" render={() => <Home /> }/>

      <Route exact path="/home/videogame/:id" render={() => <Detail /> }/>

      <Route exact path="/home/create" render={() => <Create/>}/>

      <Route exact path="/home/update/:id" render={() => <Update/>}/>

      <Route exact path={"/home/delete/:id"} render={() => <Delete/>}/>

    </div>
  );
}

export default App;
