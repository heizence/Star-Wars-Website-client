import axios from 'axios'
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH } from './actions'

export const requestData = (category) => (dispatch) => {
    console.log('category is : ', category)
    dispatch({ type: REQUEST_PENDING })
    axios.get(`https://swapi.co/api/${category}/?format=json`)
    .then(res => {
        dispatch({ type: REQUEST_SUCCESS , payload: res.data.results })
    })
    .catch(error => {
        dispatch({ type: REQUEST_FAILED, payload: error })
    })
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}
