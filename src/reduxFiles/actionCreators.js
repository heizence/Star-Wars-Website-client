import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, 
    SEARCH, LOGGING_IN, LOGGING_OUT, PAGE_MOVE
} from './actions'
import { serverAddress } from '../serverAddress'

// Fetch specific category data and image url
export const requestData = (category) => async (dispatch) => {
    dispatch({ type: REQUEST_PENDING })
    let requestAddress =`${serverAddress}/data/getdata?category=${category}`

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

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}

export const requestSignin = (userObj, dispatch) => {
    dispatch({ type: LOGGING_IN, payload: userObj })
}

export const requestSignout = (dispatch) => {
    dispatch({ type: LOGGING_OUT })
}

/* 
This is for saving current page URL. When user logged in or logged out with the saved URL, 
User can move to the page URL before logging in or logging out.
*/
export const requestPageMove = (dispatch, address) => {
    // Refactoring address into router path
    // For example : http://localhost:3000/category/Character?page=1 -> category/Character?page=1
    let routePath = address.split('/').slice(3).join('/')
    if (routePath === null) {
        routePath = ''
    }
    dispatch({ type: PAGE_MOVE, payload: routePath })
}
