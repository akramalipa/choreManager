import React from 'react';
import { useState, useEffect} from 'react';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function ProcessDetail(props) {

    const cho = props.chore;

    const [count, setCount] = useState ([]);

    const [processes, setProcesses] =  useState ([]);

    

    useEffect(()=>{


        fetch(`https://localhost:12354/api/v1/Chores('${cho.Name}')/Tasks/$count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46YXBwbGU='
          }
        })
        .then( resp => resp.json())
        .then( resp => setCount(resp))
        .catch( error => console.log(error))
      }, [])

    const getProcess = process => evt => {

        fetch (`https://localhost:12354/api/v1/Chores('${cho.Name}')/Tasks(${process})?$expand=*,Process($select=Name),Chore($select=Name)`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46YXBwbGU='
        }
        })
        .then( resp => resp.json())
        .then( resp => setProcesses(resp.Process.Name))
        .catch (error => console. log (error))


    }


      return (
        <React.Fragment>
            {cho ? (
                <div>
                    <h3> &nbsp;&nbsp; Total number of Process - &nbsp;
                        {count}</h3> <br></br>
                    <h3> Click Buttons to Get Process Names </h3>

                    {[...Array(count)].map ((e, i) => {
                        return <button key={i} onClick={getProcess(i)}>Get {i} process</button>

                    })}
                    <p>ProcessName: {processes}</p>
                </div>


            ): null}


        </React.Fragment>
    )
}

export default ProcessDetail;