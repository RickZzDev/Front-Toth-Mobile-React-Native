const URL = "http://localhost:8080"

export const doRequest = async (resource, method, dados = '', urlParam = '') => {

    const params = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    if(!['GET', 'DELETE'].includes(method)) params.body = JSON.stringify(dados)

 
    return await fetch(URL + resource + urlParam, params)
   

}

export const doPublicRequest = async (resource, method, dados = '', urlParam = '') => {

    const params = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    if(!['GET', 'DELETE'].includes(method)) params.body = JSON.stringify(dados)
    return await fetch(URL + resource + urlParam, params)

}