import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH, 
    LOGGING_IN, LOGGING_OUT, PAGE_MOVE
} from './actions'
import { serverAddress } from '../serverAddress'

export const requestData = (category, method, name) => (dispatch) => {
    //console.log('category : ' , category, 'method : ', method, 'name : ', name)
    //console.log('actionCreater : ', `${serverAddress}/${method}?category=${category}`)
    dispatch({ type: REQUEST_PENDING })

    // if name exists, getdata request, or getnames request
    let requestAddress = name ? `${serverAddress}/data/${method}?category=${category}&name=${name}`
    : `${serverAddress}/data/${method}?category=${category}` 
    
    fetch(requestAddress)
    .then(res => res.json())
    .then(data => {
        //console.log('actioncreators result : ', data)
        dispatch({ type: REQUEST_SUCCESS, payload: data, category })
    })
    .catch(error => {
        dispatch({ type: REQUEST_FAILED, payload: error })
    })    
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}

export const requestSignin = (username, dispatch) => {
    dispatch({ type: LOGGING_IN, payload: username })
}

export const requestSignout = (dispatch) => {
    dispatch({ type: LOGGING_OUT })
}

/* Save page address that visited just before login 
to move to that page when logged in. */
export const requestPagemove = (dispatch, pageAddress) => {
    dispatch({ type: PAGE_MOVE, payload: pageAddress })
}
