import axios from 'axios'
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, 
    REQUEST_URL_PENDING, REQUEST_URL_SUCCESS, REQUEST_URL_FAILED, SEARCH } from './actions'


export const requestData = (category) => (dispatch) => {
    console.log('category is : ', category)
    dispatch({ type: REQUEST_PENDING })
    axios.get(`https://swapi.co/api/${category}/?format=json`)
    .then(res => {
        dispatch({ type: REQUEST_SUCCESS, payload: res.data.results, category })
    })
    .catch(error => {
        dispatch({ type: REQUEST_FAILED, payload: error })
    })    
}

const requestURL = (category) => (dispatch) => {
    console.log('category is : ', category)
    dispatch({ type: REQUEST_URL_PENDING })
    axios.get(`https://swapi.co/api/${category}/?format=json`)
    .then(res => {
        dispatch({ type: REQUEST_URL_SUCCESS, payload: res.data.results, category })
    })
    .catch(error => {
        dispatch({ type: REQUEST_URL_FAILED, payload: error })
    })    
}

export const requestSearch = (dispatch, value) => {
    dispatch({ type: SEARCH, payload: value})
}

export const requestAllURL = (dispatch) => {
    let category = [ 'people', 'vehicles', 'planets', 'starships', 'species', 'films' ]
    
    for (let i=0; i<category.length; i++) {
        dispatch(requestURL(category[i]))
    }
}
