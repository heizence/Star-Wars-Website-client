import { NAME_REQUEST_PENDING, NAME_REQUEST_SUCCESS, NAME_REQUEST_FAILED, 
    DATA_REQUEST_PENDING, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILED, 
    SEARCH, LOGGING_IN, LOGGING_OUT, RESET_DATA
} from './actions'
import { serverAddress } from '../serverAddress'

// Fetch all data names and image url
export const requestNames = (category) => async (dispatch) => {
    dispatch({ type: NAME_REQUEST_PENDING })
    let requestAddress =`${serverAddress}/data/getnames?category=${category}`

    try {
        let res = await fetch(requestAddress)
        if (res.status === 200) {
            let data = await res.json()
            dispatch({ type: NAME_REQUEST_SUCCESS, payload: data, category })
        }
        else if (res.status === 400) {
            let error = await res.json()
            dispatch({ type: NAME_REQUEST_FAILED, payload: error })
        }
    }
    catch(error) {
        dispatch({ type: NAME_REQUEST_FAILED, payload: error })
    }
}

// Fetch specific data
export const requestSpecificData = (category, name) => async (dispatch) => {
    dispatch({ type: DATA_REQUEST_PENDING })
    let requestAddress =`${serverAddress}/data/getdata/?category=${category}&name=${name}`
    
    try {
        let res = await fetch(requestAddress)
        if (res.status === 200) {
            let data = await res.json()
            dispatch({ type: DATA_REQUEST_SUCCESS, payload: data, category })
        }
        else if (res.status === 400) {
            let error = await res.json()
            dispatch({ type: DATA_REQUEST_FAILED, payload: error })
        }
    }
    catch(error) {
        dispatch({ type: DATA_REQUEST_FAILED, payload: error })
    }
}

export const resetData = (dispatch) => {
    dispatch({ type: RESET_DATA })
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}

export const requestSignin = (userObj, dispatch) => {
    dispatch({ type: LOGGING_IN, payload: userObj })
}

export const requestSignout = (dispatch) => {
    dispatch({ type: LOGGING_OUT })
}
