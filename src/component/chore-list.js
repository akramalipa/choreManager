import React from 'react';
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import API from './api-service';
import { useCookies } from 'react-cookie';

/* Comments Section: 

1. Activate the chore
2. Deactivate the chore
3. get details

*/


function ChoreList(props){

    const [token] = useCookies(['mr-token']);


    const choreClicked = chore => evt => {
        props.choreClicked(chore)

    }   

    const [Name, setName] = useState ('');


    const createClicked = () => {
        API.createChore({Name}, token['mr-token'])
        .then (resp => props.choreCreated(resp))
        .catch (error => console.log(error))
    }

    const removeClicked = chore =>  {
        API.deleteChore(chore.Name, token['mr-token'])
        .then (() => props.removeClicked(chore))
        .catch(error => console.log())
        
    }

    const isDisabled = Name.length === 0;


    

    return (
        <React.Fragment>
            <div>
                <label> New Chore </label><br/>
                <input id="Name" type="text" placeholder="Chore Name" 
                value={Name} 
                onChange={ evt => setName (evt.target.value)}></input><br/>
                <button onClick={createClicked} disabled={isDisabled}>Create</button>
                { props.chores && props.chores.map( chore => {
                    return (
                        <div key={chore.Name} className='chore-item'>
                            <h2 onClick={choreClicked(chore)}>{chore.Name}</h2>

                            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(chore)}/>
                        </div>

                    )
                })}
            </div> 
        </React.Fragment>
    )
}

export default ChoreList;

                            //<FontAwesomeIcon icon={faEdit} onClick={() => editClicked(chore)}/>