import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH
} from './actions'

export const requestData = (category, index) => (dispatch) => {
    dispatch({ type: REQUEST_PENDING })
    fetch(`https://swapi.co/api/${category}/?page=${index}&format=json`)
    .then(res => res.json())
    .then(data => {
        dispatch({ type: REQUEST_SUCCESS, payload: data.results, category })
    })
    .catch(error => {
        dispatch({ type: REQUEST_FAILED, payload: error })
    })    
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}
