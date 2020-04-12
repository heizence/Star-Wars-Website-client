import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH
} from './actions'
import { serverAddress } from '../serverAddress'

export const requestData = (category, method, name) => (dispatch) => {
    console.log('category : ' , category, 'method : ', method, 'name : ', name)
    console.log('actionCreater : ', `${serverAddress}/${method}?category=${category}`)
    dispatch({ type: REQUEST_PENDING })

    // if name exists, getspecificdata request, or getnames request
    let requestAddress = name ? `${serverAddress}/${method}?category=${category}&name=${name}`
    : `${serverAddress}/${method}?category=${category}` 
    
    fetch(requestAddress)
    .then(res => res.json())
    .then(data => {
        console.log('actioncreators result : ', data)
        dispatch({ type: REQUEST_SUCCESS, payload: data, category })
    })
    .catch(error => {
        dispatch({ type: REQUEST_FAILED, payload: error })
    })    
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}
