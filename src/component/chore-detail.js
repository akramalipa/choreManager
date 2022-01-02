import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMicrochip, faPowerOff, faStopwatch, faSun, faWaveSquare } from '@fortawesome/free-solid-svg-icons';

import { useCookies } from 'react-cookie';


/* Comments Section: 

1. Activate the chore
2. Deactivate the chore
3. get details

*/

function ChoreDetails(props){

    const cho = props.chore;
    const [token] = useCookies(['mr-token']);

    const activateClicked = () => {
        
        fetch(`https://localhost:12354/api/v1/Chores('${cho.Name}')/tm1.Activate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token['mr-token']
        }
        })
        .then( () => getDetails())
        .catch (error => console. log (error))


    }

    const deactivateClicked = () => {
        
        fetch(`https://localhost:12354/api/v1/Chores('${cho.Name}')/tm1.Deactivate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token['mr-token']
        }
        })
        .then( () => getDetails())
        .catch (error => console. log (error))


    }

    const executeChore = () => {

        fetch(`https://localhost:12354/api/v1/Chores('${cho.Name}')/tm1.Execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token['mr-token']
            }
            })
            .then( () => getDetails())
            .catch (error => console. log (error))

    }

    const getDetails = () => {

        fetch(`https://localhost:12354/api/v1/Chores('${cho.Name}')`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token['mr-token']
          }
        })
        .then( resp => resp.json())
        .then( resp => props.updateChore(resp))
        .catch( error => console.log(error))
    }

    


    return (
        <React.Fragment>
            {cho ? (
                <div>
                    <h1>{cho.Name} - Details</h1>
                    <p>
                        <FontAwesomeIcon icon={faStopwatch}/> &nbsp;&nbsp; Start Time - &nbsp;
                        {cho.StartTime} <br></br> <br></br>

                        <FontAwesomeIcon icon={faSun}/> &nbsp;&nbsp; DSTSensitive - &nbsp;
                        {cho.DSTSensitive === true ? 'True': 'False'} <br></br> <br></br>

                        <FontAwesomeIcon icon={faPowerOff}/> &nbsp;&nbsp; Active - &nbsp;
                        {cho.Active === true ? 'True': 'False'} <br></br><br></br>

                        <FontAwesomeIcon icon={faMicrochip}/> &nbsp;&nbsp; Execution Mode - &nbsp;
                        {cho.ExecutionMode} <br></br><br></br>

                        <FontAwesomeIcon icon={faWaveSquare}/> &nbsp;&nbsp; Frequency - &nbsp;
                        {cho.Frequency} <br></br><br></br>
                    </p>


                    <div>
                        <h2 className='activate-Chore'>Activate/Deactivate Chore</h2>
                        {cho.Active === true  ?
                            <button  onClick={deactivateClicked} > Deactivate</button>:
                            <button  onClick={activateClicked}> Activate </button>
                        }
                    </div>

                    <div>
                        <h2 className='activate-Chore'>Execute Chore</h2>
                        <button  onClick={executeChore}> Run</button>

                        
                    </div>

                    
                    
                </div>

            

            ): null}


        </React.Fragment>
    )
}

export default ChoreDetails;