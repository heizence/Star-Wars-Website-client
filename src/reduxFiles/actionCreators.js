import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH, 
    LOGGING_IN, LOGGING_OUT, PAGE_MOVE, RESET_DATA
} from './actions'
import { serverAddress } from '../serverAddress'

export const requestData = (category, method, name) => async (dispatch) => {
    dispatch({ type: REQUEST_PENDING })

    // if name exists, getdata request, or getnames request
    let requestAddress = name ? `${serverAddress}/data/${method}?category=${category}&name=${name}`
    : `${serverAddress}/data/${method}?category=${category}` 
    
    try {
        let res = await fetch(requestAddress)
        if (res.status === 200) {
            let data = await res.json()
            dispatch({ type: REQUEST_SUCCESS, payload: data, category })
        }
        else if (res.status === 400) {
            let error = await res.json()
            dispatch({ type: REQUEST_FAILED, payload: error })
        }
    }
    catch(error) {
        dispatch({ type: REQUEST_FAILED, payload: error })
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

/* Save page address that visited just before login 
to move to that page when logged in. */
export const requestPagemove = (dispatch, pageAddress) => {
    dispatch({ type: PAGE_MOVE, payload: pageAddress })
}
