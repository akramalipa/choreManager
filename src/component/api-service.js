
  /* Comments Section:  
    1. API calls to the TM1 server
    */


export class API {

    static loginUser(token) {
        console.log(token)
        return fetch("https://localhost:12354/api/v1/Chores", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; odata.streaming=true; charset=utf-8',
                'Authorization': token,
                'Accept': 'application/json;odata.metadata=none,text/plain',
                'Connection': 'keep-alive'
            }
          })
          .then( resp => resp.json())
          .catch( error => console.log(error))
        }

    static updateChore(choreName, body, token) {
        return fetch(`https://localhost:12354/api/v1/Chores('${choreName}')`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify( body)
          }).then (resp => resp.json())
    }

    static createChore(body, token) {
        return fetch(`https://localhost:12354/api/v1/Chores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify( body)
          }).then (resp => resp.json())
    }

    static deleteChore(choreName, token) {
        return fetch(`https://localhost:12354/api/v1/Chores('${choreName}')`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token 
            }
          })
    }

    static logout(token) {
        return fetch("https://localhost:12354/api/v1/ActiveSession/tm1.Close", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'close',
                'timeout': 0.0,
                'Authorization': token 


            },
            body: ''
          })
    }

}

export default API;