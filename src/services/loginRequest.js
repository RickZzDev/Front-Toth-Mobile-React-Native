import { doRequest, doPublicRequest } from './basicRequest'

const RESOURCE = "/escolas/autenticacao"

const RESOURCE_CNPJ = '/escolas/cnpj'

const doLogin = user => {
    return doPublicRequest(RESOURCE, 'POST', user);
}

export const verificaCnpj = cnpj =>{
    return doPublicRequest(RESOURCE_CNPJ, 'POST', cnpj)
}

export default doLogin