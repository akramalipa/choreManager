
import './App.css';
import React, { useState, useEffect } from 'react';
import ChoreList from './component/chore-list';
import ChoreDetails from './component/chore-detail';
import ProcessDetail from './component/process-detail';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTasks} from '@fortawesome/free-solid-svg-icons';
import API from './component/api-service';



  /* Comments Section:  
  Fetch data from API
  1. useEffect () hooks effect to assign state
  2. fetch with the URL of the API
  3. define method and headers
  4. the returned response is converted to json
  5. the converted json is then set to the movies list state
  6. if there is error set it in the console log (it will error out because of CORS - Cross origin resource sharing )
        Security built in browser -> will prevent fetching data from different domains.
  7. import certificate for TM1 to fetch data
  8. Process details not yet working
    */

function App() {

  const [chores, setChores] = useState([]);
  const [selectedChore, setSelectedChore] = useState(null);
  const [editedChore, setEditedChore] = useState(null);
  const [processes, setProcesses] =  useState ([]);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);

 



   useEffect(()=>{


    fetch("https://localhost:12354/api/v1/Chores", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token['mr-token']
      }
    })
    .then( resp => resp.json())
    .then( resp => setChores(resp.value))
    .catch( error => console.log(error))


  }, [])

  useEffect ( () => {
    console.log(token);
    if(!token['mr-token']) window.location.href = '/';
  }, [token])



  const loadChore = chore => {
    setSelectedChore(chore);
    setEditedChore(null);
  }

  const editedClicked = chore => {
    setEditedChore(chore);
    setSelectedChore(null);
 
  }

  const processFetched = process => {
    const newProcess = [...processes, process];
    setProcesses(newProcess);
  }

  const choreCreated = chore => {
    const newChores = [...chores, chore];
    setChores(newChores);

  }

  const logoutUser = () => {
    deleteToken(['mr-token']);
    API.logout(token['mr-token'])

  }

  const removeClicked = chore => {
    const newChores = chores.filter ( cho => {
      if (cho.Name === chore.Name) {
        return false;

      }
      return true;
    })
    setChores(newChores);

  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>
        <FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp; 
        <span>Chore Manager</span>
        </h1>
        <FontAwesomeIcon icon= {faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className = 'layout'>
        <ChoreList chores={chores} choreClicked={loadChore} editClicked={editedClicked} choreCreated={choreCreated} removeClicked={removeClicked}/>
        <ChoreDetails chore={selectedChore} updateChore={loadChore}/>
        { editedChore ? <ProcessDetail chore={editedChore}
        processFetched = {processFetched}/> : null }
    
      </div> 
    </div>
  );
}

export default App;




        //{ editedChore ? <ChoreForm  chore={editedChore} choreUpdated={choreUpdated}
        //processFetched = {processFetched} choreCreated={choreCreated}/> : null } 